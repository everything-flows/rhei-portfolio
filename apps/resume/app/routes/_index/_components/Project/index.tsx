import { differenceInDays, format } from "date-fns";
import SectionTitle from "../SectionTitle";

export default function Project() {
  return (
    <section>
      <SectionTitle content="Project" />

      <ol className="text-p flex flex-col gap-8">
        {PROJECT.map((project) => (
          <li key={project.title}>
            <article>
              <section className="flex flex-col lg:flex-row lg:items-end lg:justify-between">
                <section className="flex items-center gap-3">
                  <div>
                    <h3 className="font-bold">
                      {project.title}
                      <span className="font-medium">
                        {" "}
                        | {project.description}
                      </span>
                    </h3>
                    <p className="text-gray-400 dark:text-gray-300">
                      {project.position}
                    </p>
                  </div>
                </section>

                <p className="whitespace-nowrap text-[1rem] text-gray-300 dark:text-gray-400">
                  {getPeriod(project.period)}
                </p>
              </section>

              <ul className="flex flex-wrap gap-x-2 gap-y-1">
                {project.link?.map((link) => (
                  <li
                    key={link.title}
                    className="text-brand font-semibold underline"
                  >
                    <a href={link.href} className="after:content-['_↗']">
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>

              <ul className="mt-1 flex flex-wrap gap-x-2 gap-y-1">
                {project.stack?.map((stack) => (
                  <li
                    key={stack}
                    className="rounded-md bg-gray-100 px-2 dark:bg-gray-600"
                  >
                    {stack}
                  </li>
                ))}
              </ul>

              <ul className="mt-4 text-gray-900 dark:text-gray-100">
                {project.content?.map((desc) => (
                  <li key={desc.title}>
                    <p className="font-extrabold">{desc.title}</p>
                    <ul>
                      {desc.list.map((item, index) => (
                        <li
                          key={index}
                          className="mb-2 ms-6 list-[circle] text-gray-800 dark:text-gray-200"
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

const PROJECT = [
  {
    title: "개인 포트폴리오 사이트",
    period: {
      start: "2025-04-01",
    },
    position: "개인 프로젝트 / FE 개발자",
    description: "이력서, 블로그, 포트폴리오 통합 사이트",
    stack: ["TypeScript", "Remix", "Next.js", "Tailwind", "Supabase"],
    link: [
      {
        title: "GitHub",
        href: "https://github.com/everything-flows/rhei-portfolio",
      },
      { title: "블로그", href: "https://rhei.me/blog" },
      { title: "실험실", href: "https://rhei.me/craft" },
    ],
    content: [
      {
        title: "블로그 성능 및 검색 엔진 최적화",
        list: [
          "초기 페이지 로딩 속도를 개선하기 위해, 중요도가 낮은 UI 요소는 CSR을 적용했습니다. 추가적으로 이미지 및 폰트에 lazy loading을 적용하고, 캐싱을 통해서 렌더링 속도를 개선한 결과, 메인 페이지 Lighthouse 점수가 55점에서 95점으로 크게 개선되었습니다.",
          "meta데이터 및 ldJson, 사이트맵 정보를 설정하여 이전 9개월 대비 일평균 클릭수 72.25%, 노출수 85.9% 성장을 이루어냈습니다.",
        ],
      },
      {
        title: "모노레포 기반 구조 설계",
        list: [
          "다양한 기술 스택을 사용하기 위해서 pnpm 기반의 모노레포 구조를 만들었습니다. Remix와 Next.js로 개발된 앱들을 하나의 도메인(rhei.me) 아래에서 운영할 수 있습니다.",
          "공통 컴포넌트(GNB, Footer 등)는 패키지로 분리해 각 도메인에서 재사용이 가능합니다.",
        ],
      },
    ],
  },
  {
    title: "Coinscope.gg",
    period: {
      start: "2024-11-01",
      end: "2025-06-29",
    },
    position: "팀 프로젝트 / FE 개발자",
    description: "암호화폐 관련 주요 이벤트 큐레이션",
    stack: ["TypeScript", "Next.js", "Tailwind"],
    link: [{ title: "coinscope.gg", href: "https://coinscope.gg" }],
    content: [
      {
        title: "검색 필터링 상태 관리 개선",
        list: [
          "UX 및 유지보수성 개선을 위해, 지역 상태로 관리되던 필터링 데이터를 URL을 이용한 전역 상태로 전환하였습니다.",
          <a
            className="text-brand underline after:content-['_↗']"
            href="https://rhei.me/blog/cse/search-filter-with-url"
          >
            상세 구현 내용 포스트
          </a>,
        ],
      },
      {
        title: "검색 엔진 최적화",
        list: [
          "SSR 적용 및 이미지 Lazy Loading, api 분리 등을 통해 렌더링 속도 향상시켰습니다.",
          <>
            그 결과로{" "}
            <strong className="font-bold">일 평균 노출수 870% 성장</strong>
            이라는 성과를 얻었습니다.
          </>,
        ],
      },
      {
        title: "개발 환경 구축",
        list: [
          <>
            단계적인 배포 및 QA를 위한{" "}
            <a
              className="text-brand underline after:content-['_↗']"
              href="https://rhei.me/blog/cse/2-branching-strategy"
            >
              Git branch 전략 및 배포 파이프라인을 구축했습니다.
            </a>
          </>,
          <>
            <a
              className="text-brand underline after:content-['_↗']"
              href="https://rhei.me/blog/cse/cspg-design-system-text"
            >
              디자인 시스템 구현
            </a>
            에 참여하고, Storybook을 세팅해 개발 편의성을 높였습니다.
          </>,
        ],
      },
    ],
  },
];

export function getPeriod(period: { start: string; end?: string }) {
  const { start, end } = period;

  const startDate = new Date(start);
  const endDate = end ? new Date(end) : new Date();

  return `${format(startDate, "yyyy.MM")} - ${end ? format(endDate, "yyyy.MM") : "진행중"} (${Math.floor(differenceInDays(end ? endDate : new Date(), startDate) / 30)}개월)`;
}
