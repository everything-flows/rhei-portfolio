
import { POST_SUMMARY_ATTR, POST_TABLE } from "~/constants/supabase";
import { Document } from "~/types/post";
import { Database } from "~/types/supabase";

import addTagListToPostList from "./addTagListToPostList";
import snakeToCamel from "./snakeToCamel";

import type { SupabaseClient } from "@supabase/supabase-js";

export async function getChildPostList({
  supabaseClient,
  subBlogId,
  parentId,
}: {
  supabaseClient: SupabaseClient<Database, "public">;
  subBlogId: string;
  parentId: string;
}) {
  const { data, error } = await supabaseClient
    .from(POST_TABLE)
    .select(POST_SUMMARY_ATTR)
    .eq("sub_blog", subBlogId)
    .eq("parent_id", parentId)
    .order("created_at", { ascending: false })
    .returns<Document[]>();

  if (error || data === null) {
    return [];
  }
  return snakeToCamel(
    await addTagListToPostList({
      supabaseClient,
      postList: data,
    })
  );
}
