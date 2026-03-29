import { Document } from "~/types/post";
import TagList from "~/components/TagList";

export default function PreviewHeader({ data }: { data: Document }) {
  const { title, subTitle, tags } = data;

  return (
    <section className="mx-auto mb-8 max-w-6xl border-b border-gray-200 pb-8 dark:border-gray-600">
      <div className="mb-2 text-sm text-gray-500 dark:text-gray-400">
        [Preview] 로컬 파일 미리보기
      </div>

      <h1 className="text-responsive-h1 mt-2 break-keep">{title}</h1>
      {subTitle && (
        <h2 className="text-responsive-p break-keep text-gray-400 dark:text-gray-300">
          {subTitle}
        </h2>
      )}

      {tags && tags.length > 0 && <TagList tagList={tags} />}
    </section>
  );
}
