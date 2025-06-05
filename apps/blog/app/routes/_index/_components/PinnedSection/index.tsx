import { Document } from "~/types/post";
import PostList from "./PostList";

export default function PinnedSection({ postList }: { postList: Document[] }) {
  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col">
      <PostList postList={postList} />
    </section>
  );
}
