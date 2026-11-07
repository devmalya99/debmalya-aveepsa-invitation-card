import { attachDatabasePool } from "@vercel/functions";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { env } from "@/lib/env";
import * as schema from "./schema";

const globalForDb = globalThis as unknown as {
  weddingInvitationPool?: Pool;
};

function createPool() {
  const pool = new Pool({
    connectionString: env.postgres.databaseUrl,
  });

  // Vercel Fluid: reuse the pool across invocations when available.
  attachDatabasePool(pool);

  return pool;
}

const pool = globalForDb.weddingInvitationPool ?? createPool();

if (process.env.NODE_ENV !== "production") {
  globalForDb.weddingInvitationPool = pool;
}

export const db = drizzle(pool, { schema });
