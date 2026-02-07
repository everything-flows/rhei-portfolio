import { Link, useSearchParams } from "@remix-run/react";
import { motion } from "motion/react";

import type { Document } from "~/types/post";
import PostDate from "./PostDate";
import convertUrl from "~/utils/convertUrl";
import TagList from "../TagList";
import { Gradient } from "~/routes/_index/_components/PinnedSection";

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
                  whileTap={{ scale: 0.96 }}
                  whileHover={{ scale: 1.04 }}
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

      {currentPage !== undefined && totalPages !== undefined && totalPages > 1 && (
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      )}
    </section>
  );
}

function Pagination({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  const [searchParams] = useSearchParams();

  const createPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams);
    if (page === 1) {
      params.delete("page");
    } else {
      params.set("page", String(page));
    }
    const queryString = params.toString();
    return queryString ? `?${queryString}` : "";
  };

  const pages = getPageNumbers(currentPage, totalPages);

  return (
    <nav className="mt-8 flex items-center justify-center gap-2">
      <Link
        to={createPageUrl(currentPage - 1)}
        className={`rounded-lg px-3 py-2 ${
          currentPage === 1
            ? "pointer-events-none text-gray-300 dark:text-gray-600"
            : "hover:bg-gray-100 dark:hover:bg-gray-800"
        }`}
        aria-disabled={currentPage === 1}
      >
        &lt;
      </Link>

      {pages.map((page, idx) =>
        page === "..." ? (
          <span key={`ellipsis-${idx}`} className="px-2 text-gray-400">
            ...
          </span>
        ) : (
          <Link
            key={page}
            to={createPageUrl(page)}
            className={`rounded-lg px-3 py-2 ${
              currentPage === page
                ? "bg-blue-500 text-white dark:bg-orange-600"
                : "hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            {page}
          </Link>
        )
      )}

      <Link
        to={createPageUrl(currentPage + 1)}
        className={`rounded-lg px-3 py-2 ${
          currentPage === totalPages
            ? "pointer-events-none text-gray-300 dark:text-gray-600"
            : "hover:bg-gray-100 dark:hover:bg-gray-800"
        }`}
        aria-disabled={currentPage === totalPages}
      >
        &gt;
      </Link>
    </nav>
  );
}

function getPageNumbers(
  currentPage: number,
  totalPages: number
): (number | "...")[] {
  const pages: (number | "...")[] = [];
  const showEllipsisThreshold = 7;

  if (totalPages <= showEllipsisThreshold) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    pages.push(1);

    if (currentPage > 3) {
      pages.push("...");
    }

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push("...");
    }

    pages.push(totalPages);
  }

  return pages;
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
