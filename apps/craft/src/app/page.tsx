import { Footer } from "@rhei/ui";
import Link from "next/link";

export default async function Home() {
  return (
    <>
      <main className="content-x">
        <section className="mx-auto w-full max-w-6xl">
          <h1>나의 작은 쓰레기장</h1>

          <div className="mt-8 grid grid-cols-[1fr] gap-x-3 gap-y-4 sm:grid-cols-[1fr_1fr] lg:grid-cols-[1fr_1fr_1fr]">
            <Link href="/debounce" className="border-sub rounded-md border p-4">
              <article className="flex flex-col">
                <img
                  src="https://tnzycdohhtvupgagmwfx.supabase.co/storage/v1/object/public/rhei-craft//debounce.webp"
                  alt="fake3dPill thumbnail"
                  className="border-sub mb-4 aspect-[16/9] rounded-md border object-cover"
                />
                Debounce 예시
              </article>
            </Link>

            <Link href="/throttle" className="border-sub rounded-md border p-4">
              <article className="flex flex-col">
                <img
                  src="https://tnzycdohhtvupgagmwfx.supabase.co/storage/v1/object/public/rhei-craft//throttle.webp"
                  alt="fake3dPill thumbnail"
                  className="border-sub mb-4 aspect-[16/9] rounded-md border object-cover"
                />
                Throttle 예시
              </article>
            </Link>

            <Link
              href="/fake3dPill"
              className="border-sub rounded-md border p-4"
            >
              <article className="flex flex-col">
                <img
                  src="https://tnzycdohhtvupgagmwfx.supabase.co/storage/v1/object/public/rhei-craft//fake3dPill.webp"
                  alt="fake3dPill thumbnail"
                  className="border-sub mb-4 aspect-[16/9] rounded-md border object-cover"
                />
                Fake 3D 알약
              </article>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export const runtime = "edge";
