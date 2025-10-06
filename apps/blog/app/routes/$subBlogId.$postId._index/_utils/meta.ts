import {
  SITE_NAME,
  AUTHOR,
  SITE_DESCRIPTION,
  BLOG_THUMBNAIL,
  SITE_URL,
} from "@rhei/meta";

export default function meta({ data }) {
  const query = data.dehydratedState.queries;
  const postData = query.find((query) => query.queryKey.includes("postDetail"))
    ?.state.data;

  const { postInfo } = postData;

  const title = `${postInfo.title} | ${SITE_NAME}`;
  const description = `${postInfo.subTitle} | ${SITE_DESCRIPTION}`;
  const thumbnail = postInfo.thumbnail || BLOG_THUMBNAIL;
  const url = `${SITE_URL}/blog/${postInfo.subBlog}/${postInfo.id}`;

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
      content: thumbnail,
    },
    {
      property: "og:type",
      content: "article",
    },
    {
      property: "og:site_name",
      content: title,
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
          name: AUTHOR,
          url: SITE_URL,
        },
        publisher: {
          "@type": "Organization",
          name: SITE_NAME,
          url: SITE_URL,
          logo: {
            "@type": "ImageObject",
            url: BLOG_THUMBNAIL,
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
