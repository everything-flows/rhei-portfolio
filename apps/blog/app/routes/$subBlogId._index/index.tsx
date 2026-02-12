import { useLoaderData } from "@remix-run/react";
import { GNB } from "@rhei/ui";

import PostDirectory from "~/components/PostDirectory";

import PostHeader from "../$subBlogId.$postId._index/_components/PostHeader";

export { default as loader } from "./_utils/loader";

export default function PostPage() {
  const { blogInfo, postData, currentPage, totalPages } =
    useLoaderData<typeof import("./_utils/loader").default>();

  if (!blogInfo || !postData) {
    return null;
  }

  return (
    <>
      <header className="content-x">
        <GNB route="/blog" />
      </header>

      <main className="content-x">
        <PostHeader data={blogInfo} />

        <PostDirectory
          postList={postData}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </main>
    </>
  );
}
