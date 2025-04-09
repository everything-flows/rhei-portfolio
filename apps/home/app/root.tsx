import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";

import Font from "./_components/Font";
import "./tailwind.css";
import "@rhei/ui/styles/utilities.css";
import ThemeColor from "./_components/ThemeColor";

export { loader } from "./_utils/loader";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Font />
        <Links />
        <ThemeColor />
      </head>
      <body className="bg-normal text-normal">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const data = useLoaderData();
  return <Outlet context={data} />;
}
