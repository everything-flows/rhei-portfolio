import { Footer, GNB } from "@rhei/ui";

import { useLoaderData, useParams, useRouteLoaderData } from "@remix-run/react";
import { createBrowserClient } from "@supabase/ssr";
import { HydrationBoundary, useSuspenseQuery } from "@tanstack/react-query";
import PostContent from "~/components/PostContent";
import PostDirectory from "~/components/PostDirectory";
import { DocumentType } from "~/types/post";
import PostHeader from "./_components/PostHeader";
import { postDetailQueryOptions } from "./_utils/getPostData";

export { default as loader } from "./_utils/loader";
export { default as meta } from "./_utils/meta";

function PostPage() {
  const { subBlogId, postId } = useParams();

  const { supabaseCredential } = useRouteLoaderData("root");
  const supabaseClient = createBrowserClient(
    supabaseCredential.url,
    supabaseCredential.key,
  );

  const { data: postData } = useSuspenseQuery(
    postDetailQueryOptions(supabaseClient, subBlogId, postId),
  );

  const { postInfo, postContent, childPostList } = postData;
  const { type } = postInfo;

  return (
    <>
      <header className="content-x">
        <GNB route="/blog" />
      </header>

      <main className="content-x">
        <PostHeader key={postInfo.id} data={postInfo} />

        {(() => {
          switch (type) {
            case DocumentType.Post:
              return <PostContent content={postContent} />;
            case DocumentType.Directory:
              return <PostDirectory postList={childPostList!} />;
            // FIXME
          }
        })()}
      </main>

      <Footer />
    </>
  );
}

export default function PostDetailRoute() {
  const { dehydratedState } = useLoaderData();
  const { postId } = useParams();

  return (
    <HydrationBoundary state={dehydratedState}>
      <PostPage key={postId} />
    </HydrationBoundary>
  );
}
