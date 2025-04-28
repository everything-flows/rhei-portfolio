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
  data: {
    tagData: { content: string[]; id: string };
    postList: Document[];
  };
}) {
  const { tagData, postList } = data;

  const title = `${tagData.id} 관련 포스트 | ${SITE_NAME}`;
  const description = `${tagData.id} 관련 포스트 모음입니다. | ${SITE_DESCRIPTION}`;
  const thumbnail = BLOG_THUMBNAIL;
  const url = `${SITE_URL}/blog/tag/${tagData.id}`;

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
        "@type": "ItemList",
        itemListElement: postList.map((post: Document, index: number) => ({
          "@type": "ListItem",
          position: index + 1,
          url: `${SITE_URL}/blog/${post.subBlog}/${post.id}`,
          name: post.title,
        })),
      },
    },
  ];
}
