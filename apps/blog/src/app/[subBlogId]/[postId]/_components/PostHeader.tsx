import { Document } from "@/types/post";

export default function PostHeader({ data }: { data: { postData: Document } }) {
  const { postData } = data;
  const { title, subTitle } = postData;

  return (
    <section className="mx-auto max-w-6xl">
      <h1 className="text-responsive-h1">{title}</h1>
      <h2 className="text-responsive-p">{subTitle}</h2>
    </section>
  );
}
