import { json, type LoaderFunctionArgs } from "@remix-run/cloudflare";
import { dehydrate, QueryClient } from "@tanstack/react-query";

import { PAGE_SIZE } from "~/constants/supabase";
import { createSupabaseServerClient } from "~/utils/createSupabaseServerClient";

import { postListByTagIdQueryOptions } from "./getPostListByTagId";
import { tagDataQueryOptions } from "./getTagDataById";

export default async function loader({
  context,
  request,
  params,
}: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const page = Math.max(1, Number(url.searchParams.get("page")) || 1);

  const { tagId } = params;
  if (!tagId) {
    throw new Response("Tag not found", { status: 404 });
  }

  const { supabaseClient } = createSupabaseServerClient(context, request);

  const queryClient = new QueryClient();

  const [tagData, result] = await Promise.all([
    queryClient.fetchQuery(tagDataQueryOptions(supabaseClient, tagId)),
    queryClient.fetchQuery(
      postListByTagIdQueryOptions(supabaseClient, tagId, page),
    ),
  ]);

  if (!tagData) {
    throw new Response("Tag not found", { status: 404 });
  }

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
