import { Footer } from "@rhei/ui";

import { type Example, EXAMPLE_LIST } from "./constants";

function Card({ data }: { data: Example }) {
  const { title, component } = data;
  return (
    <article className="p-2">
      <h2 className="text-[1.25rem] font-bold">{title}</h2>
      <div className="border-sub w-fit rounded-xl border p-2">
        <>{component}</>
      </div>
    </article>
  );
}

export default function Page() {
  return (
    <>
      <main className="content-x">
        <h1 className="mx-auto w-full max-w-6xl text-[2rem] font-bold">
          Wavy text
        </h1>

        <section className="mx-auto flex w-full max-w-6xl flex-col gap-4">
          {EXAMPLE_LIST.map((data) => (
            <Card key={data.title} data={data} />
          ))}
        </section>
      </main>

      <Footer />
    </>
  );
}
