import { useLoaderData, useParams, useRouteLoaderData } from "@remix-run/react";
import { GNB } from "@rhei/ui";
import { createBrowserClient } from "@supabase/ssr";
import {
  DehydratedState,
  HydrationBoundary,
  useSuspenseQueries,
} from "@tanstack/react-query";

import AsyncErrorBoundary from "~/_components/AsyncErrorBoundary";
import PostDirectory from "~/components/PostDirectory";
import PostHeader from "~/components/PostHeader";

import { subBlogInfoQueryOptions } from "./_utils/getSubBlogInfo";
import { subBlogPostListQueryOptions } from "./_utils/getSubBlogPostList";

import type loader from "./_utils/loader";

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

  const [{ data: blogInfo }, { data: postResult }] = useSuspenseQueries({
    queries: [
      subBlogInfoQueryOptions(supabaseClient, subBlogId!),
      subBlogPostListQueryOptions(supabaseClient, subBlogId!, currentPage),
    ],
  });

  const { postList: postData } = postResult;

  return (
    <>
      <header className="content-x">
        <GNB route="/blog" />
      </header>

      <main className="content-x">
        <PostHeader post={blogInfo!} />

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
  const { dehydratedState, currentPage, totalPages } =
    useLoaderData<typeof loader>();

  return (
    <HydrationBoundary state={dehydratedState as unknown as DehydratedState}>
      <AsyncErrorBoundary>
        <SubBlogPage currentPage={currentPage} totalPages={totalPages} />
      </AsyncErrorBoundary>
    </HydrationBoundary>
  );
}
