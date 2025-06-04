import { StickyHeading } from "@rhei/react";

const WORK = [
  {
    title: "카카오",
    period: "2024.01 - 2024.02 (2개월)",
    location: "경기도 성남시",
    position: "FE 개발자 (인턴) | FE 플랫폼팀",
    description: "TypeScript를 활용한 인턴십 과제 수행: 블록 코딩 서비스 구현",
    stack: ["TypeScript"],
    content: [
      {
        title: "비동기 처리를 통한 블록 실행 개선",
        list: [
          "Event Loop 개념을 활용해 무한 루프와 같은 비동기 작업에서 발생하는 블로킹 문제 해결",
        ],
      },
      {
        title: "테스트코드 작성",
        list: [
          "Jest 라이브러리로 parameterized 테스트를 작성함. 약 20종의 블록 실행 로직을 드래그&드롭 없이 검증",
        ],
      },
      {
        title: "이벤트 위임을 활용한 메모리 누수 해결",
        list: ["메모리 사용 최적화를 위해 최상위 요소에서 이벤트 핸들링"],
      },
    ],
  },
  {
    title: "호랑에듀",
    period: "2023.09 - 2023.11 (3개월)",
    location: "원격근무",
    position: "FE 개발자 (인턴) | 개발팀",
    description:
      "한글 코딩 언어를 이용한 종합 코딩 교육 플랫폼 | React를 이용한 웹 및 앱 서비스 구현 및 유지보수",
    stack: ["TypeScript", "React.js", "Supabase"],
    content: [
      {
        title: "모노레포 도입",
        list: [
          "Git Submodules로 관리되던 웹, 앱 및 패키지 레포를 Yarn Workspaces를 이용해 모노레포로 통합",
          "배포 과정을 간소화하고, 웹과 앱의 버전 및 의존성을 통일하여 관리 효율성을 향상",
        ],
      },
    ],
  },
  {
    title: "원펫",
    period: "2022.02 - 2022.08 (6개월)",
    location: "서울시 강남구",
    position: "FE 개발자 (인턴) | 개발팀",
    description: "반려동물 건강 상태 진단 및 수의사와의 실시간 채팅 서비스",
    stack: ["TypeScript", "Next.js", "React Native"],
    content: [
      {
        title: "한글 검색 성능 향상",
        list: [
          "증상 검색시, 한글 검색 성능을 개선하기 위해 N-gram 및 레벤슈타인 거리 알고리즘을 활용",
          "Hangul.js 라이브러리를 사용하여 한글 처리의 정확성을 높이고, 사용자 경험을 향상",
        ],
      },
      {
        title: "AB 테스트",
        list: [
          "Google Analytics를 이용해 증상 검색에서 실제 문항 풀이로의 전환율을 높이기 위한 AB테스트 실시",
        ],
      },
      {
        title: "상태관리",
        list: [
          "Redux persist를 이용한 상태 관리로 문항 중간 저장 및 복구 기능을 제공하여 사용자 경험 향상에 기여",
        ],
      },
    ],
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
              <ul className="mt-1 flex flex-wrap gap-x-2 gap-y-1">
                {work.stack?.map((stack) => (
                  <li
                    key={stack}
                    className="rounded-md bg-gray-100 px-2 dark:bg-gray-600"
                  >
                    {stack}
                  </li>
                ))}
              </ul>

              <ul className="mt-4">
                {work.content?.map((desc) => (
                  <li key={desc.title} className="ms-6 list-disc">
                    <p className="font-extrabold">{desc.title}</p>
                    <ul>
                      {desc.list.map((item) => (
                        <li key={item} className="ms-6 list-[circle]">
                          {item}
                        </li>
                      ))}
                    </ul>
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
