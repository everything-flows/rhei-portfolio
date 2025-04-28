import type { SupabaseClient } from "@supabase/supabase-js";

import type { Document } from "~/types/post";
import type { Database } from "~/types/supabase";
import { POST_TABLE } from "~/constants/supabase";

const SITEMAP_ATTR_LIST = ["id", "sub_blog", "last_edited_at"];

export async function getSitemapData({
  supabaseClient,
}: {
  supabaseClient: SupabaseClient<Database, "public">;
}) {
  const { data, error } = await supabaseClient
    .from(POST_TABLE)
    .select(SITEMAP_ATTR_LIST.join(", "))
    .returns<Document[]>();

  if (error) {
    return [];
  }

  return data;
}
