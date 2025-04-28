import { useMemo } from "react";

import { Document } from "~/types/post";
import Breadcrumb from "~/components/Breadcrumb";
import { getBreadcrumbData } from "~/utils/breadcrumb";
import useCategoryStore from "~/stores/category";
import { Link } from "@remix-run/react";

export default function PostHeader({ data }: { data: { postData: Document } }) {
  const { postData } = data;
  const { title, subTitle, id, tags } = postData;

  const { categoryList } = useCategoryStore();

  const breadcrumbData = useMemo(() => {
    return getBreadcrumbData({ categoryList, id });
  }, [id, categoryList]);

  return (
    <section className="mx-auto mb-8 max-w-6xl border-b border-gray-200 pb-8 dark:border-gray-600">
      <Breadcrumb breadcrumbData={breadcrumbData} />

      <h1 className="text-responsive-h1 mt-2 break-keep">{title}</h1>
      <h2 className="text-responsive-p break-keep text-gray-400 dark:text-gray-300">
        {subTitle}
      </h2>

      <ul className="mt-2 flex flex-wrap gap-x-2 gap-y-1">
        {tags.map((tag) => (
          <li>
            <Link
              to={`/tags/${tag}`}
              className="text-brand border-brand rounded-full border px-2 py-[2px] text-[1rem]"
            >
              {tag.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
