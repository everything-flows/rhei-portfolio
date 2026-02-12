import { POST_SUMMARY_ATTR, POST_TABLE } from "~/constants/supabase";
import type { Document } from "~/types/post";
import { Database } from "~/types/supabase";
import addTagListToPostList from "~/utils/addTagListToPostList";
import snakeToCamel from "~/utils/snakeToCamel";

import type { SupabaseClient } from "@supabase/supabase-js";

export default async function getSubBlogPostList({
  supabaseClient,
  subBlogId,
  page,
  pageSize = 10,
}: {
  supabaseClient: SupabaseClient<Database, "public">;
  subBlogId: string;
  page?: number;
  pageSize?: number;
}): Promise<Document[] | { postList: Document[]; totalCount: number }> {
  const baseQuery = supabaseClient
    .from(POST_TABLE)
    .select(POST_SUMMARY_ATTR, { count: "exact" })
    .eq("sub_blog", subBlogId)
    .is("parent_id", null)
    .order("created_at", { ascending: false });

  const query =
    page !== undefined
      ? baseQuery.range((page - 1) * pageSize, page * pageSize - 1)
      : baseQuery;

  const {
    data: postData,
    error: postError,
    count,
  } = await query.returns<Document[]>();

  if (postError || postData === null) {
    return page !== undefined ? { postList: [], totalCount: 0 } : [];
  }

  const postList = await addTagListToPostList({
    supabaseClient,
    postList: snakeToCamel(postData),
  });

  if (page !== undefined) {
    return { postList, totalCount: count ?? 0 };
  }

  return postList;
}
