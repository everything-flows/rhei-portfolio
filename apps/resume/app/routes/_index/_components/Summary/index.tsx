import { Link } from "@remix-run/react";
import SectionTitle from "../SectionTitle";

export default function Summary() {
  return (
    <section>
      <SectionTitle content="Summary" />

      <article>
        <h3 className="text-h5 bg-normal">
          디자인 시스템과 인터랙션 라이브러리를 통해, 팀과 사용자의 경험을 함께
          개선하고 있습니다.
        </h3>

        <ul className="mt-2 list-disc ps-6">
          <li>
            반복되는 UI와 인터랙션을 규칙화해 일관된 사용자 경험을 만들고,
            개발자가 실수 없이 사용할 수 있도록 구조와 문서로 풀어내는 데 관심이
            많습니다.
          </li>
          <li>
            디자인 툴과 서비스 코드 사이에서 발생하는 간극을 줄이고, 성능
            저하·다국어 텍스트 처리 문제를 해결해 왔습니다. 단순 구현보다 “왜 이
            방식이 필요한지”를 설명할 수 있는 코드를 지향합니다.
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
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-md bg-gray-100 px-2 dark:bg-gray-800"
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
      // { title: "Redux", link: "https://redux.js.org/" },
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
