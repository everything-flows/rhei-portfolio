import { Document } from "~/types/post";

import RecentHeader from "./RecentHeader";
import PostDirectory from "~/components/PostDirectory";

export default function RecentSection({ postList }: { postList: Document[] }) {
  return (
    <section className="mx-auto mt-16 flex w-full max-w-6xl flex-col gap-6">
      <RecentHeader />

      <PostDirectory postList={postList} />
    </section>
  );
}
