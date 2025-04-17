import PinnedHeader from "./PinnedHeader";
import PostList from "./PostList";

export default function PinnedSection({ postList }) {
  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col">
      <PinnedHeader />

      <PostList postList={postList} />
    </section>
  );
}
