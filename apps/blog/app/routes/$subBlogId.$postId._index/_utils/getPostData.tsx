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
  const postData = await getPostById({ supabaseClient, subBlogId, postId });

  if (!postData) {
    return null;
  }

  if (isNormalPost(postData)) {
    return {
      postData,
      parsedContent: await parse("# Table Of Contents\n" + postData.content),
    };
  }

  return {
    postData,
    childPostList: await getChildPostList({
      supabaseClient,
      subBlogId,
      parentId: postId,
    }),
  };
}
