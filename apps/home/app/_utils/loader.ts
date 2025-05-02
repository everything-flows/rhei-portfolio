import { LoaderFunctionArgs } from "@remix-run/cloudflare";

export const loader = async ({ context, request }: LoaderFunctionArgs) => {
  const supabaseCredential = {
    url: context.cloudflare.env.SUPABASE_URL,
    key: context.cloudflare.env.SUPABASE_ANON_KEY,
  };

  const cookie = request.headers.get("Cookie") ?? "";
  const theme = cookie.includes("theme=dark") ? "dark" : "light";

  return {
    supabaseCredential,
    themeVar: theme,
  };
};
