import { Link, useRouteLoaderData } from "@remix-run/react";
import { createBrowserClient } from "@supabase/ssr";
import { useSuspenseQuery } from "@tanstack/react-query";
import { motion } from "motion/react";

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
      <OtherPostList postList={pinnedPostList.slice(1)} />
    </section>
  );
}

function FirstPost({ post }: { post: Document }) {
  return (
    <Link
      to={`/${post.subBlog}/${post.id}`}
      className="hover:text-brand"
      viewTransition
      state={{ fromPinned: true }}
    >
      <article className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-[1fr_1fr] md:grid-cols-[2fr_3fr] lg:grid-cols-[1fr_2fr]">
        <img
          src={convertUrl(post.thumbnail)}
          alt={`${post.title}`}
          className="aspect-[16/9] w-full shrink-0 rounded-3xl object-cover sm:aspect-[4/3]"
          fetchPriority="high"
          width="1200"
          height="675"
          loading="eager"
          decoding="async"
        />
        <div>
          <h3
            className="text-responsive-h2 font-900"
            style={{ viewTransitionName: `pinned-post-title-${post.id}` }}
          >
            {post.title}
          </h3>
          <p
            className="text-responsive-p text-gray-400 dark:text-gray-300"
            style={{ viewTransitionName: `pinned-post-subtitle-${post.id}` }}
          >
            {post.subTitle}
          </p>
        </div>
      </article>
    </Link>
  );
}

function OtherPostList({ postList }: { postList: Document[] }) {
  return (
    <ul className="custom-scrollbar mt-4 flex gap-4 overflow-auto">
      {postList.map((post) => (
        <li key={post.id}>
          <Link
            to={`/${post.subBlog}/${post.id}`}
            className="hover:text-brand"
            viewTransition
            state={{ fromPinned: true }}
          >
            <article className="grid w-[min(80dvw,280px)] grid-rows-[auto,auto] gap-3">
              {post.thumbnail ? (
                <ImageThumbnail post={post} />
              ) : (
                <GradientThumbnail />
              )}

              <div className="overflow-auto">
                <h3
                  className="text-responsive-h3 font-900"
                  style={{ viewTransitionName: `pinned-post-title-${post.id}` }}
                >
                  {post.title}
                </h3>
                <p
                  className="text-p text-gray-400 dark:text-gray-300"
                  style={{ viewTransitionName: `pinned-post-subtitle-${post.id}` }}
                >
                  {post.subTitle}
                </p>
              </div>
            </article>
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
      className="aspect-[16/9] w-full shrink-0 rounded-3xl object-cover"
      loading="lazy"
    />
  );
}

function GradientThumbnail() {
  return (
    <div className="aspect-[16/9] w-full shrink-0 overflow-hidden rounded-3xl object-cover">
      <Gradient />
    </div>
  );
}

export function Gradient({ size = "large" }: { size?: "small" | "large" }) {
  return (
    <div
      className={`relative h-full w-full ${size === "small" ? "blur-[6px]" : "blur-lg"}`}
    >
      <div className="absolute -bottom-[50%] h-[120%] w-[120%] skew-x-[-30deg] rounded-[100%] bg-orange-300 dark:bg-blue-800" />
      <div className="absolute -bottom-[20%] left-[20%] h-[80%] w-[80%] skew-x-[-20deg] rounded-[100%] bg-orange-100 dark:bg-blue-400" />
      <div className="absolute -bottom-[60%] h-full w-full skew-x-[-30deg] rounded-[100%] bg-blue-100 dark:bg-orange-900" />
    </div>
  );
}
