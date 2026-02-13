import type { Metadata } from "next";
import { META } from "@rhei/meta";

const title = `${META.craft.title} | ${META.siteName}`;
const description = META.craft.description;
const url = `${META.url.site}/craft`;

export const metadata: Metadata = {
  title: {
    default: title,
    template: `%s | ${META.siteName}`,
  },
  description,
  authors: [{ name: META.author }],
  openGraph: {
    title,
    description,
    type: "website",
    url: url,
    siteName: META.siteName,
    images: [
      {
        url: META.home.thumbnail,
        alt: `${title} 썸네일`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [META.home.thumbnail],
  },
  icons: {
    icon: "/favicon.ico",
  },
  metadataBase: new URL(url),
  alternates: {
    canonical: url,
  },
  other: {
    "script:ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      name: title,
      url,
      description,
      creator: {
        "@type": "Person",
        name: META.author,
        url: META.url.site,
        sameAs: [META.url.github],
      },
      image: META.home.thumbnail,
    }),
  },
};
