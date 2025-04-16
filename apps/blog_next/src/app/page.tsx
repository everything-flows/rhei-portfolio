import PinnedSection from "./_components/PinnedSection";

export default async function Home() {
  return (
    <main className="content-x flex flex-col gap-40">
      <PinnedSection />
    </main>
  );
}

export const runtime = "edge";
