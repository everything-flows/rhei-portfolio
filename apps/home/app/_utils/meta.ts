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
        "@type": "Organization",
        name: META.siteName,
        url: META.url.site,
        logo: META.home.thumbnail,
        description: description,
        sameAs: [META.url.github],
      },
    },
  ];
}
