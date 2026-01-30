import { Link } from "@remix-run/react";
import { motion } from "motion/react";

import type { Document } from "~/types/post";
import convertUrl from "~/utils/convertUrl";
import TagList from "../TagList";
import { Gradient } from "~/routes/_index/_components/PinnedSection";

export default function PostDirectory({ postList }: { postList: Document[] }) {
  return (
    <section className="mx-auto w-full max-w-6xl">
      <ol className="flex flex-col">
        {postList.map((post) => (
          <li key={post.id}>
            <Link
              to={`/${post.subBlog}/${post.id}`}
              className="hover:text-brand"
            >
              <motion.article
                whileTap={{ scale: 0.97 }}
                className="grid grid-cols-[auto_4rem] gap-x-8 gap-y-2 py-4 sm:grid-cols-[10rem_auto]"
              >
                {post.thumbnail ? (
                  <ImageThumbnail post={post} />
                ) : (
                  <GradientThumbnail />
                )}
                <div className="order-1 flex gap-2 sm:order-2">
                  <h2 className="text-responsive-h3 sm:py-2">{post.emoji}</h2>
                  <div className="flex flex-col sm:py-2">
                    <h2 className="text-responsive-h3">{post.title}</h2>
                    <p className="text-responsive-p font-normal text-gray-400 dark:text-gray-300">
                      {post.subTitle}
                    </p>
                    <TagList tagList={post.tags} />
                  </div>
                </div>
              </motion.article>
            </Link>
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
      className="order-2 aspect-[1/1] w-full shrink-0 rounded-full border border-gray-200 object-cover dark:border-gray-600 sm:order-1 sm:aspect-[4/3] sm:rounded-2xl"
      loading="lazy"
    />
  );
}

function GradientThumbnail() {
  return (
    <div className="order-2 aspect-[1/1] w-full shrink-0 overflow-hidden rounded-full border border-gray-200 object-cover dark:border-gray-600 sm:order-1 sm:aspect-[4/3] sm:rounded-2xl">
      <Gradient />
    </div>
  );
}
