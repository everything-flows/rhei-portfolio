import { Link, useSearchParams } from "@remix-run/react";
import { motion } from "motion/react";
import RightChevronIcon from "~/assets/RightChevronIcon";
import { bounceTransition, tapAnimation } from "~/constants/motion";

export default function Pagination({
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
      <motion.div
        whileTap={tapAnimation.small}
        transition={bounceTransition}
      >
        <Link
          to={createPageUrl(currentPage - 1)}
          className={`flex size-9 items-center justify-center rounded-full ${
            currentPage === 1
              ? "pointer-events-none text-gray-300 dark:text-gray-600"
              : "hover:bg-gray-100 dark:hover:bg-gray-800"
          }`}
          aria-disabled={currentPage === 1}
        >
          <RightChevronIcon size="1rem" className="rotate-180" />
        </Link>
      </motion.div>

      {pages.map((page, idx) =>
        page === "..." ? (
          <span key={`ellipsis-${idx}`} className="px-2 text-gray-400">
            ...
          </span>
        ) : (
          <motion.div
            key={page}
            whileTap={tapAnimation.small}
            transition={bounceTransition}
          >
            <Link
              to={createPageUrl(page)}
              className={`flex size-9 items-center justify-center rounded-full ${
                currentPage === page
                  ? "bg-blue-500 text-white dark:bg-orange-600"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              {page}
            </Link>
          </motion.div>
        ),
      )}

      <motion.div
        whileTap={tapAnimation.small}
        transition={bounceTransition}
      >
        <Link
          to={createPageUrl(currentPage + 1)}
          className={`flex size-9 items-center justify-center rounded-full ${
            currentPage === totalPages
              ? "pointer-events-none text-gray-300 dark:text-gray-600"
              : "hover:bg-gray-100 dark:hover:bg-gray-800"
          }`}
          aria-disabled={currentPage === totalPages}
        >
          <RightChevronIcon size="1rem" />
        </Link>
      </motion.div>
    </nav>
  );
}

function getPageNumbers(
  currentPage: number,
  totalPages: number,
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
