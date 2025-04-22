import { Footer } from "@rhei/ui";
import Pill from "./Pill";

export default async function SpinningPillPage() {
  return (
    <>
      <main className="content-x">
        <h1 className="mx-auto w-full max-w-6xl text-[2rem] font-bold">
          Fake 3D 알약
        </h1>

        <article className="mx-auto flex w-full max-w-6xl flex-wrap gap-x-4 gap-y-5">
          <section className="flex flex-col gap-4 rounded-xl bg-gray-400/30 px-8 py-4">
            <h2>기본</h2>

            <div className="flex flex-wrap justify-center gap-8">
              <Pill />
              <Pill fill={false} />
            </div>
          </section>

          <section className="flex flex-col gap-4 rounded-xl bg-gray-400/30 px-8 py-4">
            <h2>크기 변화</h2>

            <div className="flex flex-wrap gap-8">
              <div className="flex flex-wrap gap-8">
                <Pill width="3rem" height="1.5rem" />
                <Pill width="3rem" height="1.5rem" fill={false} />
              </div>
              <div className="flex flex-wrap gap-8">
                <Pill width="5rem" height="2.5rem" />
                <Pill width="5rem" height="2.5rem" fill={false} />
              </div>
            </div>
          </section>

          <section className="flex flex-col gap-4 rounded-xl bg-gray-400/30 px-8 py-4">
            <h2>속도 변화</h2>

            <div className="flex flex-wrap gap-8">
              <div className="flex flex-wrap gap-8">
                <Pill speed={300} />
                <Pill speed={300} fill={false} />
              </div>
              <div className="flex flex-wrap gap-8">
                <Pill speed={700} />
                <Pill speed={700} fill={false} />
              </div>
            </div>
          </section>
        </article>
      </main>

      <Footer />
    </>
  );
}

export const runtime = "edge";
