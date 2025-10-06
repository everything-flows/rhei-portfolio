import { json, type LoaderFunctionArgs } from "@remix-run/cloudflare";
import {
  createServerClient,
  parseCookieHeader,
  serializeCookieHeader,
} from "@supabase/ssr";
import { dehydrate, QueryClient } from "@tanstack/react-query";

import { postDetailQueryOptions } from "./getPostData";

export default async function loader({
  context,
  request,
  params,
}: LoaderFunctionArgs) {
  const headers = new Headers();

  const SUPABASE_URL = context.cloudflare.env.SUPABASE_URL;
  const SUPABASE_ANON_KEY = context.cloudflare.env.SUPABASE_ANON_KEY;

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error("Missing SUPABASE env variables");
  }

  const { subBlogId, postId } = params;

  const supabaseClient = createServerClient(SUPABASE_URL!, SUPABASE_ANON_KEY!, {
    cookies: {
      getAll() {
        return parseCookieHeader(request.headers.get("Cookie") ?? "");
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) =>
          headers.append(
            "Set-Cookie",
            serializeCookieHeader(name, value, options),
          ),
        );
      },
    },
  });

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(
    postDetailQueryOptions(supabaseClient, subBlogId, postId),
  );

  return json({ dehydratedState: dehydrate(queryClient) });
}
