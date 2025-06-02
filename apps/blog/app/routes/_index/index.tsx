import { useLoaderData } from "@remix-run/react";
import { Footer, GNB } from "@rhei/ui";

import PinnedSection from "./_components/PinnedSection";
import RecentSection from "./_components/RecentSection";

export { default as loader } from "./_utils/loader";
export { default as meta } from "./_utils/meta";

export default function Index() {
  const data = useLoaderData();
  if (!data) {
    return null;
  }

  const { pinnedPostList, recentPostList } = data;

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
