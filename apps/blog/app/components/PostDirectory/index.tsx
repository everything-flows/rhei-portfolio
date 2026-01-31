import { Link } from "@remix-run/react";
import { motion } from "motion/react";
import { format } from "date-fns";

import type { Document } from "~/types/post";
import convertUrl from "~/utils/convertUrl";
import TagList from "../TagList";
import { Gradient } from "~/routes/_index/_components/PinnedSection";

export default function PostDirectory({ postList }: { postList: Document[] }) {
  return (
    <section className="mx-auto w-full max-w-6xl">
      <ol className="flex flex-col gap-4">
        {postList.map((post) => (
          <li key={post.id}>
            <article className="flex gap-4">
              <Link to={`/${post.subBlog}/${post.id}`}>
                <motion.div
                  whileTap={{ scale: 0.96 }}
                  whileHover={{ scale: 1.04 }}
                  className="relative size-20"
                >
                  {post.thumbnail ? (
                    <ImageThumbnail post={post} />
                  ) : (
                    <GradientThumbnail />
                  )}
                  <div className="bg-brand border-normal absolute bottom-[-4px] right-[-4px] flex size-8 items-center justify-center rounded-full border-2">
                    {post.emoji}
                  </div>
                </motion.div>
              </Link>

              <div className="flex-1">
                <Link
                  to={`/${post.subBlog}/${post.id}`}
                  className="hover:text-brand"
                  viewTransition
                >
                  <div className="flex flex-col">
                    <h2
                      className="text-responsive-h2 font-bold"
                      style={{ viewTransitionName: `list-post-title-${post.id}` }}
                    >
                      {post.title}
                    </h2>
                    <p
                      className="text-responsive-p text-gray-500 dark:text-gray-300"
                      style={{ viewTransitionName: `list-post-subtitle-${post.id}` }}
                    >
                      {post.subTitle}
                    </p>
                  </div>
                </Link>

                <div style={{ viewTransitionName: `list-post-tags-${post.id}` }}>
                  <TagList tagList={post.tags} />
                </div>
                <p className="text-right text-gray-400 dark:text-gray-400">
                  {format(post.createdAt, "yyyy.MM.dd.")}
                </p>
              </div>
            </article>
          </li>
        ))}
      </ol>
    </section>
  );
}

function ImageThumbnail({ post }: { post: Document }) {
  return (
    <img
      alt={post.title}
      src={convertUrl(post.thumbnail)}
      className="border-brand aspect-[1/1] w-full shrink-0 overflow-hidden rounded-full border-2 object-cover"
      loading="lazy"
    />
  );
}

function GradientThumbnail() {
  return (
    <div className="border-brand aspect-[1/1] overflow-hidden rounded-full border-2">
      <Gradient size="small" />
    </div>
  );
}
