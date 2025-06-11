import type { SupabaseClient } from "@supabase/supabase-js";

import type { Database } from "~/types/supabase";
import snakeToCamel from "~/utils/snakeToCamel";

export async function getSubBlogInfo({
  supabaseClient,
  subBlogId,
}: {
  supabaseClient: SupabaseClient<Database, "public">;
  subBlogId: string;
}) {
  const { data: databaseData, error: databaseError } = await supabaseClient
    .from("subBlogs")
    .select("title, description")
    .eq("id", subBlogId)
    .single();

  if (databaseError) {
    return null;
  }

  const data = snakeToCamel(databaseData);

  return {
    title: data.title,
    subTitle: data.description,
  };
}
