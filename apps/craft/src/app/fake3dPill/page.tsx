import { Footer } from "@rhei/ui";
import Pill from "./Pill";

export default async function fake3dPillPage() {
  return (
    <>
      <main className="content-x">
        <h1 className="mx-auto w-full max-w-6xl text-[2rem] font-bold">
          Fake 3D 알약
        </h1>
        <p className="mx-auto w-full max-w-6xl">
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

        <article className="mx-auto mt-4 flex w-full max-w-6xl flex-wrap gap-x-4 gap-y-5">
          <section className="flex flex-col gap-4 rounded-xl bg-gray-400/30 px-8 py-4">
            <div className="flex flex-wrap justify-center gap-8">
              <Pill />
              <Pill fill={false} />
            </div>
          </section>
        </article>
      </main>

      <Footer />
    </>
  );
}

export const runtime = "edge";
