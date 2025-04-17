import { Link } from "@remix-run/react";
import { Document } from "~/types/post";

export default function PostList({ postList }: { postList: Document[] }) {
  if (!postList || postList.length === 0) {
    return null;
  }

  const firstPost = postList[0];
  const leftPostList = postList.slice(1);

  return (
    <>
      <Link to={`/${firstPost.subBlog}/${firstPost.id}`}>
        <article className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-[1fr_1fr] md:grid-cols-[2fr_3fr] lg:grid-cols-[1fr_2fr]">
          <img
            src={firstPost.thumbnail}
            alt={`${firstPost.title}`}
            className="aspect-[16/9] w-full shrink-0 rounded-3xl border border-gray-200 object-cover sm:aspect-[4/3] dark:border-gray-600"
          />
          <div>
            <h3 className="text-responsive-h2 font-900">{firstPost.title}</h3>
            <p className="text-responsive-p">{firstPost.subTitle}</p>
            <div className="flex flex-wrap gap-x-2 gap-y-1">
              {firstPost.tags.map((tag) => (
                <p
                  key={tag.title}
                  className="text-responsive-p text-brand border-brand mt-2 rounded-full border-[1.5px] px-2"
                >
                  {tag.title}
                </p>
              ))}
            </div>
          </div>
        </article>
      </Link>

      {leftPostList.length > 0 && (
        <ul className="mt-4 flex gap-4 overflow-auto">
          {leftPostList.map((post: Document) => (
            <li key={post.id}>
              <Link to={`/${post.subBlog}/${post.id}`}>
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
                    <p className="text-p">{post.subTitle}</p>
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
