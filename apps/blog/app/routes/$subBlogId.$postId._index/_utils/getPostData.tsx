import type { SupabaseClient } from "@supabase/supabase-js";

import { Database } from "~/types/supabase";
import { Document, DocumentType } from "~/types/post";
import { getPostById } from "~/utils/getPostById";
import { getChildPostList } from "~/utils/getChildPostList";
import parse from "../parse";

function isNormalPost(data: Document) {
  return data.type === DocumentType.Post;
}

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
