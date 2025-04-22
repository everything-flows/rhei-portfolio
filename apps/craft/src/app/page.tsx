import { Footer } from "@rhei/ui";
import Link from "next/link";

export default async function Home() {
  return (
    <>
      <main className="content-x">
        <section className="mx-auto w-full max-w-6xl">
          <h1></h1>

          <div className="flex">
            <Link
              href="/fake3dPill"
              className="border-sub rounded-md border p-4"
            >
              <img
                src="/images/fake3dPill.png"
                alt="fake3dPill thumbnail"
                className="border-sub mb-4 h-40 w-60 rounded-md border object-cover"
              />
              Fake 3D 알약
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export const runtime = "edge";
