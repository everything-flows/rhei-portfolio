import { Footer } from "@rhei/ui";
import Link from "next/link";

export default async function Home() {
  return (
    <>
      <main className="content-x">
        <section className="mx-auto w-full max-w-6xl">
          <h1>나의 작은 쓰레기장</h1>

          <div className="mt-8 flex">
            <Link
              href="/fake3dPill"
              className="border-sub rounded-md border p-4"
            >
              <img
                src="https://tnzycdohhtvupgagmwfx.supabase.co/storage/v1/object/public/rhei-craft//fake3dPill.webp"
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
