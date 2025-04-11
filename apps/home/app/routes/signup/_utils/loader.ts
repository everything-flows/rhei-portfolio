import { LoaderFunctionArgs } from "@remix-run/cloudflare";

export default async function loader({ context }: LoaderFunctionArgs) {
  const SUPABASE_URL = context.cloudflare.env.SUPABASE_URL;
  const SUPABASE_ANON_KEY = context.cloudflare.env.SUPABASE_ANON_KEY;

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error("Missing SUPABASE env variables");
  }

  return {
    env: {
      SUPABASE_URL,
      SUPABASE_ANON_KEY,
    },
  };
}
