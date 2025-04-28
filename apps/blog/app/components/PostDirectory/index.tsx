import { Link } from "@remix-run/react";
import type { Document } from "~/types/post";

export default function PostDirectory({ postList }: { postList: Document[] }) {
  return (
    <section className="mx-auto max-w-6xl">
      <ol className="flex flex-col">
        {postList?.map((post) => (
          <li key={post.id}>
            <Link to={`/${post.subBlog}/${post.id}`}>
              <article className="grid grid-cols-[4rem_auto] gap-8 py-2 sm:grid-cols-[10rem_auto]">
                {post.thumbnail ? (
                  <img
                    src={post.thumbnail}
                    className="aspect-[1/1] w-full shrink-0 rounded-full border border-gray-200 object-cover sm:aspect-[4/3] sm:rounded-2xl dark:border-gray-600"
                  />
                ) : (
                  <div className="aspect-[1/1] w-full shrink-0 overflow-hidden rounded-full border border-gray-200 object-cover sm:aspect-[4/3] sm:rounded-2xl dark:border-gray-600">
                    <div className="bg-thumbnail h-full w-full opacity-[0.8] blur-[80px]" />
                  </div>
                )}
                <div className="flex gap-2">
                  <h2 className="text-responsive-h3 sm:py-2">{post.emoji}</h2>
                  <div className="flex flex-col sm:py-2">
                    <h2 className="text-responsive-h3">{post.title}</h2>
                    <p className="text-responsive-p font-normal text-gray-300">
                      {post.subTitle}
                    </p>
                  </div>
                </div>
              </article>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}
