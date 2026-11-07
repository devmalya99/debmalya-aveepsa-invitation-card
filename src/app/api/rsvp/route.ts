import { and, eq, gt, sql } from "drizzle-orm";
import { NextResponse } from "next/server";
import { db } from "@/db";
import { accompanyingGuests, weddingGuests } from "@/db/schema";
import { checkRateLimit } from "@/lib/rate-limit";
import { rsvpSchema } from "@/lib/validations/rsvp";

function clientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || "unknown";
  return `rsvp:${ip}`;
}

export async function POST(request: Request) {
  const limit = checkRateLimit(clientKey(request));
  if (!limit.ok) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again shortly." },
      {
        status: 429,
        headers: { "Retry-After": String(limit.retryAfterSec) },
      },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body" },
      { status: 400 },
    );
  }

  const parsed = rsvpSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "Validation failed",
        fields: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  const data = parsed.data;
  const duplicateWindow = sql`now() - interval '24 hours'`;

  try {
    const duplicates = await db
      .select({ id: weddingGuests.id })
      .from(weddingGuests)
      .where(
        and(
          eq(weddingGuests.guestName, data.guestName),
          data.phone
            ? eq(weddingGuests.phone, data.phone)
            : sql`${weddingGuests.phone} is null`,
          gt(weddingGuests.createdAt, duplicateWindow),
        ),
      )
      .limit(1);

    if (duplicates.length > 0) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "An RSVP with this name was already submitted recently. Thank you!",
        },
        { status: 409 },
      );
    }

    const inserted = await db.transaction(async (tx) => {
      const [guest] = await tx
        .insert(weddingGuests)
        .values({
          guestName: data.guestName,
          phone: data.phone,
          attending: data.attending,
          guestCount: data.guestCount,
          message: data.message,
        })
        .returning({ id: weddingGuests.id });

      if (data.accompanyingGuests.length > 0) {
        await tx.insert(accompanyingGuests).values(
          data.accompanyingGuests.map((person) => ({
            rsvpId: guest.id,
            guestName: person.guestName,
          })),
        );
      }

      return guest;
    });

    return NextResponse.json(
      {
        ok: true,
        id: inserted.id,
        message: "RSVP saved successfully",
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("RSVP insert failed", error);
    return NextResponse.json(
      { ok: false, error: "Unable to save RSVP right now" },
      { status: 500 },
    );
  }
}
