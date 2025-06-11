import type { SupabaseClient } from "@supabase/supabase-js";

import type { Document } from "~/types/post";
import type { Database } from "~/types/supabase";
import { POST_SUMMARY_ATTR, POST_TABLE } from "~/constants/supabase";
import addTagListToPostList from "./addTagListToPostList";
import snakeToCamel from "./snakeToCamel";

export async function getPostList({
  supabaseClient,
  showAll = true,
}: {
  supabaseClient: SupabaseClient<Database, "public">;
  showAll?: boolean;
}): Promise<Document[]> {
  const { data, error } = await supabaseClient
    .from(POST_TABLE)
    .select(POST_SUMMARY_ATTR)
    .in("show_main", showAll ? [true, false] : [true])
    .order("created_at", { ascending: false })
    .returns<Document[]>();

  if (error) return [];

  return snakeToCamel(
    await addTagListToPostList({
      supabaseClient,
      postList: data,
    }),
  );
}
