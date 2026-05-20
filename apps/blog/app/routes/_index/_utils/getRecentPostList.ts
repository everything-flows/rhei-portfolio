import { queryOptions } from "@tanstack/react-query";
import { groupBy } from "es-toolkit";

import {
  DEFAULT_SUB_BLOG,
  POST_SUMMARY_ATTR,
  POST_TABLE,
  POST_TAG_TABLE,
  TAG_JOIN_ATTR,
} from "~/constants/supabase";
import { type Document, DocumentType, type Tag } from "~/types/post";
import type { Database } from "~/types/supabase";
import snakeToCamel from "~/utils/snakeToCamel";

import type { SupabaseClient } from "@supabase/supabase-js";

interface RawTagRow {
  post_id: string;
  is_spoiler: boolean;
  tags: { id: string; title: string; content: string[] };
}

export const recentPostQueryOptions = (
  supabaseClient: SupabaseClient<Database, "public">,
) =>
  queryOptions({
    queryKey: ["recentPostList", { showAll: false }],
    queryFn: () => getRecentPostList({ supabaseClient, showAll: false }),
  });

async function getRecentPostList({
  supabaseClient,
  count = 10,
  showAll = true,
  subBlogId = DEFAULT_SUB_BLOG,
}: {
  supabaseClient: SupabaseClient<Database, "public">;
  subBlogId?: string;
  count?: number;
  showAll?: boolean;
}): Promise<Document[]> {
  const { data, error } = await supabaseClient
    .from(POST_TABLE)
    .select(POST_SUMMARY_ATTR)
    .eq("sub_blog", subBlogId)
    .in("show_main", showAll ? [true, false] : [true])
    .eq("type", DocumentType.Post)
    .order("created_at", { ascending: false })
    .limit(count)
    .returns<Record<string, unknown>[]>();

  if (error || !data?.length) return [];

  const postIds = data.map((p) => p.id as string);

  const { data: tagRows } = await supabaseClient
    .from(POST_TAG_TABLE)
    .select(`post_id, ${TAG_JOIN_ATTR}`)
    .in("post_id", postIds)
    .order("created_at", { ascending: true })
    .returns<RawTagRow[]>();

  const tagsByPostId = groupBy(tagRows ?? [], (r) => r.post_id);

  const posts = data.map((row) => {
    const base = snakeToCamel(row) as Record<string, unknown>;
    const tags: Tag[] = (tagsByPostId[row.id as string] ?? []).map((r) => ({
      ...r.tags,
      isSpoiler: r.is_spoiler,
    }));
    return {
      ...base,
      parentId: base.parentId ?? "",
      type: base.type ?? DocumentType.Post,
      content: base.content ?? "",
      tags,
    } as Document;
  });

  return posts;
}
