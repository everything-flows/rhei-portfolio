import { json, type LoaderFunctionArgs } from "@remix-run/cloudflare";
import {
  createServerClient,
  parseCookieHeader,
  serializeCookieHeader,
} from "@supabase/ssr";
import { dehydrate, QueryClient } from "@tanstack/react-query";

import { postListByTagIdQueryOptions } from "./getPostListByTagId";
import { tagDataQueryOptions } from "./getTagDataById";

const PAGE_SIZE = 10;

export default async function loader({
  context,
  request,
  params,
}: LoaderFunctionArgs) {
  const headers = new Headers();
  const url = new URL(request.url);
  const page = Math.max(1, Number(url.searchParams.get("page")) || 1);

  const SUPABASE_URL = context.cloudflare.env.SUPABASE_URL;
  const SUPABASE_ANON_KEY = context.cloudflare.env.SUPABASE_ANON_KEY;

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error("Missing SUPABASE env variables");
  }

  const { tagId } = params;
  if (!tagId) {
    throw new Response("Tag not found", { status: 404 });
  }

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

  const [tagData, result] = await Promise.all([
    queryClient.fetchQuery(tagDataQueryOptions(supabaseClient, tagId)),
    queryClient.fetchQuery(postListByTagIdQueryOptions(supabaseClient, tagId, page)),
  ]);

  const { postList, totalCount } = result;
  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  return json({
    dehydratedState: dehydrate(queryClient),
    currentPage: page,
    totalPages,
    tagData,
    postList,
  });
}
