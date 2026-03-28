import { useLoaderData, useParams, useRouteLoaderData } from "@remix-run/react";
import { Footer, GNB } from "@rhei/ui";
import { createBrowserClient } from "@supabase/ssr";
import { HydrationBoundary, useSuspenseQuery } from "@tanstack/react-query";

import AsyncErrorBoundary from "~/_components/AsyncErrorBoundary";
import PostDirectory from "~/components/PostDirectory";

import TagHeader from "./_components/TagHeader";
import { postListByTagIdQueryOptions } from "./_utils/getPostListByTagId";
import { tagDataQueryOptions } from "./_utils/getTagDataById";

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

  const { data: tagData } = useSuspenseQuery(
    tagDataQueryOptions(supabaseClient, tagId!),
  );
  const { data: postResult } = useSuspenseQuery(
    postListByTagIdQueryOptions(supabaseClient, tagId!, currentPage),
  );

  const { postList } = postResult;

  if (!tagData) {
    return null;
  }

  return (
    <>
      <header className="content-x">
        <GNB route="/blog/" />
      </header>

      <main className="content-x">
        <TagHeader data={tagData} />

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { dehydratedState, currentPage, totalPages } = useLoaderData() as any;

  return (
    <HydrationBoundary state={dehydratedState}>
      <AsyncErrorBoundary>
        <TagPage currentPage={currentPage} totalPages={totalPages} />
      </AsyncErrorBoundary>
    </HydrationBoundary>
  );
}
