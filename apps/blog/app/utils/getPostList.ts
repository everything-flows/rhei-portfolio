import type { SupabaseClient } from "@supabase/supabase-js";

import type { Document } from "~/types/post";
import type { Database } from "~/types/supabase";
import { POST_SUMMARY_ATTR, POST_TABLE } from "~/constants/supabase";
import addTagListToPostList from "./addTagListToPostList";
import snakeToCamel from "./snakeToCamel";

export async function getPostList({
  supabaseClient,
  showAll = true,
  page,
  pageSize = 10,
}: {
  supabaseClient: SupabaseClient<Database, "public">;
  showAll?: boolean;
  page?: number;
  pageSize?: number;
}): Promise<Document[] | { postList: Document[]; totalCount: number }> {
  const baseQuery = supabaseClient
    .from(POST_TABLE)
    .select(POST_SUMMARY_ATTR, { count: "exact" })
    .in("show_main", showAll ? [true, false] : [true])
    .order("created_at", { ascending: false });

  const query =
    page !== undefined
      ? baseQuery.range((page - 1) * pageSize, page * pageSize - 1)
      : baseQuery;

  const { data, error, count } = await query.returns<Document[]>();

  if (error) return page !== undefined ? { postList: [], totalCount: 0 } : [];

  const postList = snakeToCamel(
    await addTagListToPostList({
      supabaseClient,
      postList: data,
    }),
  );

  if (page !== undefined) {
    return { postList, totalCount: count ?? 0 };
  }

  return postList;
}
