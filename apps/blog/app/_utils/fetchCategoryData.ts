import { POST_SUMMARY_ATTR, POST_TABLE } from "~/constants/supabase";
import snakeToCamel from "~/utils/snakeToCamel";

import { buildTree } from "./buildTree";

import type { SupabaseClient } from "@supabase/supabase-js";
import type { Document } from "~/types/post";


export default async function fetchCategoryData({
  supabaseClient,
  subBlogId,
}: {
  supabaseClient: SupabaseClient;
  subBlogId: string;
}) {
  const { data, error } = await supabaseClient
    .from(POST_TABLE)
    .select(POST_SUMMARY_ATTR + ", parent_id") // [todo] 어디서 호출되는지 보고 고치기
    .order("custom_order")
    .order("created_at")
    .eq("sub_blog", subBlogId)
    .returns<Document[]>();

  if (error) {
    return [];
  }

  return buildTree(snakeToCamel(data));
}
