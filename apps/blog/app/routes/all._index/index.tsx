import { useLoaderData, useRouteLoaderData } from "@remix-run/react";
import { Footer, GNB } from "@rhei/ui";
import { createBrowserClient } from "@supabase/ssr";
import { HydrationBoundary, useSuspenseQuery } from "@tanstack/react-query";

import AsyncErrorBoundary from "~/_components/AsyncErrorBoundary";
import PostDirectory from "~/components/PostDirectory";
import { allPostListQueryOptions } from "~/utils/getPostList";

export { default as loader } from "./_utils/loader";

function AllPageContent({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  const { supabaseCredential } = useRouteLoaderData("root");
  const supabaseClient = createBrowserClient(
    supabaseCredential.url,
    supabaseCredential.key,
  );

  const { data: postResult } = useSuspenseQuery(
    allPostListQueryOptions(supabaseClient, currentPage),
  );

  const { postList } = postResult;

  return (
    <>
      <header className="content-x">
        <GNB route="/blog" />
      </header>

      <main className="content-x flex flex-col">
        <PostDirectory
          postList={postList}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </main>

      <Footer />
    </>
  );
}

export default function AllPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { dehydratedState, currentPage, totalPages } = useLoaderData() as any;

  return (
    <HydrationBoundary state={dehydratedState}>
      <AsyncErrorBoundary>
        <AllPageContent currentPage={currentPage} totalPages={totalPages} />
      </AsyncErrorBoundary>
    </HydrationBoundary>
  );
}
