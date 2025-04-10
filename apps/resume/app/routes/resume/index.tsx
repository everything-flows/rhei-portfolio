// import { useLoaderData } from "@remix-run/react";
import { StickyHeading } from "@rhei/react";
import { GNB } from "@rhei/ui";

import Education from "./_components/Education";
import Activity from "./_components/Activity";
import Award from "./_components/Award";

// export { default as loader } from "./_utils/loader";

export default function ResumePage() {
  //   const { user } = useLoaderData();

  return (
    <div>
      <header className="content-x">
        {/* <GNB isLoggedIn={!user} /> */}
        <GNB />
      </header>

      <main className="content-x text-p">
        <div className="mx-auto flex max-w-6xl flex-col gap-8">
          <StickyHeading>
            <h2 className="text-h2 bg-normal">요약</h2>
          </StickyHeading>

          <Award />
          <Education />
          <Activity />
        </div>
      </main>
    </div>
  );
}
