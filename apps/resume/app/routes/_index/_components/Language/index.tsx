import { StickyHeading } from "@rhei/react";

export default function Language() {
  return (
    <section>
      <StickyHeading>
        <h2 className="text-h2 bg-normal border-sub mb-2 border-b">어학</h2>
      </StickyHeading>

      <ol className="flex flex-col gap-2">
        <li>
          <article>
            <p className="font-extrabold">
              <span className="mr-2">영어</span>
            </p>

            <ul className="ps-6">
              <li>
                TOEIC Speaking IH
                <span className="text-sub ml-2">2025.08.02.</span>
              </li>
            </ul>
          </article>
        </li>
        <li>
          <article>
            <p className="font-extrabold">
              <span className="mr-2">일본어</span>
            </p>

            <ul className="ps-6">
              <li>
                JLPT N1
                <span className="text-sub ml-2">2018.01.21.</span>
              </li>
            </ul>
          </article>
        </li>
      </ol>
    </section>
  );
}
