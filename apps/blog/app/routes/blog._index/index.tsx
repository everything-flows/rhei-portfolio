import type { MetaFunction } from "@remix-run/cloudflare";
import { GNB } from "@rhei/ui";

import PinnedSection from "./_components/PinnedSection";
import { useLoaderData } from "@remix-run/react";

export { default as loader } from "./_utils/loader";
export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

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
    </>
  );
}
