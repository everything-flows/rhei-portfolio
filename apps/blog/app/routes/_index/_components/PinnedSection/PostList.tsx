import { Link } from "@remix-run/react";

import { Document } from "~/types/post";
import TagList from "~/components/TagList";

export default function PostList({ postList }: { postList: Document[] }) {
  if (!postList || postList.length === 0) {
    return null;
  }

  const firstPost = postList[0];
  const leftPostList = postList.slice(1);

  return (
    <>
      <Link
        to={`/${firstPost.subBlog}/${firstPost.id}`}
        className="hover:text-brand"
      >
        <article className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-[1fr_1fr] md:grid-cols-[2fr_3fr] lg:grid-cols-[1fr_2fr]">
          <img
            src={firstPost.thumbnail}
            alt={`${firstPost.title}`}
            className="aspect-[16/9] w-full shrink-0 rounded-3xl border border-gray-200 object-cover dark:border-gray-600 sm:aspect-[4/3]"
          />
          <div>
            <h3 className="text-responsive-h2 font-900">{firstPost.title}</h3>
            <p className="text-responsive-p text-gray-400 dark:text-gray-300">
              {firstPost.subTitle}
            </p>

            <TagList tagList={firstPost.tags} bold />
          </div>
        </article>
      </Link>

      {leftPostList.length > 0 && (
        <ul className="mt-4 flex gap-4 overflow-auto">
          {leftPostList.map((post: Document) => (
            <li key={post.id}>
              <Link
                to={`/${post.subBlog}/${post.id}`}
                className="hover:text-brand"
              >
                <article className="grid w-[min(80dvw,280px)] grid-rows-[auto,auto] gap-3">
                  {post.thumbnail ? (
                    <img
                      src={post.thumbnail}
                      alt={`${post.title}`}
                      className="aspect-[16/9] w-full shrink-0 rounded-3xl border border-gray-200 object-cover dark:border-gray-600"
                    />
                  ) : (
                    <div className="aspect-[16/9] w-full shrink-0 overflow-hidden rounded-3xl border border-gray-200 object-cover dark:border-gray-600">
                      <div className="bg-thumbnail h-full w-full rounded-3xl opacity-[0.8] blur-[80px]" />
                    </div>
                  )}
                  <div className="overflow-auto">
                    <h3 className="text-responsive-h3 font-900">
                      {post.title}
                    </h3>
                    <p className="text-p text-gray-400 dark:text-gray-300">
                      {post.subTitle}
                    </p>
                  </div>
                </article>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
