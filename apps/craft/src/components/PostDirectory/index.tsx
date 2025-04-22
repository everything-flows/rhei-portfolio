import type { Document } from "@/types/post";
import Link from "next/link";

export default function PostDirectory({ postList }: { postList: Document[] }) {
  return (
    <section className="mx-auto max-w-6xl">
      <ol className="flex flex-col">
        {postList?.map((post) => (
          <li key={post.id}>
            <Link href={`/${post.subBlog}/${post.id}`}>
              <article className="grid grid-cols-1 gap-4 py-1 sm:grid-cols-[10rem_auto]">
                {post.thumbnail ? (
                  <img
                    src={post.thumbnail}
                    className="border-sub aspect-4/3 w-full shrink-0 rounded-lg border object-cover"
                  />
                ) : (
                  <div className="border-sub aspect-4/3 w-full shrink-0 rounded-lg border" />
                )}
                <div className="flex flex-col py-2">
                  <h2 className="text-responsive-h3">{post.title}</h2>
                  <p className="text-responsive-hp">{post.subTitle}</p>
                </div>
              </article>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}
