import { SupabaseClient } from "@supabase/supabase-js";

import { Database } from "~/types/supabase";
import {
  POST_DETAIL_ATTR,
  POST_SUMMARY_ATTR,
  POST_TABLE,
} from "~/constants/supabase";

import getTagListFromPost from "./getTagListFromPost";

export async function getPostById({
  supabaseClient,
  postId,
  isDetail = true,
}: {
  supabaseClient: SupabaseClient<Database, "public">;
  postId: string;
  isDetail?: boolean;
}) {
  const { data, error } = await supabaseClient
    .from(POST_TABLE)
    .select(isDetail ? POST_DETAIL_ATTR : POST_SUMMARY_ATTR)
    .eq("id", postId)
    .single();

  const tagData = await getTagListFromPost({
    supabaseClient,
    postId,
  });

  if (error || data === null) {
    return null;
  }

  return {
    ...(data as never as object),
    tags: tagData,
  };
}
