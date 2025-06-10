import { Footer } from "@rhei/ui";
import Pill from "./Pill";

export default async function fake3dPillPage() {
  return (
    <>
      <main className="content-x">
        <h1 className="mx-auto w-full max-w-6xl text-[2rem] font-bold">
          Fake 3D 알약
        </h1>

        <section className="mx-auto mt-4 flex w-full max-w-6xl flex-wrap gap-x-4 gap-y-5">
          <article className="flex flex-col gap-4 rounded-md bg-gray-400/30 px-8 py-4">
            <div className="flex flex-wrap justify-center gap-8">
              <Pill />
              <Pill fill={false} />
            </div>
          </article>

          <article className="flex flex-col gap-4 rounded-md bg-gray-400/30 px-8 py-4">
            <div className="flex flex-wrap justify-center gap-8">
              <Pill />
            </div>
          </article>
        </section>

        <p className="mx-auto mt-20 w-full max-w-6xl">
          reference:{" "}
          <a
            href="https://x.com/astelance/status/1911492586839412775"
            className="text-brand underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://x.com/astelance/status/1911492586839412775
          </a>
        </p>
      </main>

      <Footer />
    </>
  );
}

export const runtime = "edge";
