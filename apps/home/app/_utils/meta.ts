import {
  SITE_TITLE,
  SITE_NAME,
  AUTHOR,
  SITE_DESCRIPTION,
  SITE_THUMBNAIL,
  SITE_URL,
  GITHUB_URL,
} from "@rhei/meta";

export function meta() {
  const title = `${SITE_TITLE} | ${SITE_NAME}`;

  return [
    {
      title,
    },
    {
      name: "description",
      content: SITE_DESCRIPTION,
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
      content: SITE_DESCRIPTION,
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
      content: SITE_DESCRIPTION,
    },
    {
      name: "twitter:image",
      content: SITE_THUMBNAIL,
    },
    {
      rel: "canonical",
      href: SITE_URL,
    },
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: SITE_NAME,
        url: SITE_URL,
        logo: SITE_THUMBNAIL,
        description: SITE_DESCRIPTION,
        sameAs: [GITHUB_URL],
      },
    },
  ];
}
