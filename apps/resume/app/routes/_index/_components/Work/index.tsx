import { StickyHeading } from "@rhei/react";

const WORK = [
  {
    title: "카카오",
    period: "2024.01 - 2024.02",
    location: "경기도 성남시",
    position: "FE 개발자 (인턴) | FE 플랫폼팀",
    description: "TypeScript를 활용한 인턴십 과제 수행: 블록 코딩 서비스 구현",
    stack: ["TypeScript"],
    content: [{ title: "[ 비동기 처리를 통한 블록 실행 개선 ]", list: "" }],
  },
  {
    title: "호랑에듀",
    period: "2023.09 - 2023.11",
    location: "원격근무",
    position: "FE 개발자 (인턴) | 개발팀",
    description:
      "한글 코딩 언어를 이용한 종합 코딩 교육 플랫폼 | React를 이용한 웹 및 앱 서비스 구현 및 유지보수",
    stack: ["TypeScript", "React.js", "Supabase"],
  },
];

export default function Work() {
  return (
    <section>
      <StickyHeading>
        <h2 className="text-h2 bg-normal border-sub mb-2 border-b">업무</h2>
      </StickyHeading>

      <ol className="flex flex-col gap-8">
        {WORK.map((work) => (
          <li key={work.title}>
            <article>
              <div className="flex flex-col justify-between gap-x-4 sm:flex-row">
                <p className="flex gap-x-4 sm:flex-col">
                  <span className="mr-2 font-extrabold">{work.title}</span>
                  <span className="text-sub">{work.position}</span>
                </p>
                <p className="flex gap-x-4 sm:flex-col sm:text-right">
                  <span>{work.period}</span>
                  <span className="text-sub">{work.location}</span>
                </p>
              </div>

              <p className="mt-2">{work.description}</p>
              <ul className="flex flex-wrap gap-x-2 gap-y-1">
                {work.stack?.map((stack) => (
                  <li
                    key={stack}
                    className="rounded-md bg-gray-100 px-2 dark:bg-gray-600"
                  >
                    {stack}
                  </li>
                ))}
              </ul>
            </article>
          </li>
        ))}
      </ol>
    </section>
  );
}
