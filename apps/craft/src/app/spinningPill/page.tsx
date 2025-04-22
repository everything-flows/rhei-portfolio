import { Footer } from "@rhei/ui";
import Pill from "./Pill";

export default async function SpinningPillPage() {
  return (
    <>
      <main className="content-x">
        <h1>Fake 3D 알약 만들기</h1>

        <article className="mx-auto w-full max-w-6xl">
          <Pill />
        </article>
      </main>

      <Footer />
    </>
  );
}

export const runtime = "edge";
