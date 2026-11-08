import { and, eq, gt, sql } from "drizzle-orm";
import { NextResponse } from "next/server";
import { db } from "@/db";
import { weddingGuests } from "@/db/schema";
import { checkRateLimit } from "@/lib/rate-limit";
import { guestNameSchema } from "@/lib/validations/guest-name";

function clientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || "unknown";
  return `guest-name:${ip}`;
}

/**
 * Lightweight end-of-invite name capture → Neon `wedding_guests`
 * (attending defaults true, guest_count 1).
 */
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

  const parsed = guestNameSchema.safeParse(body);
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

  const { guestName, locale } = parsed.data;
  const duplicateWindow = sql`now() - interval '24 hours'`;

  try {
    const duplicates = await db
      .select({ id: weddingGuests.id })
      .from(weddingGuests)
      .where(
        and(
          eq(weddingGuests.guestName, guestName),
          gt(weddingGuests.createdAt, duplicateWindow),
        ),
      )
      .limit(1);

    if (duplicates.length > 0) {
      return NextResponse.json(
        {
          ok: true,
          id: duplicates[0].id,
          message: "Welcome back",
          duplicate: true,
        },
        { status: 200 },
      );
    }

    const [inserted] = await db
      .insert(weddingGuests)
      .values({
        guestName,
        attending: true,
        guestCount: 1,
        message: locale ? `locale:${locale}` : undefined,
      })
      .returning({ id: weddingGuests.id });

    return NextResponse.json(
      {
        ok: true,
        id: inserted.id,
        message: "Guest name saved",
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Guest name insert failed", error);
    return NextResponse.json(
      { ok: false, error: "Unable to save right now" },
      { status: 500 },
    );
  }
}
