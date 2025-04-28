const SITE_NAME = "FE Rhei";
const TITLE = "프론트엔드 개발자의 기술 블로그";
const AUTHOR = "Dahye Kang";
const DESCRIPTION =
  "개발하면서 배운 것들을 정리합니다 | 프로젝트 회고와 트러블 슈팅 | JS/TS, React, Git";
const DEFAULT_IMAGE =
  "https://tnzycdohhtvupgagmwfx.supabase.co/storage/v1/object/public/postImages//thumbnail.webp";
const URL = "https://rhei.me";

export function meta() {
  const title = `${TITLE} | ${SITE_NAME}`;
  return [
    {
      title,
    },
    {
      name: "description",
      content: DESCRIPTION,
    },
    {
      name: "author",
      content: AUTHOR,
    },
    {
      property: "og:title",
      content: title,
    },
    {
      property: "og:description",
      content: DESCRIPTION,
    },
    {
      property: "og:image",
      content: DEFAULT_IMAGE,
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      property: "og:site_name",
      content: title,
    },
    {
      property: "og:url",
      content: URL,
    },
    {
      name: "twitter:card",
      content: "summary_large_image",
    },
    {
      name: "twitter:title",
      content: title,
    },
    {
      name: "twitter:description",
      content: DESCRIPTION,
    },
    {
      name: "twitter:image",
      content: DEFAULT_IMAGE,
    },
    {
      rel: "canonical",
      href: URL,
    },
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: title,
        url: URL,
      },
    },
  ];
}
