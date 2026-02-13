import { META } from "@rhei/meta";

import convertUrl from "~/utils/convertUrl";

const blogUrl = `${META.url.site}/blog`;

export default function meta({ data }) {
  const queries = data?.dehydratedState?.queries ?? [];
  const pinnedPostList = queries.find((query) =>
    query.queryKey.includes("pinnedPostList"),
  )?.state?.data;
  const lcpImageUrl =
    pinnedPostList?.[0]?.thumbnail != null
      ? convertUrl(pinnedPostList[0].thumbnail)
      : null;

  const title = `${META.blog.title} | ${META.siteName}`;
  const description = META.blog.description;

  return [
    ...(lcpImageUrl
      ? [{ rel: "preload", as: "image", href: lcpImageUrl }]
      : []),
    { title },
    {
      name: "description",
      content: description,
    },
    {
      name: "author",
      content: META.author,
    },
    {
      property: "og:title",
      content: title,
    },
    {
      property: "og:description",
      content: META.blog.description,
    },
    {
      property: "og:image",
      content: META.blog.thumbnail,
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      property: "og:site_name",
      content: META.siteName,
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
      content: META.blog.description,
    },
    {
      name: "twitter:image",
      content: META.blog.thumbnail,
    },
    {
      tagName: "link",
      rel: "canonical",
      href: blogUrl,
    },
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "Blog",
        name: title,
        url: blogUrl,
        image: {
          "@type": "ImageObject",
          url: META.blog.thumbnail,
        },
        description: META.blog.description,
        inLanguage: "ko",
        author: {
          "@type": "Person",
          name: META.author,
          url: META.url.site,
          image: {
            "@type": "ImageObject",
            url: META.blog.thumbnail,
          },
          sameAs: [META.url.github],
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": blogUrl,
        },
      },
    },
  ];
}
