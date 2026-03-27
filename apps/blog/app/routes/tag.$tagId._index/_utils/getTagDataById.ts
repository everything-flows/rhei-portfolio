import { queryOptions } from "@tanstack/react-query";

import { TAG_ATTR, TAG_TABLE } from "~/constants/supabase";
import type { Database } from "~/types/supabase";

import type { SupabaseClient } from "@supabase/supabase-js";

export const tagDataQueryOptions = (
  supabaseClient: SupabaseClient<Database, "public">,
  tagId: string,
) =>
  queryOptions({
    queryKey: ["tagData", tagId],
    queryFn: () => getTagDataById({ supabaseClient, tagId }),
  });

async function getTagDataById({
  supabaseClient,
  tagId,
}: {
  supabaseClient: SupabaseClient<Database, "public">;
  tagId: string;
}) {
  const { data } = await supabaseClient
    .from(TAG_TABLE)
    .select(TAG_ATTR)
    .eq("id", tagId)
    .single();

  return data;
}
