import type { SupabaseClient } from "@supabase/supabase-js";

import type { Database } from "~/types/supabase";
import { TAG_TABLE } from "~/constants/supabase";

const SITEMAP_ATTR_LIST = ["id", "created_at"];

export async function getSitemapTagList({
  supabaseClient,
}: {
  supabaseClient: SupabaseClient<Database, "public">;
}) {
  const { data, error } = await supabaseClient
    .from(TAG_TABLE)
    .select(SITEMAP_ATTR_LIST.join(", "));

  if (error) {
    return [];
  }

  return data;
}
