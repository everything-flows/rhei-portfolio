import { json, type LoaderFunctionArgs } from "@remix-run/cloudflare";
import { dehydrate, QueryClient } from "@tanstack/react-query";

import { PAGE_SIZE } from "~/constants/supabase";
import { createSupabaseServerClient } from "~/utils/createSupabaseServerClient";
import { allPostListQueryOptions } from "~/utils/getPostList";

export default async function loader({ context, request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const page = Math.max(1, Number(url.searchParams.get("page")) || 1);

  const { supabaseClient } = createSupabaseServerClient(context, request);

  const queryClient = new QueryClient();

  const result = await queryClient.fetchQuery(
    allPostListQueryOptions(supabaseClient, page),
  );

  const { totalCount } = result;
  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  return json({
    dehydratedState: dehydrate(queryClient),
    currentPage: page,
    totalPages,
  });
}
