import { useLoaderData, useRouteLoaderData } from "@remix-run/react";
import { Footer, GNB } from "@rhei/ui";

import { createBrowserClient } from "@supabase/ssr";
import { HydrationBoundary, useSuspenseQueries } from "@tanstack/react-query";
import PinnedSection from "./_components/PinnedSection";
import { pinnedPostQueryOptions } from "./_components/PinnedSection/getPinnedPostList";
import RecentSection from "./_components/RecentSection";
import { recentPostQueryOptions } from "./_components/RecentSection/getRecentPostList";

export { default as loader } from "./_utils/loader";
export { default as meta } from "./_utils/meta";

function Index() {
  const { supabaseCredential } = useRouteLoaderData("root");
  const supabase = createBrowserClient(
    supabaseCredential.url,
    supabaseCredential.key,
  );

  const [{ data: pinnedPostList }, { data: recentPostList }] =
    useSuspenseQueries({
      queries: [
        pinnedPostQueryOptions({ supabaseClient: supabase }),
        recentPostQueryOptions({ supabaseClient: supabase }),
      ],
    });

  return (
    <>
      <header className="content-x">
        <GNB route="/blog" />
      </header>

      <main className="content-x flex flex-col">
        <PinnedSection postList={pinnedPostList} />
        <RecentSection postList={recentPostList} />
      </main>

      <Footer />
    </>
  );
}

export default function IndexRoute() {
  const { dehydratedState } = useLoaderData();

  return (
    <HydrationBoundary state={dehydratedState}>
      <Index />
    </HydrationBoundary>
  );
}
