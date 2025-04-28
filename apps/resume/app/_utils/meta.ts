import {
  SITE_NAME,
  AUTHOR,
  SITE_DESCRIPTION,
  SITE_THUMBNAIL,
  SITE_URL,
  GITHUB_URL,
} from "@rhei/meta";

export default function meta() {
  const title = `강다혜 이력서 | ${SITE_NAME}`;
  const description = `프론트엔드 개발자 강다혜 이력서 | ${SITE_DESCRIPTION}`;
  const url = `${SITE_URL}/resume`;

  return [
    {
      title,
    },
    {
      name: "description",
      content: description,
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
      content: description,
    },
    {
      property: "og:image",
      content: SITE_THUMBNAIL,
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
      content: description,
    },
    {
      name: "twitter:image",
      content: SITE_THUMBNAIL,
    },
    {
      rel: "canonical",
      href: url,
    },
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "Person",
        name: AUTHOR,
        url: url,
        image: SITE_THUMBNAIL,
        description: description,
        sameAs: [GITHUB_URL],
        jobTitle: "프론트엔드 개발자",
        worksFor: {
          "@type": "Organization",
          name: SITE_NAME,
          url: SITE_URL,
        },
      },
    },
  ];
}
