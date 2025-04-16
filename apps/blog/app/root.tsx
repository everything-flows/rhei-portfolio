import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from "@remix-run/react";

function Logger() {
  const location = useLocation();
  console.log("💬 Current location:", location.pathname);
  return null;
}

import "./tailwind.css";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-normal text-normal">
        <div className="fixed inset-0 z-[-1] opacity-[0.2] blur-[min(100px,10dvw)]">
          <div className="absolute -right-8 -top-4 h-[50dvh] w-[80dvw] rounded-[100%] bg-orange-200 dark:bg-blue-600">
            <div className="bg-normal h-[30dvh] w-[50dvw] rounded-[100%]" />
          </div>
          <div className="absolute top-[30dvh] h-[80dvh] w-[70dvw] rounded-[100%] bg-orange-100 dark:bg-blue-700">
            <div className="bg-normal absolute bottom-0 right-0 h-[50dvh] w-[50dvw] rounded-[100%]" />
          </div>
        </div>
        <Logger />
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
