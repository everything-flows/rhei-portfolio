import { StickyHeading } from "@rhei/react";

const WORK = [
  {
    title: "카카오",
    period: "2024.01 - 2024.02 (2개월)",
    location: "경기도 성남시",
    position: "FE 개발자 (인턴) | FE 플랫폼팀",
    description: "TypeScript를 활용한 인턴십 과제 수행: 블록 코딩 서비스 구현",
    stack: ["TypeScript", "Jest"],
    content: [
      {
        title: "Event Loop 기반 인터랙션 개선",
        list: [
          "사용자 경험 개선을 위해 블록 실행 시 UI 멈춤 현상을 분석하고, Event Loop 개념을 바탕으로 UI 업데이트 끊김을 최소화",
        ],
      },
      {
        title: "Jest 기반 블록 테스트 자동화",
        list: [
          "UI상에서 실제 드래그 없이도 블록 실행 로직을 검증할 수 있도록 Jest 기반 parameterized 테스트를 작성하여 약 20종의 블록 테스트를 커버",
        ],
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
        title: "Yarn 기반 모노레포 전환으로 배포 효율화",
        list: [
          "Git Submodules로 관리되던 웹, 앱 및 패키지 레포를 Yarn Workspaces를 이용해 모노레포로 통합",
          "배포 과정을 간소화하고, 웹과 앱의 버전 및 의존성을 통일하여 관리 효율성 향상",
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
        title: "한글 검색 UX 개선을 위한 알고리즘 적용",
        list: [
          "한국어 증상 검색 시 사용자의 입력 의도와 일치하지 않는 결과가 노출되는 문제를 개선",
          "초성 검색, 철자 오탈자 등을 포괄하기 위해 자모 분리, N-gram 등 입력어 처리",
        ],
      },
      {
        title: "A/B 테스트 기반 전환율 개선",
        list: [
          "Google Analytics 기반 A/B 테스트를 설계, 증상 검색에서 실제 문항 풀이로의 전환율을 높이는 검색 페이지로 개선",
        ],
      },
      {
        title: "Redux persist로 진단 문항 상태 유지",
        list: [
          "문항 풀이 도중 페이지 이탈 시, 상태가 초기화되는 문제 해결을 위한 상태 저장 구조 설계",
          "Redux persist를 이용해 문항 진행 상태 저장 및 복구 기능 제공",
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
