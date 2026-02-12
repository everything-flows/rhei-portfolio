import {
  POST_DETAIL_ATTR,
  POST_SUMMARY_ATTR,
  POST_TABLE,
} from "~/constants/supabase";
import type { Document } from "~/types/post";
import type { Database } from "~/types/supabase";

import getTagListOfPost from "./getTagListOfPost";
import snakeToCamel from "./snakeToCamel";

import type { SupabaseClient } from "@supabase/supabase-js";

export async function getPostById({
  supabaseClient,
  subBlogId = "cse",
  postId,
  isDetail = true,
}: {
  supabaseClient: SupabaseClient<Database, "public">;
  subBlogId?: string;
  postId: string;
  isDetail?: boolean;
}): Promise<Document | null> {
  const { data, error } = await supabaseClient
    .from(POST_TABLE)
    .select(isDetail ? POST_DETAIL_ATTR : POST_SUMMARY_ATTR)
    .eq("sub_blog", subBlogId)
    .eq("id", postId)
    .returns<Document>()
    .single();

  const tagData = await getTagListOfPost({
    supabaseClient,
    postId,
  });

  if (error || data === null) {
    return null;
  }

  return {
    ...snakeToCamel(data as never as Document), // [todo] fix this
    tags: tagData,
  };
}
