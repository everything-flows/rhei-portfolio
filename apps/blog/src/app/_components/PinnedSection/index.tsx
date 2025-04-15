import getPinnedPostList from "./getPinnedPostList";
import PinnedHeader from "./PinnedHeader";

export default async function PinnedSection() {
  const data = await getPinnedPostList();

  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col">
      <PinnedHeader />

      <article className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-[1fr_1fr] md:grid-cols-[2fr_3fr] lg:grid-cols-[1fr_2fr]">
        <img
          src={data[0].thumbnail}
          alt={`${data[0].title}`}
          className="aspect-16/9 w-full shrink-0 rounded-3xl border border-gray-200 object-cover sm:aspect-4/3 dark:border-gray-600"
        />
        <div>
          <h3 className="text-responsive-h2 font-900">{data[0].title}</h3>
          <p className="text-responsive-p">{data[0].subTitle}</p>
          <div className="r flex flex-wrap gap-x-2 gap-y-1">
            {data[0].tags.map((tag) => (
              <p
                key={tag.title}
                className="text-responsive-p text-brand border-brand mt-2 rounded-full border-[1.5px] px-2"
              >
                {tag.title}
              </p>
            ))}
          </div>
        </div>
      </article>

      <ul className="mt-4 flex gap-4 overflow-auto">
        {data.slice(1).map((post) => (
          <li key={post.id}>
            <a href={`/blog/${post.subBlog}/${post.id}`}>
              <article className="grid w-[min(80dvw,280px)] grid-rows-[auto,auto] gap-3">
                {post.thumbnail ? (
                  <img
                    src={post.thumbnail}
                    alt={`${post.title}`}
                    className="aspect-16/9 w-full shrink-0 rounded-3xl border border-gray-200 object-cover dark:border-gray-600"
                  />
                ) : (
                  <div className="aspect-16/9 w-full shrink-0 overflow-hidden rounded-3xl border border-gray-200 object-cover dark:border-gray-600">
                    <div className="h-full w-full rounded-3xl bg-conic-180 from-orange-300 from-10% via-blue-400 via-70% to-orange-300 to-90% opacity-[0.8] blur-[80px] dark:from-blue-900 dark:via-orange-900 dark:to-blue-800" />
                  </div>
                )}
                <div className="overflow-auto">
                  <h3 className="text-responsive-h3 font-900">{post.title}</h3>
                  <p className="text-p">{post.subTitle}</p>
                </div>
              </article>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
