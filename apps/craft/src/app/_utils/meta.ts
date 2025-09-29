import type { Metadata } from "next";
import {
  SITE_NAME,
  AUTHOR,
  SITE_DESCRIPTION,
  SITE_THUMBNAIL,
  SITE_URL,
  GITHUB_URL,
} from "@rhei/meta";

const title = `실험실 | ${SITE_NAME}`;
const description = `소소하게 좋아하는 것들을 만듭니다. | ${SITE_DESCRIPTION}`;
const url = `${SITE_URL}/craft`;

export const metadata: Metadata = {
  title: {
    default: title,
    template: `%s | ${SITE_NAME}`,
  },
  description,
  authors: [{ name: AUTHOR }],
  openGraph: {
    title,
    description,
    type: "website",
    url: url,
    siteName: SITE_NAME,
    images: [
      {
        url: SITE_THUMBNAIL,
        alt: `${title} 썸네일`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [SITE_THUMBNAIL],
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
        name: AUTHOR,
        url: SITE_URL,
        sameAs: [GITHUB_URL],
      },
      image: SITE_THUMBNAIL,
    }),
  },
};
