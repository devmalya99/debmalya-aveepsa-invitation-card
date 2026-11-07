import { sql } from "drizzle-orm";
import { NextResponse } from "next/server";
import { db } from "@/db";
import { env } from "@/lib/env";

export async function GET() {
  try {
    const result = await db.execute(sql`select 1 as ok`);
    const row = result.rows[0] as { ok: number } | undefined;

    return NextResponse.json({
      ok: true,
      service: "postgres",
      branch: process.env.NEON_BRANCH ?? null,
      databaseConfigured: Boolean(env.postgres.databaseUrl),
      query: row?.ok === 1,
    });
  } catch (error) {
    console.error("Health check failed", error);
    return NextResponse.json(
      {
        ok: false,
        service: "postgres",
        error: "Database health check failed",
      },
      { status: 503 },
    );
  }
}
