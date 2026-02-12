import { useLoaderData } from "@remix-run/react";
import { Footer, GNB } from "@rhei/ui";
import { HydrationBoundary } from "@tanstack/react-query";

import AsyncErrorBoundary from "~/_components/AsyncErrorBoundary";

import PinnedSection from "./_components/PinnedSection";
import RecentSection from "./_components/RecentSection";

export { default as loader } from "./_utils/loader";
export { default as meta } from "./_utils/meta";

function Index() {
  return (
    <>
      <header className="content-x">
        <GNB route="/blog" />
      </header>

      <main className="content-x flex flex-col">
        <AsyncErrorBoundary>
          <PinnedSection />
        </AsyncErrorBoundary>
        <AsyncErrorBoundary>
          <RecentSection />
        </AsyncErrorBoundary>
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
