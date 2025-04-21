import { Link } from "@remix-run/react";
import { StickyHeading } from "@rhei/react";

const STACK = [
  {
    title: "핵심 스택",
    list: [
      {
        title: "JavaScript",
        link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
      },
      { title: "TypeScript", link: "https://www.typescriptlang.org/" },
      { title: "React", link: "https://react.dev/" },
      { title: "Next.js", link: "https://nextjs.org/" },
      { title: "Remix", link: "https://remix.run/" },
    ],
  },
  {
    title: "상태 관리",
    list: [
      { title: "Tanstack Query", link: "https://tanstack.com/query/latest" },
      { title: "Zustand", link: "https://zustand-demo.pmnd.rs/" },
      { title: "Redux", link: "https://redux.js.org/" },
    ],
  },
  {
    title: "스타일링",
    list: [
      { title: "Tailwind", link: "https://tailwindcss.com/" },
      { title: "Emotion", link: "https://emotion.sh/docs/introduction" },
      { title: "Styled Components", link: "https://styled-components.com/" },
    ],
  },
];
export default function Summary() {
  return (
    <section>
      <StickyHeading>
        <h2 className="text-h2 bg-normal border-sub mb-2 border-b">요약</h2>
      </StickyHeading>

      <article>
        <StickyHeading>
          <h3 className="text-h3 bg-normal">사용하는 기술</h3>
        </StickyHeading>

        <ul className="flex flex-col gap-2">
          {STACK.map((stack) => (
            <li key={stack.title} className="grid grid-cols-[6rem_auto]">
              <p>{stack.title}</p>
              <p className="flex flex-wrap gap-x-2 gap-y-1">
                {stack.list.map((item) => (
                  <Link
                    to={item.link}
                    className="rounded-md bg-gray-100 px-2 dark:bg-gray-600"
                  >
                    {item.title}
                  </Link>
                ))}
              </p>
            </li>
          ))}
        </ul>
      </article>

      <article className="mt-8">
        <h3 className="text-h5 bg-normal">
          스타트업 인턴, 창업 동아리 활동을 통해 빠르고 정확하게 MVP를 개발한
          경험이 있습니다.
        </h3>

        <p>
          CoinScope 메인 페이지 및 어드민 페이지 제작{" "}
          <Link
            to="https://coinscope.gg"
            className="text-brand whitespace-pre underline"
          >
            [ 링크 → ]
          </Link>
        </p>
      </article>
    </section>
  );
}
