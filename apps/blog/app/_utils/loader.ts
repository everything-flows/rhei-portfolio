import { LoaderFunctionArgs } from "@remix-run/cloudflare";

export const loader = async ({ context }: LoaderFunctionArgs) => {
  const supabaseCredential = {
    url: context.cloudflare.env.SUPABASE_URL,
    key: context.cloudflare.env.SUPABASE_ANON_KEY,
  };

  return {
    supabaseCredential,
  };
};
