import { useOutletContext } from "@remix-run/react";
import { createClient } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";

import { getPostById } from "~/utils/getPostById";

export default function Blog() {
  const { supabaseCredential } = useOutletContext();

  const { data: pinnedPostList } = useQuery({
    queryKey: ["pinnedPosts"],
    queryFn: async () => {
      const supabaseClient = createClient(
        supabaseCredential.url,
        supabaseCredential.key,
      );

      const { data } = await supabaseClient
        .from("pinnedPosts")
        .select("list")
        .single();

      const postList = await Promise.all(
        data?.list.map((postId: string) =>
          getPostById({ supabaseClient, postId, isDetail: false }),
        ),
      );

      return postList;
    },
  });

  return (
    <section id="tools" className="mx-auto max-w-6xl py-4">
      {/* blog */}
    </section>
  );
}
