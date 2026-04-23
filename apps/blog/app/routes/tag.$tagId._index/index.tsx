import { useLoaderData, useParams, useRouteLoaderData } from "@remix-run/react";
import { Footer, GNB } from "@rhei/ui";
import { createBrowserClient } from "@supabase/ssr";
import {
  DehydratedState,
  HydrationBoundary,
  useSuspenseQueries,
} from "@tanstack/react-query";

import AsyncErrorBoundary from "~/_components/AsyncErrorBoundary";
import PostDirectory from "~/components/PostDirectory";

import TagHeader from "./_components/TagHeader";
import { postListByTagIdQueryOptions } from "./_utils/getPostListByTagId";
import { tagDataQueryOptions } from "./_utils/getTagDataById";

import type loader from "./_utils/loader";

export { default as loader } from "./_utils/loader";
export { default as meta } from "./_utils/meta";

function TagPage({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  const { tagId } = useParams();
  const { supabaseCredential } = useRouteLoaderData("root");
  const supabaseClient = createBrowserClient(
    supabaseCredential.url,
    supabaseCredential.key,
  );

  const [{ data: tagData }, { data: postResult }] = useSuspenseQueries({
    queries: [
      tagDataQueryOptions(supabaseClient, tagId!),
      postListByTagIdQueryOptions(supabaseClient, tagId!, currentPage),
    ],
  });

  const { postList } = postResult;

  return (
    <>
      <header className="content-x">
        <GNB route="/blog" />
      </header>

      <main className="content-x">
        <TagHeader tag={tagData!} />

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

export default function PostPage() {
  const { dehydratedState, currentPage, totalPages } =
    useLoaderData<typeof loader>();

  return (
    <HydrationBoundary state={dehydratedState as unknown as DehydratedState}>
      <AsyncErrorBoundary>
        <TagPage currentPage={currentPage} totalPages={totalPages} />
      </AsyncErrorBoundary>
    </HydrationBoundary>
  );
}
