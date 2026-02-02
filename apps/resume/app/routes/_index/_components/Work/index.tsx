import { differenceInDays, format } from "date-fns";
import SectionTitle from "../SectionTitle";

export default function Work() {
  return (
    <section>
      <SectionTitle content="Work Experience" />

      <ol className="text-p flex flex-col gap-8">
        {WORK.map((work) => (
          <li key={work.title}>
            <article className="print-break-inside-avoid">
              <section className="flex flex-col lg:flex-row lg:items-end lg:justify-between">
                <section className="flex items-center gap-3">
                  <img
                    className="aspect-square size-12 rounded-xl border border-gray-200 dark:border-gray-400"
                    src={work.logo}
                    alt={work.title}
                  />
                  <div>
                    <h3 className="font-bold">{work.title}</h3>
                    <p className="text-gray-400 dark:text-gray-300">
                      {work.position}
                    </p>
                  </div>
                </section>

                <p className="whitespace-nowrap text-[1rem] text-gray-300 dark:text-gray-400">
                  {getPeriod(work.period)}
                </p>
              </section>

              <p className="font-bold">{work.description}</p>

              <ul className="my-1 flex flex-wrap gap-x-2 gap-y-1">
                {work.stack?.map((stack) => (
                  <li
                    key={stack}
                    className="rounded-md bg-gray-100 px-2 text-gray-800 dark:bg-gray-800 dark:text-gray-100"
                  >
                    {stack}
                  </li>
                ))}
              </ul>

              <ul className="text-gray-900 dark:text-gray-100">
                {work.content?.map((desc) => (
                  <li key={desc.title} className="mb-2">
                    <p className="font-bold">{desc.title}</p>
                    <ul>
                      {desc.list.map((item) => (
                        <li
                          key={item}
                          className="mb-2 ms-6 list-[circle] text-gray-800 dark:text-gray-100"
                        >
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

export function getPeriod(period: { start: string; end?: string }) {
  const { start, end } = period;

  const startDate = new Date(start);
  const endDate = end ? new Date(end) : new Date();

  return `${format(startDate, "yyyy.MM")} - ${end ? format(endDate, "yyyy.MM") : "재직중"} (${Math.round(differenceInDays(end ? endDate : new Date(), startDate) / 30)}개월)`;
}

const WORK = [
  {
    title: "비바리퍼블리카",
    logo: "https://tnzycdohhtvupgagmwfx.supabase.co/storage/v1/object/public/rhei-resume/toss.webp",
    period: {
      start: "2025-06-30",
    },
    location: "서울시 강남구",
    position: "Frontend Developer Assistant | 인터랙션팀",
    description:
      "사용자 인터랙션에 사용되는 컴포넌트와 애니메이션 라이브러리를 유지보수하며, 디자인 툴과 서비스 코드 사이의 연결을 개선했습니다.",
    stack: ["TypeScript", "React.js"],
    content: [
      {
        title: "API 마이그레이션 자동화 및 개발 생산성 개선",
        list: [
          "인터랙션 라이브러리의 API 변경 시, 여러 서비스에서 반복적으로 발생하던 수동 마이그레이션 문제를 해결하기 위해 jscodeshift 기반 자동 마이그레이션 스크립트를 작성했습니다.",
          "개발자가 명령어 한 번으로 대규모 코드 변경을 수 분 내 자동 변환할 수 있는 환경을 구축하여, 마이그레이션 비용을 크게 줄였습니다.",
          "사내 디자인 툴 데우스의 코드 생성 기능(codegen)을 최신 인터랙션 API에 맞게 개선하여, 디자인 결과물이 곧바로 서비스에 적용 가능한 코드로 이어지도록 했습니다.",
        ],
      },
      {
        title: "인터랙션 컴포넌트 성능 개선 및 안정성 강화",
        list: [
          "데우스에서 인터랙션 컴포넌트를 사용할 때 발생하던 캔버스 렌더링 성능 저하와 이미지 추출 문제를 해결했습니다.",
          "렌더링 환경(캔버스, 이미지 추출, 실제 서비스)에 따라 애니메이션의 재생 여부와 상태를 분기 처리하는 구조로 리팩토링하여 성능과 안정성을 동시에 개선했습니다.",
          "다국어 환경에서 인터랙션 컴포넌트의 텍스트가 깨지는 문제를 해결하고, 다국어 대응을 고려한 테스트 환경을 정비했습니다.",
        ],
      },
      {
        title: "문서화 체계 구축 및 내부 도구 개선",
        list: [
          "인터랙션 라이브러리의 핵심 개념과 사용 흐름을 중심으로 문서화를 진행해, 신규 사용자와 기존 사용자 모두가 빠르게 이해하고 활용할 수 있도록 했습니다.",
          "릴리즈 노트와 수동 마이그레이션 가이드를 작성해 API 변경 배경과 의도를 명확히 전달했습니다.",
          "인터랙션 팀 내부 모션 가이드 제작 툴 ‘랠디터’의 검색 및 정렬 기능을 개선하여, 가이드 작성 효율을 높였습니다.",
        ],
      },
    ],
  },
  {
    title: "카카오",
    logo: "https://tnzycdohhtvupgagmwfx.supabase.co/storage/v1/object/public/rhei-resume/kakao.svg",
    period: {
      start: "2024-01-03",
      end: "2024-02-29",
    },
    location: "경기도 성남시",
    position: "Frontend Developer (인턴) | FE 플랫폼팀",
    description: "인턴십 과제 수행: Vanilla JS 환경에서 블록 코딩 서비스 구현",
    stack: ["TypeScript", "Jest"],
    content: [
      {
        title: "Event Loop 기반 인터랙션 개선",
        list: [
          "무한 루프 블록을 실행할 때 UI가 멈추는 현상을 분석하고, Event Loop 개념을 바탕으로 사용성을 개선한 경험이 있습니다. 긴 실행 블록도 인터랙션 지연 없이 작동하도록 최적화했습니다.",
        ],
      },
      {
        title: "Jest 기반 블록 테스트 자동화",
        list: [
          "UI상에서 드래그 앤 드롭 없이도 블록 실행 로직을 검증할 수 있도록 Jest 기반 parameterized 테스트를 작성하여 약 20종의 블록을 테스트했습니다.",
        ],
      },
    ],
  },
  {
    title: "호랑에듀",
    logo: "https://tnzycdohhtvupgagmwfx.supabase.co/storage/v1/object/public/rhei-resume/horang.webp",
    period: {
      start: "2023-09-01",
      end: "2023-11-27",
    },
    location: "원격근무",
    position: "Frontend Developer (인턴) | 개발팀",
    description:
      "한글 코딩 언어를 이용한 종합 코딩 교육 플랫폼 | React를 이용한 웹 및 앱 서비스 구현 및 유지보수",
    stack: ["TypeScript", "React.js", "Supabase"],
    content: [
      {
        title: "Yarn 기반 모노레포 전환으로 배포 효율화",
        list: [
          "Git Submodules로 분리되어서 관리되던 웹, 앱 및 패키지를 Yarn Workspaces 기반의 모노레포로 통합했습니다. 결과적으로 배포 과정을 간소화하고, 웹과 앱의 버전 및 의존성을 통일하여 관리 효율성이 향상되었습니다.",
        ],
      },
    ],
  },
  {
    title: "원펫",
    logo: "https://tnzycdohhtvupgagmwfx.supabase.co/storage/v1/object/public/rhei-resume/onepet.webp",
    period: {
      start: "2022-02-21",
      end: "2022-08-31",
    },
    location: "서울시 강남구",
    position: "Frontend Developer (인턴) | 개발팀",
    description: "반려동물 건강 상태 진단 및 수의사와의 실시간 채팅 서비스",
    stack: ["TypeScript", "Next.js", "React Native"],
    content: [
      {
        title: "한글 검색 UX 개선을 위한 알고리즘 적용",
        list: [
          "증상 검색 시, 한국어의 특성상 사용자의 입력 의도와 일치하지 않는 결과가 노출되는 문제가 있었습니다. 검색 품질 향상과 초성 검색이나 유사 검색어 처리 기능을 위해 자모 분리, N-gram 등의 방법을 탐색했습니다.",
        ],
      },
      {
        title: "A/B 테스트 기반 전환율 개선",
        list: [
          "Google Analytics 기반 A/B 테스트를 설계하고, 증상 검색에서 실제 문항 풀이 페이지로로의 전환율을 높이는 방법을 탐구했습니다.",
        ],
      },
      {
        title: "Redux persist로 진단 문항 상태 유지",
        list: [
          "문항 풀이 도중 페이지 이탈 시, 상태가 초기화되는 문제 해결을 위해 상태 저장 구조를 설계했습니다. Redux persist를 이용해 문항 진행 상태 저장 및 복구 기능을 제공할 수 있었습니다.",
        ],
      },
    ],
  },
];
