import { Document, DocumentType } from "@/types/post";
import { getPostById } from "@/utils/getPostById";
import { createClient } from "@/utils/supabase-server";
import { getChildPostList } from "@/utils/getChildPostList";

function isNormalPost(data: Document) {
  return data.type === DocumentType.Post;
}

export async function getPostData(subBlogId: string, postId: string) {
  const supabaseClient = await createClient();

  const postData = await getPostById({ supabaseClient, subBlogId, postId });

  if (!postData) {
    return null;
  }

  if (isNormalPost(postData)) {
    return {
      postData,
    };
  }

  return {
    postData,
    childPostList: await getChildPostList({
      supabaseClient,
      subBlogId,
      parentId: postId,
    }),
  };
}
