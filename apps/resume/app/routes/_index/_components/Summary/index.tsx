import { Link } from "@remix-run/react";
import { StickyHeading } from "@rhei/react";

export default function Summary() {
  return (
    <section>
      <StickyHeading>
        <h2 className="text-h2 bg-normal border-sub mb-2 border-b">요약</h2>
      </StickyHeading>

      <article>
        <h3 className="text-h5 bg-normal">
          개발자와 사용자에게 좋은 경험을 줄 수 있는 방법을 찾고 있습니다.
        </h3>

        <ul className="mt-2 list-disc ps-6">
          <li>
            디자인 시스템처럼, 반복되는 요소를 규칙화하고, 시스템을 잘 사용할 수
            있도록 문서화하는 작업에 열중합니다.
          </li>
          <li>
            인터랙션 팀에서 사용자와의 인터랙션에 사용되는 컴포넌트들을
            유지보수하고 있습니다.
          </li>
        </ul>
      </article>

      <article className="mt-8">
        <h3 className="text-h5 bg-normal">사용하는 기술</h3>
        <table
          className="border-separate border-spacing-y-1"
          role="table"
          aria-label="사용 기술 목록"
        >
          <thead>
            <tr>
              <th scope="col" className="sr-only">
                카테고리
              </th>
              <th scope="col" className="sr-only">
                기술 목록
              </th>
            </tr>
          </thead>
          <tbody>
            {STACK.map((stack) => (
              <tr key={stack.title}>
                <th
                  scope="row"
                  className="whitespace-nowrap pr-2 text-left align-top font-semibold"
                >
                  {stack.title}
                </th>
                <td className="align-top">
                  <div className="flex flex-wrap gap-1">
                    {stack.list.map((item) => (
                      <Link
                        key={item.title}
                        to={item.link}
                        className="rounded-md bg-gray-100 px-2 dark:bg-gray-700"
                        aria-label={`${item.title} 기술 문서 - 새 창에서 열림`}
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </article>
    </section>
  );
}

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
