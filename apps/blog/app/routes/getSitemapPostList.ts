import { DEFAULT_SUB_BLOG, POST_TABLE } from "~/constants/supabase";
import type { Document } from "~/types/post";
import type { Database } from "~/types/supabase";

import type { SupabaseClient } from "@supabase/supabase-js";

const SITEMAP_ATTR_LIST = ["id", "sub_blog", "last_edited_at"];

export async function getSitemapPostList({
  supabaseClient,
  subBlog = DEFAULT_SUB_BLOG,
}: {
  supabaseClient: SupabaseClient<Database, "public">;
  subBlog?: string;
}) {
  const { data, error } = await supabaseClient
    .from(POST_TABLE)
    .select(SITEMAP_ATTR_LIST.join(", "))
    .eq("sub_blog", subBlog)
    .returns<Document[]>();

  if (error) {
    return [];
  }

  return data;
}
