import { META } from "@rhei/meta";

export function meta() {
  const title = `${META.home.title} | ${META.siteName}`;
  const description = META.home.description;

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
      content: META.author,
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
      content: META.home.thumbnail,
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      property: "og:locale",
      content: "ko_KR",
    },
    {
      property: "og:site_name",
      content: META.siteName,
    },
    {
      property: "og:url",
      content: META.url.site,
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
      content: META.home.thumbnail,
    },
    {
      tagName: "link",
      rel: "canonical",
      href: META.url.site,
    },
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "Person",
        name: "강다혜",
        alternateName: "Dahye Kang",
        jobTitle: "프론트엔드 개발자",
        url: META.url.site,
        image: META.home.thumbnail,
        description: description,
        sameAs: [META.url.github],
      },
    },
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: META.siteName,
        url: META.url.site,
        hasPart: [
          {
            "@type": "WebPage",
            name: "Resume",
            description: META.resume.description,
            url: `${META.url.site}/resume`,
          },
          {
            "@type": "WebPage",
            name: "Blog",
            description: META.blog.description,
            url: `${META.url.site}/blog`,
          },
          {
            "@type": "WebPage",
            name: "Craft",
            description: META.craft.description,
            url: `${META.url.site}/craft`,
          },
        ],
      },
    },
  ];
}
