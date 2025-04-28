import type { SupabaseClient } from "@supabase/supabase-js";

import type { Database } from "~/types/supabase";
import { TAG_ATTR, TAG_TABLE } from "~/constants/supabase";

export async function getTagDataById({
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
