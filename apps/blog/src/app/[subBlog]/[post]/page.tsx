import { DocumentType } from "@/types/post";

import PostHeader from "./_components/PostHeader";
import { getPostData } from "./getPostData";
import PostContent from "@/components/PostContent";

export default async function PostPage({ params }) {
  const { subBlog: subBlogId, post: postId } = await params;
  const data = await getPostData(subBlogId, postId);

  console.log(data);
  if (!data) {
    return <div />;
  }

  return (
    <main className="content-x">
      <PostHeader data={data} />

      {data.postData?.type === DocumentType.Post && (
        <PostContent content={data.parsedContent} />
      )}

      {/* <PostHeader
        id={postData.id}
        title={postData.title}
        subTitle={postData?.sub_title}
        tags={postData?.tags}
        postDate={postData?.created_at}
        categoryData={categoryData}
      />
      {postData.type === DocumentType.Post && (
        <PostContent content={parsedContent} />
      )}
      {postData.type === DocumentType.Directory && (
        <PostDatabase posts={childPostList} />
      )} */}

      <section>body</section>
    </main>
  );
}
