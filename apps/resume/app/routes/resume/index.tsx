import { StickyHeading } from "@rhei/react";
import { GNB } from "@rhei/ui";

import Education from "./_components/Education";
import Activity from "./_components/Activity";
import Award from "./_components/Award";

export default function ResumePage() {
  return (
    <div>
      <header className="content-x">
        <GNB />
      </header>

      <main className="content-x text-p">
        <section className="mx-auto max-w-6xl">
          <h1>FRONT-END DEVELOPER</h1>

          <StickyHeading>
            <h2 className="text-h2 bg-normal">요약</h2>
          </StickyHeading>

          <Award />
          <Education />
          <Activity />
        </section>
      </main>
    </div>
  );
}
