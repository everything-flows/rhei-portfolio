import type { SupabaseClient } from "@supabase/supabase-js";

import { queryOptions } from "@tanstack/react-query";
import { POST_SUMMARY_ATTR, POST_TABLE } from "~/constants/supabase";
import { type Document, DocumentType } from "~/types/post";
import type { Database } from "~/types/supabase";
import addTagListToPostList from "~/utils/addTagListToPostList";
import snakeToCamel from "~/utils/snakeToCamel";

export const recentPostQueryOptions = (
  supabaseClient: SupabaseClient<Database, "public">,
) =>
  queryOptions({
    queryKey: ["recentPostList"],
    queryFn: () => getRecentPostList({ supabaseClient }),
  });

export default async function getRecentPostList({
  supabaseClient,
  count = 10,
  showAll = true,
}: {
  supabaseClient: SupabaseClient<Database, "public">;
  subBlogId?: string;
  count?: number;
  showAll?: boolean;
}): Promise<Document[]> {
  const { data, error } = await supabaseClient
    .from(POST_TABLE)
    .select(POST_SUMMARY_ATTR)
    .in("show_main", showAll ? [true, false] : [true])
    .eq("type", DocumentType.Post)
    .order("created_at", { ascending: false })
    .limit(count)
    .returns<Document[]>();

  if (error) return [];

  return snakeToCamel(
    await addTagListToPostList({
      supabaseClient,
      postList: data,
    }),
  );
}
