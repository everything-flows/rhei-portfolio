import "./globals.css";
import GNBWrapper from "./_components/GNBWrapper";
import GoogleAnalytics from "./_components/GoogleAnalytics";

export { metadata } from "./_utils/meta";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.8/dist/web/variable/pretendardvariable-dynamic-subset.css"
        />
        <GoogleAnalytics />
      </head>
      <body className="bg-normal text-normal">
        <GNBWrapper />
        {children}
      </body>
    </html>
  );
}

export const runtime = "edge";
