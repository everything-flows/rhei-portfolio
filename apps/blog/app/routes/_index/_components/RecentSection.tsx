import { Link, useRouteLoaderData } from "@remix-run/react";
import { createBrowserClient } from "@supabase/ssr";
import { useSuspenseQuery } from "@tanstack/react-query";
import { motion } from "motion/react";

import { bounceTransition, tapAnimation } from "~/constants/motion";
import PostDirectory from "~/components/PostDirectory";

import { recentPostQueryOptions } from "../_utils/getRecentPostList";

export default function RecentSection() {
  const { supabaseCredential } = useRouteLoaderData("root");
  const supabase = createBrowserClient(
    supabaseCredential.url,
    supabaseCredential.key,
  );

  const { data: recentPostList } = useSuspenseQuery(
    recentPostQueryOptions({ supabaseClient: supabase }),
  );

  return (
    <section className="mx-auto mt-16 flex w-full max-w-6xl flex-col gap-6">
      <motion.div whileTap={tapAnimation.wide} transition={bounceTransition}>
        <Link to="/all" className="group">
          <h2 className="text-responsive-display flex flex-wrap items-center justify-end gap-x-2 gap-y-1 font-black leading-[1.4]">
            <span className="text-block border-reverse border-2 group-hover:border-brand group-hover:text-brand">
              View
            </span>
            <span className="text-block bg-reverse text-reverse border-reverse border-2 group-hover:border-brand group-hover:bg-brand">
              All
            </span>
            <hr className="border-reverse flex-1 border group-hover:border-brand" />
            <span className="text-block border-reverse border-2 group-hover:border-brand group-hover:text-brand">
              →
            </span>
          </h2>
        </Link>
      </motion.div>

      <PostDirectory postList={recentPostList} />
    </section>
  );
}
