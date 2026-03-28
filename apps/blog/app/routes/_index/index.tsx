import { useLoaderData } from "@remix-run/react";
import { Footer, GNB } from "@rhei/ui";
import { HydrationBoundary } from "@tanstack/react-query";

import AsyncErrorBoundary from "~/_components/AsyncErrorBoundary";

import PinnedSection from "./_components/PinnedSection";
import RecentSection from "./_components/RecentSection";

export { default as loader } from "./_utils/loader";
export { default as meta } from "./_utils/meta";

export default function IndexRoute() {
  const { dehydratedState } = useLoaderData();

  return (
    <HydrationBoundary state={dehydratedState}>
      <Index />
    </HydrationBoundary>
  );
}

function Index() {
  return (
    <>
      <header className="content-x">
        <GNB route="/blog" />
      </header>

      <main className="content-x flex flex-col">
        <AsyncErrorBoundary
          fallbackRender={({ onRetry }) => (
            <div>
              test
              <button type="button" onClick={onRetry}>
                retry
              </button>
            </div>
          )}
        >
          <PinnedSection />
        </AsyncErrorBoundary>
        <AsyncErrorBoundary
          fallbackRender={({ onRetry }) => (
            <div>
              test
              <button type="button" onClick={onRetry}>
                retry
              </button>
            </div>
          )}
        >
          <RecentSection />
        </AsyncErrorBoundary>
      </main>

      <Footer />
    </>
  );
}
