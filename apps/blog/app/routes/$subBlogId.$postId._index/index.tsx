import { useLoaderData } from "@remix-run/react";
import { Footer, GNB } from "@rhei/ui";

import { DocumentType } from "~/types/post";
import PostHeader from "./_components/PostHeader";
import PostContent from "~/components/PostContent";
import PostDirectory from "~/components/PostDirectory";

export { default as loader } from "./_utils/loader";
export { default as meta } from "./_utils/meta";

export default function PostPage() {
  const { postData } = useLoaderData();

  if (!postData) {
    return null;
  }

  const { postInfo, postContent, childPostList } = postData;
  const { type } = postInfo;

  return (
    <>
      <header className="content-x">
        <GNB route="/blog" />
      </header>

      <main className="content-x">
        <PostHeader data={postInfo} />

        {type === DocumentType.Post && <PostContent content={postContent} />}

        {type === DocumentType.Directory && (
          <PostDirectory postList={childPostList!} />
        )}
      </main>

      <Footer />
    </>
  );
}
