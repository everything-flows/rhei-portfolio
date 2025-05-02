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

      <article className="">
        <h3 className="text-h5 bg-normal">
          스타트업 인턴, 창업 동아리 활동을 통해 빠르고 정확하게 MVP를 개발한
          경험이 있습니다.
        </h3>

        <ul className="mt-2 list-disc ps-6">
          <li>
            <Link
              to="https://coinscope.gg"
              className="text-brand whitespace-pre underline"
            >
              CoinScope 웹
            </Link>{" "}
            및 어드민 페이지 제작
          </li>
          <li>서강대학교 창업경진대회 우수상 수상</li>
        </ul>
      </article>

      <article className="mt-4">
        <h3 className="text-h5 bg-normal">
          CS 지식을 활용하여 문제를 해결하는 것을 좋아합니다.
        </h3>

        <ul className="mt-2 list-disc ps-6">
          <li>
            자료구조, 알고리즘을 구현하는 것에 흥미를 가지고 알고리즘 대회 참여,
            문제 출제 등의 활동을 하였습니다.
          </li>
          <li>
            <Link
              to="https://www.acmicpc.net/user/psst54"
              className="text-brand whitespace-pre underline"
            >
              Baekjoon & Solved.ac Platinum II{" "}
            </Link>
          </li>
        </ul>
      </article>

      <article className="mt-8">
        <StickyHeading>
          <h3 className="text-h3 bg-normal mb-2">사용하는 기술</h3>
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
    </section>
  );
}
