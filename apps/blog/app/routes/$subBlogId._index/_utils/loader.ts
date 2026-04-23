import { json, type LoaderFunctionArgs } from "@remix-run/cloudflare";
import { dehydrate, QueryClient } from "@tanstack/react-query";

import { PAGE_SIZE } from "~/constants/supabase";
import { createSupabaseServerClient } from "~/utils/createSupabaseServerClient";

import { subBlogInfoQueryOptions } from "./getSubBlogInfo";
import { subBlogPostListQueryOptions } from "./getSubBlogPostList";

export default async function loader({
  context,
  request,
  params,
}: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const page = Math.max(1, Number(url.searchParams.get("page")) || 1);

  const { subBlogId } = params;
  if (!subBlogId) {
    throw new Response("Sub blog not found", { status: 404 });
  }

  const { supabaseClient } = createSupabaseServerClient(context, request);

  const queryClient = new QueryClient();

  const blogInfo = await queryClient.fetchQuery(
    subBlogInfoQueryOptions(supabaseClient, subBlogId),
  );
  if (!blogInfo) {
    throw new Response("Sub blog not found", { status: 404 });
  }

  const result = await queryClient.fetchQuery(
    subBlogPostListQueryOptions(supabaseClient, subBlogId, page),
  );

  const { totalCount } = result;
  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  return json({
    dehydratedState: dehydrate(queryClient),
    currentPage: page,
    totalPages,
  });
}
