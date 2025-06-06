import { useMemo } from "react";

import { Document } from "~/types/post";
import Breadcrumb from "~/components/Breadcrumb";
import TagList from "~/components/TagList";
import { getBreadcrumbData } from "~/utils/breadcrumb";
import useCategoryStore from "~/stores/category";

export default function PostHeader({ data }: { data: Document }) {
  const { title, subTitle, id, tags } = data;

  const { categoryList } = useCategoryStore();

  const breadcrumbData = useMemo(() => {
    return getBreadcrumbData({ categoryList, id });
  }, [id, categoryList]);

  return (
    <section className="mx-auto mb-8 max-w-6xl border-b border-gray-200 pb-8 dark:border-gray-600">
      <Breadcrumb breadcrumbData={breadcrumbData} />

      <h1 className="text-responsive-h1 mt-2 break-keep">{title}</h1>
      {subTitle && (
        <h2 className="text-responsive-p break-keep text-gray-400 dark:text-gray-300">
          {subTitle}
        </h2>
      )}

      {tags && <TagList tagList={tags} />}
    </section>
  );
}
