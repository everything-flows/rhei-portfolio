import { queryOptions } from "@tanstack/react-query";
import { groupBy } from "es-toolkit";

import {
  POST_SUMMARY_ATTR,
  POST_TABLE,
  POST_TAG_TABLE,
  TAG_JOIN_ATTR,
} from "~/constants/supabase";
import { DocumentType, type Document, type Tag } from "~/types/post";
import snakeToCamel from "~/utils/snakeToCamel";

import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "~/types/supabase";

const SUB_BLOG_ID = "cse";

const PINNED_POST_IDS = [
  "debounce-and-throttle",
  "search-filter-with-url",
  "connect-types-and-constants",
  "requestanimationframe-guide",
  "commit-message",
] as const;

const POST_TAG_SELECT = `post_id, ${TAG_JOIN_ATTR}`;

interface RawTagRow {
  post_id: string;
  is_spoiler: boolean;
  tags: { id: string; title: string; content: string[] };
}

export const pinnedPostQueryOptions = (
  supabaseClient: SupabaseClient<Database, "public">,
) =>
  queryOptions({
    queryKey: ["pinnedPostList"],
    queryFn: () => getPinnedPostList({ supabaseClient }),
  });

async function getPinnedPostList({
  supabaseClient,
}: {
  supabaseClient: SupabaseClient<Database, "public">;
}): Promise<Document[]> {
  const [postsRes, tagsRes] = await Promise.all([
    supabaseClient
      .from(POST_TABLE)
      .select(POST_SUMMARY_ATTR)
      .eq("sub_blog", SUB_BLOG_ID)
      .in("id", [...PINNED_POST_IDS])
      .returns<Record<string, unknown>[]>(),
    supabaseClient
      .from(POST_TAG_TABLE)
      .select(POST_TAG_SELECT)
      .in("post_id", [...PINNED_POST_IDS])
      .order("created_at", { ascending: true })
      .returns<RawTagRow[]>(),
  ]);

  if (postsRes.error || postsRes.data === null) {
    return [];
  }

  const tagsByPostId = groupBy(
    tagsRes.data ?? [],
    (row: RawTagRow) => row.post_id,
  ) as Record<string, RawTagRow[]>;

  const postMap = new Map<string, Document>(
    postsRes.data.map((row: Record<string, unknown>) => {
      const base = snakeToCamel(row) as Record<string, unknown>;
      return [
        row.id as string,
        {
          ...base,
          parentId: base.parentId ?? "",
          type: base.type ?? DocumentType.Post,
          content: base.content ?? "",
          tags: [] as Tag[],
        } as Document,
      ];
    }),
  );

  for (const [postId, rows] of Object.entries(tagsByPostId)) {
    const post = postMap.get(postId);
    if (!post) continue;
    post.tags = (rows as RawTagRow[]).map((r: RawTagRow) => ({
      ...r.tags,
      isSpoiler: r.is_spoiler,
    }));
  }

  return PINNED_POST_IDS.map((id) => postMap.get(id)).filter(
    (p): p is Document => p != null,
  );
}
