import { META } from "@rhei/meta";

export default function meta() {
  const title = `${META.resume.title} | ${META.siteName}`;
  const description = META.resume.description;
  const url = `${META.url.site}/resume`;

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
      content: url,
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
      href: url,
    },
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "Person",
        name: META.author,
        url: url,
        image: META.home.thumbnail,
        description: description,
        sameAs: [META.url.github],
        jobTitle: "프론트엔드 개발자",
        worksFor: {
          "@type": "Organization",
          name: META.siteName,
          url: META.url.site,
        },
      },
    },
  ];
}
