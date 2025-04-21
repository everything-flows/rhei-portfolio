import { useLoaderData } from "@remix-run/react";
import { GNB } from "@rhei/ui";

import Summary from "./_components/Summary";
import Education from "./_components/Education";
import Activity from "./_components/Activity";
import Award from "./_components/Award";
import Work from "./_components/Work";

export { default as loader } from "./_utils/loader";

export default function ResumePage() {
  const { user } = useLoaderData();

  return (
    <div>
      <header className="content-x">
        <GNB isLoggedIn={!!user} />
      </header>

      <main className="content-x text-p">
        <div className="mx-auto flex max-w-6xl flex-col gap-8">
          <Summary />
          <Work />
          <Award />
          <Education />
          <Activity />
        </div>
      </main>
    </div>
  );
}
