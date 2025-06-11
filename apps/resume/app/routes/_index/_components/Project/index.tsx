import { StickyHeading } from "@rhei/react";

const PROJECT = [
  {
    title: "Coinscope.gg",
    period: "",
    location: "2024.11 - 진행중",
    position: "팀 프로젝트 / FE 개발자",
    description: "암호화폐 시장의 중요 이벤트 제공",
    stack: ["TypeScript", "Next.js", "tailwind"],
    link: [{ title: "coinscope.gg →", href: "https://coinscope.gg" }],
    content: [
      {
        title: "검색 필터링 구조 개선",
        list: [
          <>
            기존 지역 상태 관리 방법에서 전역 상태 관리로 전환 후{" "}
            <a
              className="text-brand underline"
              href="https://rhei.me/blog/cse/search-filter-with-url"
            >
              사용성 및 유지보수성 향상
            </a>
          </>,
        ],
      },
      {
        title: "검색 엔진 최적화",
        list: [
          <>
            SSR 적용 및 페이지 성능 최적화 후{" "}
            <strong className="font-bold">일 평균 노출수 870% 성장</strong>
          </>,
        ],
      },
      {
        title: "개발 환경 구축",
        list: [
          <>
            단계적인 배포 및 QA를 위한{" "}
            <a
              className="text-brand underline"
              href="https://rhei.me/blog/cse/cspg-design-system-text"
            >
              Git branch 전략 및 배포 파이프라인 구축
            </a>
          </>,
          <>
            <a
              className="text-brand underline"
              href="https://rhei.me/blog/cse/2-branching-strategy"
            >
              디자인 시스템 구현
            </a>{" "}
            및 Storybook 세팅
          </>,
        ],
      },
    ],
  },
  {
    title: "블로그",
    period: "",
    location: "2023.08 - 2025.03",
    position: "개인 프로젝트 / FE 개발자",
    description: "Remix 프레임워크를 이용한 블로그",
    stack: ["TypeScript", "Remix", "tailwind", "Supabase"],
    link: [{ title: "rhei.me/blog →", href: "https://rhei.me/blog" }],
    content: [
      {
        title: "성능 및 검색 엔진 최적화",
        list: [
          <>
            <a
              href="https://rhei.me/blog/cse/making-blog-with-remix-6-optimization-1"
              className="text-brand underline"
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
];

export default function Project() {
  return (
    <section>
      <StickyHeading>
        <h2 className="text-h2 bg-normal border-sub mb-2 border-b">프로젝트</h2>
      </StickyHeading>

      <ol className="flex flex-col gap-8">
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
                    <a href={link.href}>{link.title}</a>
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

              <ul className="mt-4">
                {project.content?.map((desc) => (
                  <li key={desc.title} className="ms-6 list-disc">
                    <p className="font-extrabold">{desc.title}</p>
                    <ul>
                      {desc.list.map((item, index) => (
                        <li key={index} className="ms-6 list-[circle]">
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
