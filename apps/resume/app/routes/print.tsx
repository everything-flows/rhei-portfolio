import Activity from "./_index/_components/Activity";
import Education from "./_index/_components/Education";
import Info from "./_index/_components/Info";
import Language from "./_index/_components/Language";
import Project from "./_index/_components/Project";
import Summary from "./_index/_components/Summary";
import Work from "./_index/_components/Work";

export default function ResumePage() {
  return (
    <>
      <main className="content-x text-p py-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-6">
          <Info />
          <Summary />
          <Work />
          <Project />
          <Education />
          <Language />
          <Activity />
        </div>
      </main>
    </>
  );
}
