import { TAG_ATTR, TAG_TABLE } from "~/constants/supabase";
import type { Database } from "~/types/supabase";

import type { SupabaseClient } from "@supabase/supabase-js";

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
