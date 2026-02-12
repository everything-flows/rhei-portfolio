import { Link } from "@remix-run/react";
import { motion } from "motion/react";

import { bounceTransition, tapAnimation } from "~/constants/motion";
import { Gradient } from "~/routes/_index/_components/PinnedSection";
import type { Document } from "~/types/post";
import convertUrl from "~/utils/convertUrl";

import PostDate from "./PostDate";
import TagList from "../TagList";
import Pagination from "./Pagination";

interface PostDirectoryProps {
  postList: Document[];
  currentPage?: number;
  totalPages?: number;
}

export default function PostDirectory({
  postList,
  currentPage,
  totalPages,
}: PostDirectoryProps) {
  return (
    <section className="mx-auto w-full max-w-6xl">
      <ol className="flex flex-col gap-4">
        {postList.map((post) => (
          <li key={post.id}>
            <article className="flex gap-4">
              <Link to={`/${post.subBlog}/${post.id}`}>
                <motion.div
                  whileTap={tapAnimation.small}
                  transition={bounceTransition}
                  className="relative size-20"
                >
                  {post.thumbnail ? (
                    <ImageThumbnail post={post} />
                  ) : (
                    <GradientThumbnail />
                  )}
                  <div className="bg-normal absolute bottom-[-4px] right-[-4px] flex size-8 items-center justify-center rounded-full border-2 border-blue-400 dark:border-orange-700">
                    {post.emoji}
                  </div>
                </motion.div>
              </Link>

              <div className="flex-1">
                <motion.div
                  whileTap={tapAnimation.wide}
                  transition={bounceTransition}
                >
                  <Link
                    to={`/${post.subBlog}/${post.id}`}
                    className="hover:text-brand"
                    viewTransition
                    state={{ fromDirectory: true }}
                  >
                    <div className="flex flex-col">
                      <h2
                        className="text-responsive-h2 font-bold"
                        style={{
                          viewTransitionName: `list-post-title-${post.id}`,
                        }}
                      >
                        {post.title}
                      </h2>
                      <p
                        className="text-responsive-p text-gray-500 dark:text-gray-300"
                        style={{
                          viewTransitionName: `list-post-subtitle-${post.id}`,
                        }}
                      >
                        {post.subTitle}
                      </p>
                    </div>
                  </Link>
                </motion.div>

                <div
                  style={{ viewTransitionName: `list-post-tags-${post.id}` }}
                >
                  <TagList tagList={post.tags} />
                </div>
                <p className="text-right text-gray-400 dark:text-gray-400">
                  <PostDate date={post.createdAt} />
                </p>
              </div>
            </article>
          </li>
        ))}
      </ol>

      {currentPage !== undefined &&
        totalPages !== undefined &&
        totalPages > 1 && (
          <Pagination currentPage={currentPage} totalPages={totalPages} />
        )}
    </section>
  );
}

function ImageThumbnail({ post }: { post: Document }) {
  return (
    <img
      alt={post.title}
      src={convertUrl(post.thumbnail)}
      className="aspect-[1/1] w-full shrink-0 overflow-hidden rounded-full border-2 border-blue-400 object-cover dark:border-orange-700"
      loading="lazy"
    />
  );
}

function GradientThumbnail() {
  return (
    <div className="aspect-[1/1] overflow-hidden rounded-full border-2 border-blue-400 dark:border-orange-700">
      <Gradient size="small" />
    </div>
  );
}
