import { Link, useLoaderData } from "@remix-run/react";
import { Footer, GNB } from "@rhei/ui";

import PinnedSection from "./_components/PinnedSection";
import RecentSection from "./_components/RecentSection";

export { default as loader } from "./_utils/loader";
export function meta({ data }) {
  return [
    {
      rel: "preload",
      as: "image",
      href: data.pinnedPostList[0].thumbnail,
      type: "image/webp",
    },
  ];
}

export default function Index() {
  const data = useLoaderData();
  if (!data) {
    return null;
  }

  const { pinnedPostList, recentPostList } = data;

  return (
    <>
      <header className="content-x">
        <GNB />
      </header>

      <main className="content-x flex flex-col">
        <section className="mx-auto mb-8 flex w-full max-w-6xl flex-col rounded-xl bg-blue-200/30 px-6 py-4 dark:bg-orange-300/20">
          <p>
            잠깐!
            <br />
            블로그 서비스를{" "}
            <Link to="https://psst54.me" className="text-brand underline">
              psst54.me
            </Link>
            에서 이전중이에요.
            <br />
            아직 작동하지 않는 기능이 있을 수 있어요.
          </p>
        </section>

        <PinnedSection postList={pinnedPostList} />
        <RecentSection postList={recentPostList} />
      </main>

      <Footer />
    </>
  );
}
