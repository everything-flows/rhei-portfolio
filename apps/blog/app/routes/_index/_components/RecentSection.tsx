import { Link, useRouteLoaderData } from "@remix-run/react";
import { bounceTransition, tapAnimation } from "@rhei/ui";
import { createBrowserClient } from "@supabase/ssr";
import { useSuspenseQuery } from "@tanstack/react-query";
import { motion } from "motion/react";

import PostDirectory from "~/components/PostDirectory";

import { recentPostQueryOptions } from "../_utils/getRecentPostList";

export default function RecentSection() {
  const { supabaseCredential } = useRouteLoaderData("root");
  const supabaseClient = createBrowserClient(
    supabaseCredential.url,
    supabaseCredential.key,
  );

  const { data: recentPostList } = useSuspenseQuery(
    recentPostQueryOptions(supabaseClient),
  );

  return (
    <section className="mx-auto mt-16 flex w-full max-w-6xl flex-col gap-6">
      <motion.div whileTap={tapAnimation.wide} transition={bounceTransition}>
        <Link to="/all" className="group">
          <h2 className="text-responsive-display flex flex-wrap items-center justify-end gap-x-2 gap-y-1 font-black leading-[1.4]">
            <span className="text-block border-reverse group-hover:border-brand group-hover:text-brand border-2">
              View
            </span>
            <span className="text-block bg-reverse text-reverse border-reverse group-hover:border-brand group-hover:bg-brand border-2">
              All
            </span>
            <hr className="border-reverse group-hover:border-brand flex-1 border" />
            <span className="text-block border-reverse group-hover:border-brand group-hover:text-brand border-2">
              →
            </span>
          </h2>
        </Link>
      </motion.div>

      <PostDirectory postList={recentPostList} />
    </section>
  );
}
