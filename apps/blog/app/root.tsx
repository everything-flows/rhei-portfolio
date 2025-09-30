import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useParams,
  useRouteLoaderData,
} from "@remix-run/react";
import { createBrowserClient } from "@supabase/ssr";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useEffect, useState } from "react";

import Font from "./_components/Font";
import fetchCategoryData from "./_utils/fetchCategoryData";
import "./breadcrumb.css";
import useCategoryStore from "./stores/category";
import "./tailwind.css";

export { loader } from "./_utils/loader";
export { meta } from "./_utils/meta";

export function Layout({ children }: { children: React.ReactNode }) {
  const { supabaseCredential, themeVar } = useRouteLoaderData("root");
  const params = useParams();
  const { setCategory } = useCategoryStore();

  useEffect(() => {
    if (!supabaseCredential || !setCategory) {
      return;
    }

    const subBlogId = params.subBlogId || "cse";

    async function fetchData() {
      const supabaseClient = createBrowserClient(
        supabaseCredential.url,
        supabaseCredential.key,
      );
      setCategory(await fetchCategoryData({ supabaseClient, subBlogId }));
    }

    fetchData();
  }, [params.subBlogId, supabaseCredential, setCategory]);

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
        <div className="fixed inset-0 z-[-1] opacity-[0.15] blur-[min(100px,10dvw)]">
          <div className="absolute -right-8 -top-4 h-[70dvh] w-[80dvw] rounded-[100%] bg-blue-200 dark:bg-blue-600">
            <div className="bg-normal absolute top-[30dvh] h-[40dvh] w-[50dvw] rounded-[100%]" />
          </div>
          <div className="absolute bottom-0 h-[50dvh] w-[70dvw] rounded-[100%] bg-orange-300 dark:bg-orange-600">
            <div className="bg-normal absolute bottom-0 right-0 h-[30dvh] w-[50dvw] rounded-[100%]" />
          </div>
        </div>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
