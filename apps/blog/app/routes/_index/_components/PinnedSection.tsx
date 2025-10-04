import { Link, useRouteLoaderData } from "@remix-run/react";
import { createBrowserClient } from "@supabase/ssr";
import { useSuspenseQuery } from "@tanstack/react-query";
import { motion } from "motion/react";

import TagList from "~/components/TagList";
import { Document } from "~/types/post";
import convertUrl from "~/utils/convertUrl";
import { pinnedPostQueryOptions } from "../_utils/getPinnedPostList";

export default function PinnedSection() {
  const { supabaseCredential } = useRouteLoaderData("root");
  const supabase = createBrowserClient(
    supabaseCredential.url,
    supabaseCredential.key,
  );

  const { data: pinnedPostList } = useSuspenseQuery(
    pinnedPostQueryOptions({ supabaseClient: supabase }),
  );

  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col">
      <FirstPost post={pinnedPostList[0]} />
      <LeftPostList postList={pinnedPostList.slice(1)} />
    </section>
  );
}

function FirstPost({ post }: { post: Document }) {
  return (
    <Link to={`/${post.subBlog}/${post.id}`} className="hover:text-brand">
      <motion.article
        whileTap={{ scale: 0.97 }}
        className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-[1fr_1fr] md:grid-cols-[2fr_3fr] lg:grid-cols-[1fr_2fr]"
      >
        <img
          src={convertUrl(post.thumbnail)}
          alt={`${post.title}`}
          className="aspect-[16/9] w-full shrink-0 rounded-3xl border border-gray-200 object-cover dark:border-gray-600 sm:aspect-[4/3]"
          fetchPriority="high"
          width="1200"
          height="675"
          loading="eager"
          decoding="async"
        />
        <div>
          <h3 className="text-responsive-h2 font-900">{post.title}</h3>
          <p className="text-responsive-p text-gray-400 dark:text-gray-300">
            {post.subTitle}
          </p>
          <TagList tagList={post.tags} bold />
        </div>
      </motion.article>
    </Link>
  );
}

function LeftPostList({ postList }: { postList: Document[] }) {
  return (
    <ul className="custom-scrollbar mt-4 flex gap-4 overflow-auto">
      {postList.map((post) => (
        <li key={post.id}>
          <Link to={`/${post.subBlog}/${post.id}`} className="hover:text-brand">
            <motion.article
              whileTap={{ scale: 0.97 }}
              className="grid w-[min(80dvw,280px)] grid-rows-[auto,auto] gap-3"
            >
              {post.thumbnail ? (
                <ImageThumbnail post={post} />
              ) : (
                <GradientThumbnail />
              )}

              <div className="overflow-auto">
                <h3 className="text-responsive-h3 font-900">{post.title}</h3>
                <p className="text-p text-gray-400 dark:text-gray-300">
                  {post.subTitle}
                </p>
              </div>
            </motion.article>
          </Link>
        </li>
      ))}
    </ul>
  );
}

function ImageThumbnail({ post }: { post: Document }) {
  return (
    <img
      src={convertUrl(post.thumbnail)}
      alt={`${post.title}`}
      className="aspect-[16/9] w-full shrink-0 rounded-3xl border border-gray-200 object-cover dark:border-gray-600"
      loading="lazy"
    />
  );
}

function GradientThumbnail() {
  return (
    <div className="aspect-[16/9] w-full shrink-0 overflow-hidden rounded-3xl border border-gray-200 object-cover dark:border-gray-600">
      <Gradient />
    </div>
  );
}

export function Gradient() {
  return (
    <div className="relative h-full w-full blur-xl">
      <div className="absolute -bottom-[50%] h-[120%] w-[120%] skew-x-[-30deg] rounded-[100%] bg-orange-300 dark:bg-blue-800" />
      <div className="absolute -bottom-[20%] left-[20%] h-[80%] w-[80%] skew-x-[-20deg] rounded-[100%] bg-orange-100 dark:bg-blue-300" />
      <div className="absolute -bottom-[60%] h-full w-full skew-x-[-30deg] rounded-[100%] bg-blue-100 dark:bg-orange-900" />
    </div>
  );
}
