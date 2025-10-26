import SectionTitle from "../SectionTitle";

export default function Project() {
  return (
    <section>
      <SectionTitle content="Project" />

      <ol className="text-p flex flex-col gap-8">
        {PROJECT.map((project) => (
          <li key={project.title}>
            <article>
              <div className="flex flex-col justify-between gap-x-4 sm:flex-row">
                <p className="flex gap-x-4 sm:flex-col">
                  <span className="mr-2 font-extrabold">{project.title}</span>
                  <span className="text-sub">{project.position}</span>
                </p>
                <p className="flex gap-x-4 sm:flex-col sm:text-right">
                  <span className="text-sub">{project.location}</span>
                </p>
              </div>

              <p className="mt-2">{project.description}</p>

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
                          className="ms-6 list-[circle] text-gray-800 dark:text-gray-200"
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
    period: "",
    location: "2025.04 - 진행중",
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
        title: "모노레포 기반 구조 설계",
        list: [
          "Remix와 Next.js로 개발된 앱들을 pnpm 기반의 모노레포로 통합하여 하나의 도메인(rhei.me) 아래에서 운영",
          "공통 컴포넌트(GNB, Footer 등)는 `packages/ui`로 분리해 재사용성을 높이고 유지보수를 단순화",
        ],
      },
      {
        title: "블로그 성능 및 검색 엔진 최적화",
        list: [
          <>
            <a
              href="https://rhei.me/blog/cse/making-blog-with-remix-6-optimization-1"
              className="text-brand underline after:content-['_↗']"
            >
              최적화 과정
            </a>
            을 거쳐 메인 페이지 Lighthouse 측정 결과 55점에서 95점으로 향상
          </>,
          "부가적인 UI 요소(breadcrumb)와 비중이 적은 동적 콘텐츠(tag)는 CSR을 적용해 초기 페이지 로딩 속도를 개선",
          "이미지 및 폰트에 lazy loading 적용 및 캐싱을 통한 초기 페이지 로딩 속도 개선",
          "이전 9개월 대비 클릭수 72.25%, 노출수 85.9% 성장",
        ],
      },
    ],
  },
  {
    title: "Coinscope.gg",
    period: "",
    location: "2024.11 - 진행중",
    position: "팀 프로젝트 / FE 개발자",
    description: "암호화폐 관련 주요 이벤트 큐레이션",
    stack: ["TypeScript", "Next.js", "Tailwind"],
    link: [{ title: "coinscope.gg", href: "https://coinscope.gg" }],
    content: [
      {
        title: "검색 필터링 상태 관리 개선",
        list: [
          "필터링 데이터를 지역 상태에서 URL을 이용한 전역 상태로 전환 후 UX 및 유지보수성 개선",
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
          "SSR 적용 및 이미지 Lazy Loading, api 분리 등을 통해 렌더링 속도 향상",
          <strong className="font-bold">일 평균 노출수 870% 성장</strong>,
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
              Git branch 전략 및 배포 파이프라인 구축
            </a>
          </>,
          <>
            <a
              className="text-brand underline after:content-['_↗']"
              href="https://rhei.me/blog/cse/cspg-design-system-text"
            >
              디자인 시스템 구현
            </a>{" "}
            및 Storybook 세팅
          </>,
        ],
      },
    ],
  },
];
