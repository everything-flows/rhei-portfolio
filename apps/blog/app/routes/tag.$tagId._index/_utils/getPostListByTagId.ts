import type { SupabaseClient } from "@supabase/supabase-js";

import type { Document } from "~/types/post";
import type { Database } from "~/types/supabase";
import { POST_TAG_TABLE } from "~/constants/supabase";
import { getPostById } from "~/utils/getPostById";

export async function getPostListByTagId({
  supabaseClient,
  tagId,
}: {
  supabaseClient: SupabaseClient<Database, "public">;
  tagId: string;
}): Promise<Document[]> {
  const { data, error } = await supabaseClient
    .from(POST_TAG_TABLE)
    .select("post_id")
    .eq("tag_id", tagId)
    .order("created_at", { ascending: false });

  if (error || data === null) {
    return [];
  }

  const postIdList = data.map((datum) => datum.post_id);
  const postPromiseList = postIdList?.map((postId) =>
    getPostById({ supabaseClient, postId, isDetail: false }),
  );
  const postList = (await Promise.all(postPromiseList)).filter(
    (post) => post !== null,
  );

  return postList;
}
