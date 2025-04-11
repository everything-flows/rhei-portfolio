import GNBWrapper from "./_components/GNBWrapper";

export default async function Home() {
  return (
    <>
      <GNBWrapper />

      <main className="content-x">
        <section className="mx-auto max-w-6xl">section</section>
        <section className="mx-auto max-w-6xl">section</section>
        <section className="mx-auto max-w-6xl">section</section>
        <section className="mx-auto max-w-6xl">section</section>
      </main>
    </>
  );
}

export const runtime = "edge";
