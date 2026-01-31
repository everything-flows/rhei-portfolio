import {
  SITE_TITLE,
  SITE_NAME,
  AUTHOR,
  SITE_DESCRIPTION,
  BLOG_THUMBNAIL,
  SITE_URL,
  GITHUB_URL,
} from "@rhei/meta";

import convertUrl from "~/utils/convertUrl";

const blogUrl = `${SITE_URL}/blog`;

export default function meta({ data }) {
  const queries = data?.dehydratedState?.queries ?? [];
  const pinnedPostList = queries.find((query) =>
    query.queryKey.includes("pinnedPostList"),
  )?.state?.data;
  const lcpImageUrl =
    pinnedPostList?.[0]?.thumbnail != null
      ? convertUrl(pinnedPostList[0].thumbnail)
      : null;

  const title = `${SITE_TITLE} | ${SITE_NAME}`;

  return [
    ...(lcpImageUrl
      ? [{ rel: "preload", as: "image", href: lcpImageUrl }]
      : []),
    { title },
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
      content: BLOG_THUMBNAIL,
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
      content: blogUrl,
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
      content: BLOG_THUMBNAIL,
    },
    {
      tagName: "link",
      rel: "canonical",
      href: blogUrl,
    },
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: SITE_NAME,
        url: blogUrl,
        logo: {
          "@type": "ImageObject",
          url: BLOG_THUMBNAIL,
        },
        description: SITE_DESCRIPTION,
        inLanguage: "ko",
        publisher: {
          "@type": "Organization",
          name: AUTHOR,
          url: SITE_URL,
          logo: {
            "@type": "ImageObject",
            url: BLOG_THUMBNAIL,
          },
          sameAs: [GITHUB_URL],
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": blogUrl,
        },
      },
    },
  ];
}
