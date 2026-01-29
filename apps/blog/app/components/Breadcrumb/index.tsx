import { useMemo } from "react";
import { Link } from "@remix-run/react";

import type { Category } from "~/types/post";
import useCategoryStore from "~/stores/category";
import useFetchCategory from "~/hooks/useFetchCategory";
import { getBreadcrumbData } from "~/utils/breadcrumb";

import BreadcrumbSkeleton from "./Skeleton";

export default function Breadcrumb({ postId }: { postId: string }) {
  const { categoryList } = useCategoryStore();

  useFetchCategory();

  const breadcrumbData = useMemo(() => {
    return getBreadcrumbData({ categoryList, id: postId });
  }, [postId, categoryList]);

  if (!breadcrumbData) {
    return null;
  }

  return (
    <div className="flex h-6 items-center gap-2">
      {breadcrumbData.length === 0 ? (
        <BreadcrumbSkeleton />
      ) : (
        breadcrumbData.map((item: Category, index: number) => (
          <div
            key={item.id}
            className="flex items-center gap-2 overflow-hidden"
          >
            {index > 0 && <p>/</p>}
            <Item
              link={`/${item.subBlog}/${item.id}`}
              title={item.emoji + " " + item.title}
            />
          </div>
        ))
      )}
    </div>
  );
}

function Item({ link, title }: { link: string; title: string }) {
  return (
    <Link
      to={link}
      className="hover:text-brand overflow-hidden text-ellipsis whitespace-nowrap break-keep text-gray-400 dark:text-gray-300"
    >
      {title}
    </Link>
  );
}
