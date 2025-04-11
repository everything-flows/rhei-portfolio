import PinnedSection from "./_components/PinnedSection";

export default async function Home() {
  return (
    <main className="content-x">
      <PinnedSection />
    </main>
  );
}

export const runtime = "edge";
