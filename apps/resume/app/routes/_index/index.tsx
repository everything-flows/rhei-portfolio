import { useLoaderData } from "@remix-run/react";
import { Footer, GNB } from "@rhei/ui";

import Summary from "./_components/Summary";
import Education from "./_components/Education";
import Activity from "./_components/Activity";
import Award from "./_components/Award";
import Work from "./_components/Work";
import Info from "./_components/Info";
import Language from "./_components/Language";

export { default as loader } from "./_utils/loader";

export default function ResumePage() {
  const { user } = useLoaderData();

  return (
    <>
      <header className="content-x">
        <GNB isLoggedIn={!!user} route="/resume" />
      </header>

      <main className="content-x text-p">
        <div className="mx-auto flex max-w-6xl flex-col gap-8">
          <Info />
          <Summary />
          <Work />
          <Award />
          <Education />
          <Activity />
          <Language />
        </div>
      </main>

      <Footer />
    </>
  );
}
