import { useLoaderData, useParams, useRouteLoaderData } from "@remix-run/react";
import { GNB } from "@rhei/ui";
import { createBrowserClient } from "@supabase/ssr";
import { HydrationBoundary, useSuspenseQuery } from "@tanstack/react-query";

import AsyncErrorBoundary from "~/_components/AsyncErrorBoundary";
import PostDirectory from "~/components/PostDirectory";

import { subBlogInfoQueryOptions } from "./_utils/getSubBlogInfo";
import { subBlogPostListQueryOptions } from "./_utils/getSubBlogPostList";
import PostHeader from "../$subBlogId.$postId._index/_components/PostHeader";

export { default as loader } from "./_utils/loader";

function SubBlogPage({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  const { subBlogId } = useParams();
  const { supabaseCredential } = useRouteLoaderData("root");
  const supabaseClient = createBrowserClient(
    supabaseCredential.url,
    supabaseCredential.key,
  );

  const { data: blogInfo } = useSuspenseQuery(
    subBlogInfoQueryOptions(supabaseClient, subBlogId!),
  );
  const { data: postResult } = useSuspenseQuery(
    subBlogPostListQueryOptions(supabaseClient, subBlogId!, currentPage),
  );

  const { postList: postData } = postResult;

  if (!blogInfo || !postData) {
    return null;
  }

  return (
    <>
      <header className="content-x">
        <GNB route="/blog/" />
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

export default function PostPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { dehydratedState, currentPage, totalPages } = useLoaderData() as any;

  return (
    <HydrationBoundary state={dehydratedState}>
      <AsyncErrorBoundary>
        <SubBlogPage currentPage={currentPage} totalPages={totalPages} />
      </AsyncErrorBoundary>
    </HydrationBoundary>
  );
}
