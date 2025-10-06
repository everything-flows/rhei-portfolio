import type { SupabaseClient } from "@supabase/supabase-js";
import { queryOptions } from "@tanstack/react-query";

import { Database } from "~/types/supabase";
import addTagListToPostList from "~/utils/addTagListToPostList";
import { getPostById } from "~/utils/getPostById";

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
}) {
  const PINNED_POST_LIST = [
    "debounce-and-throttle",
    "search-filter-with-url",
    "connect-types-and-constants",
    "requestanimationframe-guide",
    "commit-message",
  ];

  const data = await Promise.all(
    PINNED_POST_LIST.map(
      async (id) =>
        await getPostById({
          supabaseClient,
          postId: id,
          isDetail: false,
        }),
    ),
  );

  return await addTagListToPostList({
    supabaseClient,
    postList: data.filter((post) => post !== null),
  });
}
