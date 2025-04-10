import { createBrowserClient } from "@supabase/ssr";
import { env } from "~/env.server";

export const supabase = createBrowserClient(
  process.env.SUPABASE_URL || "",
  process.env.SUPABASE_ANON_KEY || "",
);
