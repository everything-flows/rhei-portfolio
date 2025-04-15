import { DocumentType } from "@/types/post";

import PostHeader from "./_components/PostHeader";
import { getPostData } from "./getPostData";
import PostContent from "@/components/PostContent";
import PostDirectory from "@/components/PostDirectory";

export default async function PostPage({
  params,
}: {
  params: Promise<{ subBlogId: string; postId: string }>;
}) {
  const { subBlogId, postId } = await params;
  const data = await getPostData(subBlogId, postId);

  if (!data) {
    return <div />;
  }

  return (
    <main className="content-x">
      <PostHeader data={data} />

      {data.postData?.type === DocumentType.Post && (
        <PostContent content={data.parsedContent} />
      )}

      {data.postData?.type === DocumentType.Directory && (
        <PostDirectory postList={data.childPostList!} />
      )}
    </main>
  );
}

export const runtime = "edge";
