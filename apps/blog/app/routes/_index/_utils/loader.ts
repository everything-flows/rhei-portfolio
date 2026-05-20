import { json, type LoaderFunctionArgs } from "@remix-run/cloudflare";
import { dehydrate, QueryClient } from "@tanstack/react-query";

import { createSupabaseServerClient } from "~/utils/createSupabaseServerClient";

import { pinnedPostQueryOptions } from "./getPinnedPostList";
import { recentPostQueryOptions } from "./getRecentPostList";

export default async function loader({ context, request }: LoaderFunctionArgs) {
  const { supabaseClient } = createSupabaseServerClient(context, request);

  const queryClient = new QueryClient();
  await Promise.all([
    queryClient.prefetchQuery(pinnedPostQueryOptions(supabaseClient)),
    queryClient.prefetchQuery(recentPostQueryOptions(supabaseClient)),
  ]);

  return json({ dehydratedState: dehydrate(queryClient) });
}
