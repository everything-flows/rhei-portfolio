import type { SupabaseClient } from "@supabase/supabase-js";

import { Database } from "~/types/supabase";
import { POST_SUMMARY_ATTR, POST_TABLE } from "~/constants/supabase";
import addTagListToPostList from "~/utils/addTagListToPostList";
import snakeToCamel from "~/utils/snakeToCamel";

export default async function getSubBlogPostList({
  supabaseClient,
  subBlogId,
}: {
  supabaseClient: SupabaseClient<Database, "public">;
  subBlogId: string;
}) {
  const { data: postData, error: postError } = await supabaseClient
    .from(POST_TABLE)
    .select(POST_SUMMARY_ATTR)
    .eq("sub_blog", subBlogId)
    .is("parent_id", null)
    .order("created_at", { ascending: false })
    .returns<Document[]>();

  if (postError || postData === null) {
    return [];
  }

  return await addTagListToPostList({
    supabaseClient,
    postList: snakeToCamel(postData),
  });
}
