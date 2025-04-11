import getPinnedPostList from "./getPinnedPostList";

export default async function PinnedSection() {
  const data = await getPinnedPostList();

  return (
    <section className="mx-auto max-w-6xl">
      <h2 className="text-3xl font-bold mb-4">Pinned Posts</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {data.map((post) => (
          <li key={post.id} className="p-4 border rounded-lg">
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
