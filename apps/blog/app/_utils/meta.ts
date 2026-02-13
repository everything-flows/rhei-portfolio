import { META } from "@rhei/meta";

const blogUrl = `${META.url.site}/blog`;

export function meta() {
  const title = `${META.blog.title} | ${META.siteName}`;
  const description = META.blog.description;

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
      content: description,
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
        description: description,
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
