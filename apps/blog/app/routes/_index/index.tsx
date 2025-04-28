import { Footer, GNB } from "@rhei/ui";

import PinnedSection from "./_components/PinnedSection";
import { useLoaderData } from "@remix-run/react";

export { default as loader } from "./_utils/loader";

export default function Index() {
  const data = useLoaderData();
  if (!data) {
    return null;
  }

  const { pinnedPostList } = data;

  return (
    <>
      <header className="content-x">
        <GNB />
      </header>

      <main className="content-x flex flex-col gap-40">
        <PinnedSection postList={pinnedPostList} />
      </main>

      <Footer />
    </>
  );
}
