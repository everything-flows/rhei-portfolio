import { useLoaderData } from "@remix-run/react";
import { GNB } from "@rhei/ui";

import { DocumentType } from "~/types/post";
import PostHeader from "./_components/PostHeader";
import PostContent from "~/components/PostContent";
import PostDirectory from "~/components/PostDirectory";

export { default as loader } from "./_utils/loader";

export default function PostPage() {
  const { postData } = useLoaderData();

  if (!postData) {
    return null;
  }

  return (
    <>
      <header className="content-x">
        <GNB />
      </header>

      <main className="content-x">
        <PostHeader data={postData} />

        {postData.postData?.type === DocumentType.Post && (
          <PostContent content={postData.parsedContent} />
        )}

        {postData.postData?.type === DocumentType.Directory && (
          <PostDirectory postList={postData.childPostList!} />
        )}
      </main>
    </>
  );
}
