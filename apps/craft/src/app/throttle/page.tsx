import { Footer } from "@rhei/ui";

export default async function ThrottlePage() {
  return (
    <>
      <main className="content-x">
        <h1 className="mx-auto w-full max-w-6xl text-[2rem] font-bold">
          스로틀 (Throttle) 예제
        </h1>
        <p className="mx-auto w-full max-w-6xl">
          reference:{" "}
          <a
            href="https://css-tricks.com/debouncing-throttling-explained-examples/"
            className="text-brand underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://css-tricks.com/debouncing-throttling-explained-examples/
          </a>
        </p>

        <article className="mx-auto mt-4 flex w-full max-w-6xl flex-wrap gap-x-4 gap-y-5">
          <section className="border-reverse bg-gray-white flex w-full flex-col gap-4 rounded-xl border">
            <iframe
              src="https://debounce.rhei.me/throttle/trailing"
              allowFullScreen
              loading="lazy"
              className="h-[320px] w-full"
            ></iframe>
          </section>

          <section className="border-reverse bg-gray-white flex w-full flex-col gap-4 rounded-xl border">
            <iframe
              src="https://debounce.rhei.me/throttle/leading"
              allowFullScreen
              loading="lazy"
              className="h-[320px] w-full"
            ></iframe>
          </section>

          <section className="border-reverse bg-gray-white flex w-full flex-col gap-4 rounded-xl border">
            <iframe
              src="https://debounce.rhei.me/throttle/leading-trailing"
              allowFullScreen
              loading="lazy"
              className="h-[320px] w-full"
            ></iframe>
          </section>
        </article>
      </main>

      <Footer />
    </>
  );
}

export const runtime = "edge";
