import { Document, DocumentType } from "@/types/post";
import { getPostById } from "@/utils/getPostById";
import { createClient } from "@/utils/supabase-server";
import { getChildPostList } from "@/utils/getChildPostList";
import parse from "./parse";

function isNormalPost(data: Document) {
  return data.type === DocumentType.Post;
}

export async function getPostData(subBlogId: string, postId: string) {
  const supabaseClient = await createClient();

  const postData = await getPostById({ supabaseClient, subBlogId, postId });

  if (!postData) {
    return { postData: null };
  }

  if (isNormalPost(postData)) {
    return {
      postData,
      parsedContent: await parse("# Table Of Contents\n" + postData.content),
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
