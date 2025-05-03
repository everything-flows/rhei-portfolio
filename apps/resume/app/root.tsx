import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteLoaderData,
} from "@remix-run/react";

import "./tailwind.css";
import "@rhei/ui/styles/utilities.css";

import Font from "./_components/Font";

export { default as loader } from "./_utils/loader";
export { default as meta } from "./_utils/meta";

export function Layout({ children }: { children: React.ReactNode }) {
  const { themeVar } = useRouteLoaderData("root");

  return (
    <html lang="ko" className={themeVar || "light"}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Font />
        <Links />
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
  return <Outlet />;
}
