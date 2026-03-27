import { Link } from "@remix-run/react";
import { useMemo } from "react";

import useCategory from "~/hooks/useCategory";
import type { Category } from "~/types/post";
import { getBreadcrumbData } from "~/utils/breadcrumb";

import BreadcrumbSkeleton from "./Skeleton";

export default function Breadcrumb({ postId }: { postId: string }) {
  const { categoryList } = useCategory();

  const breadcrumbData = useMemo(() => {
    return getBreadcrumbData({ categoryList, id: postId });
  }, [postId, categoryList]);

  // FIXME
  if (!breadcrumbData || breadcrumbData.length === 0) {
    return <BreadcrumbSkeleton />;
  }

  return (
    <div className="flex h-6 items-center gap-2">
      {breadcrumbData.map((item: Category, index: number) => (
        <div key={item.id} className="flex items-center gap-2 overflow-hidden">
          {index > 0 && <p>/</p>}
          <Item
            link={`/${item.subBlog}/${item.id}`}
            title={item.emoji + " " + item.title}
          />
        </div>
      ))}
    </div>
  );
}

function Item({ link, title }: { link: string; title: string }) {
  return (
    <Link
      to={link}
      className="hover:text-brand overflow-hidden text-ellipsis whitespace-nowrap break-keep text-gray-500"
    >
      {title}
    </Link>
  );
}
