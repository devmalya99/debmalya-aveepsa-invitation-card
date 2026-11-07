import { parseEnv } from "@neon/env";
import config from "../../neon";

/** Typed Neon env — Postgres pooled URL for app traffic. */
export const env = parseEnv(config, ["DATABASE_URL"]);
