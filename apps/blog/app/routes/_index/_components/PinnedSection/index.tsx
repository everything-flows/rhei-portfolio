import { Document } from "~/types/post";
import PinnedHeader from "./PinnedHeader";
import PostList from "./PostList";

export default function PinnedSection({ postList }: { postList: Document[] }) {
  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col">
      <PinnedHeader />

      <PostList postList={postList} />
    </section>
  );
}
