import { Document } from "~/types/post";

export default function PostHeader({ data }: { data: { postData: Document } }) {
  const { postData } = data;
  const { title, subTitle } = postData;

  return (
    <section className="mx-auto mb-8 max-w-6xl border-b border-gray-200 pb-8 dark:border-gray-600">
      <h1 className="text-responsive-h1 break-keep">{title}</h1>
      <h2 className="text-responsive-p break-keep">{subTitle}</h2>
    </section>
  );
}
