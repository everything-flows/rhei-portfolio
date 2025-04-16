import type { MetaFunction } from "@remix-run/cloudflare";

import { GNB } from "@rhei/ui";
import PinnedSection from "./_components/PinnedSection";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <>
      <header className="content-x">
        <GNB />
      </header>

      <main className="content-x flex flex-col gap-40">
        <PinnedSection />
      </main>
    </>
  );
}
