import {
  SITE_NAME,
  AUTHOR,
  SITE_DESCRIPTION,
  BLOG_THUMBNAIL,
  SITE_URL,
} from "@rhei/meta";

import { Document } from "~/types/post";

export default function meta({
  data,
}: {
  data: { postData: { postData: Document } };
}) {
  const { postData } = data;
  const { postData: postInfo } = postData;

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
      content: "website",
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
      rel: "canonical",
      href: url,
    },
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: postInfo.title,
        description: description,
        image: [thumbnail],
        datePublished: postInfo.createdAt,
        dateModified: postInfo.lastEditedAt || postInfo.createdAt,
        author: {
          "@type": "Person",
          name: AUTHOR,
        },
        publisher: {
          "@type": "Organization",
          name: SITE_NAME,
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
