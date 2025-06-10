import SyntaxHighlighter from "react-syntax-highlighter";
import { nord } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Footer } from "@rhei/ui";

import { type Example, EXAMPLE_LIST } from "./constants";
import WavyText from "./WavyText";

function Card({ data }: { data: Example }) {
  const { title, description, component, code } = data;
  return (
    <article className="p-2">
      <h2 className="text-[1.5rem] font-bold">{title}</h2>
      <p>{description}</p>

      <p className="mt-4">출력 결과</p>
      <div className="border-sub w-fit rounded-xl border p-2">
        <>{component}</>
      </div>

      <p className="mt-4">예시 코드</p>
      {/* @ts-ignore */}
      <SyntaxHighlighter language={"jsx"} style={nord} className="rounded-md">
        {code}
      </SyntaxHighlighter>
    </article>
  );
}

export default function Page() {
  return (
    <>
      <main className="content-x">
        <h1 className="mx-auto w-full max-w-6xl text-[2rem] font-bold">
          <WavyText>Wavy text</WavyText>
        </h1>

        <section className="mx-auto flex w-full max-w-6xl flex-col gap-8">
          {EXAMPLE_LIST.map((data) => (
            <Card key={data.title} data={data} />
          ))}
        </section>
      </main>

      <Footer />
    </>
  );
}
