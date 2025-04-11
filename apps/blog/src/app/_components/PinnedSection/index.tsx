import getPinnedPostList from "./getPinnedPostList";
import PinnedHeader from "./PinnedHeader";

export default async function PinnedSection() {
  const data = await getPinnedPostList();

  return (
    <section className="mx-auto flex max-w-6xl flex-col gap-4">
      <PinnedHeader />

      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {data.map((post) => (
          <li key={post.id} className="rounded-lg border p-4">
            <a href={`/blog/${post.subBlog}/${post.id}`}>
              <h3 className="text-xl font-semibold">{post.title}</h3>
              <p>{post.subTitle}</p>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
