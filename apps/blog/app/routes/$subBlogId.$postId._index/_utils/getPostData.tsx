import { queryOptions } from "@tanstack/react-query";

import { Document, DocumentType } from "~/types/post";
import { Database } from "~/types/supabase";
import { getChildPostList } from "~/utils/getChildPostList";
import { getPostById } from "~/utils/getPostById";

import parse from "../parse";

import type { SupabaseClient } from "@supabase/supabase-js";

function isNormalPost(data: Document) {
  return data.type === DocumentType.Post;
}

export const postDetailQueryOptions = (
  supabaseClient: SupabaseClient<Database, "public">,
  subBlogId: string,
  postId: string,
) =>
  queryOptions({
    queryKey: ["postDetail", subBlogId, postId],
    queryFn: () => getPostData({ supabaseClient, subBlogId, postId }),
  });

export default async function getPostData({
  supabaseClient,
  subBlogId,
  postId,
}: {
  supabaseClient: SupabaseClient<Database, "public">;
  subBlogId: string;
  postId: string;
}) {
  const postInfo = await getPostById({ supabaseClient, subBlogId, postId });

  if (!postInfo) {
    return null;
  }

  if (isNormalPost(postInfo)) {
    return {
      postInfo,
      postContent: await parse("# Table Of Contents\n" + postInfo.content),
    };
  }

  return {
    postInfo,
    childPostList: await getChildPostList({
      supabaseClient,
      subBlogId,
      parentId: postId,
    }),
  };
}
