import { DEFAULT_SUB_BLOG, POST_TAG_TABLE } from "~/constants/supabase";
import type { Document } from "~/types/post";
import type { Database } from "~/types/supabase";
import { getPostById } from "~/utils/getPostById";

import type { SupabaseClient } from "@supabase/supabase-js";

export async function getPostListByTagId({
  supabaseClient,
  tagId,
  page,
  pageSize = 10,
  subBlogId = DEFAULT_SUB_BLOG,
}: {
  supabaseClient: SupabaseClient<Database, "public">;
  tagId: string;
  page?: number;
  pageSize?: number;
  subBlogId?: string;
}): Promise<Document[] | { postList: Document[]; totalCount: number }> {
  const baseQuery = supabaseClient
    .from(POST_TAG_TABLE)
    .select("post_id", { count: "exact" })
    .eq("tag_id", tagId)
    .order("created_at", { ascending: false });

  const query =
    page !== undefined
      ? baseQuery.range((page - 1) * pageSize, page * pageSize - 1)
      : baseQuery;

  const { data, error, count } = await query;

  if (error || data === null) {
    return page !== undefined ? { postList: [], totalCount: 0 } : [];
  }

  const postIdList = data.map((datum) => datum.post_id);
  const postPromiseList = postIdList?.map((postId) =>
    getPostById({
      supabaseClient,
      postId,
      subBlogId,
      isDetail: false,
    }),
  );
  const postList = (await Promise.all(postPromiseList)).filter(
    (post) => post !== null,
  );

  if (page !== undefined) {
    return { postList, totalCount: count ?? 0 };
  }

  return postList;
}
