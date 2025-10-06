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
import "../../../packages/ui/styles/utilities.css"; // FIXME

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
        <BackgroundGradient />
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

function BackgroundGradient() {
  return (
    <div className="fixed inset-0 z-[-1] opacity-[0.3] blur-[min(30px,10dvw)]">
      <div className="absolute right-[-8dvw] top-[-21dvh] h-[50dvh] w-[120dvw] skew-x-[50deg] rounded-[100%] bg-blue-500 dark:bg-orange-500" />
      <div className="absolute right-[-8dvw] top-[-21dvh] h-[48dvh] w-[118dvw] skew-x-[50deg] rounded-[100%] bg-orange-300 dark:bg-blue-300" />
      <div className="absolute right-[-8dvw] top-[-21dvh] h-[46dvh] w-[116dvw] skew-x-[50deg] rounded-[100%] bg-orange-100 dark:bg-blue-700" />
      <div className="absolute right-[-8dvw] top-[-21dvh] h-[38dvh] w-[108dvw] skew-x-[50deg] rounded-[100%] bg-blue-400 dark:bg-orange-500" />
      <div className="bg-normal absolute right-[-10dvw] top-[-22dvh] h-[38dvh] w-[108dvw] skew-x-[50deg] rounded-[100%]" />
    </div>
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
