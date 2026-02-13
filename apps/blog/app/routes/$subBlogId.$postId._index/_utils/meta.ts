import { META } from "@rhei/meta";

export default function meta({ data }) {
  const query = data.dehydratedState.queries;
  const postData = query.find((query) => query.queryKey.includes("postDetail"))
    ?.state.data;

  const { postInfo } = postData;

  const title = `${postInfo.title} | ${META.siteName}`;
  const description = `${postInfo.subTitle} | ${META.blog.description}`;
  const thumbnail = postInfo.thumbnail || META.blog.thumbnail;
  const url = `${META.url.site}/blog/${postInfo.subBlog}/${postInfo.id}`;

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
      content: thumbnail,
    },
    {
      property: "og:type",
      content: "article",
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
      property: "article:published_time",
      content:
        typeof postData.createdAt === "string"
          ? postData.createdAt
          : new Date(postData.createdAt).toISOString(),
    },
    {
      property: "article:modified_time",
      content:
        typeof postInfo.lastEditedAt === "string"
          ? postInfo.lastEditedAt
          : new Date(
              postInfo.lastEditedAt || postInfo.createdAt,
            ).toISOString(),
    },
    {
      property: "article:author",
      content: META.author,
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
      content: thumbnail,
    },
    {
      tagName: "link",
      rel: "canonical",
      href: url,
    },
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: postInfo.title,
        description,
        image: [thumbnail],
        inLanguage: "ko",
        datePublished: postData.createdAt,
        dateModified: postInfo.lastEditedAt || postInfo.createdAt,
        author: {
          "@type": "Person",
          name: META.author,
          url: META.url.site,
        },
        publisher: {
          "@type": "Person",
          name: META.author,
          url: META.url.site,
          image: {
            "@type": "ImageObject",
            url: META.blog.thumbnail,
          },
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": url,
        },
      },
    },
  ];
}
