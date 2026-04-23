import { json, type LoaderFunctionArgs } from "@remix-run/cloudflare";
import { dehydrate, QueryClient } from "@tanstack/react-query";

import { createSupabaseServerClient } from "~/utils/createSupabaseServerClient";

import { postDetailQueryOptions } from "./getPostData";

export default async function loader({
  context,
  request,
  params,
}: LoaderFunctionArgs) {
  const { subBlogId, postId } = params;
  if (!subBlogId || !postId) {
    throw new Response("Post not found", { status: 404 });
  }

  const { supabaseClient } = createSupabaseServerClient(context, request);

  const queryClient = new QueryClient();
  const postData = await queryClient.fetchQuery(
    postDetailQueryOptions(supabaseClient, subBlogId, postId),
  );
  if (!postData) {
    throw new Response("Post not found", { status: 404 });
  }

  return json({ dehydratedState: dehydrate(queryClient) });
}
