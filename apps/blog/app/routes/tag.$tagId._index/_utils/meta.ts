import { META } from "@rhei/meta";

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

  const title = `${tagData.id} 관련 포스트 | ${META.siteName}`;
  const description = `${tagData.id} 관련 포스트 모음입니다. | ${META.blog.description}`;
  const thumbnail = META.blog.thumbnail;
  const url = `${META.url.site}/blog/tag/${tagData.id}`;

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
        "@type": "ItemList",
        name: `Posts of ${tagData.id} tag`,
        itemListOrder: "http://schema.org/ItemListOrderDescending",
        numberOfItems: postList.length,
        itemListElement: postList.map((post: Document, index: number) => ({
          "@type": "ListItem",
          position: index + 1,
          url: `${META.url.site}/blog/${post.subBlog}/${post.id}`,
          name: post.title,
        })),
      },
    },
  ];
}
