import { useLoaderData } from "@remix-run/react";
import type { MetaFunction } from "@remix-run/cloudflare";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GNB } from "@rhei/ui";

import Blog from "./_components/Blog";
import Footer from "~/_components/Footer";
import Header from "./_components/Header";
import Banner from "./_components/Banner";
import Tools from "./_components/Tools";
import Toc from "./_components/Toc";
import About from "./_components/About";

export { default as loader } from "./_utils/loader";
export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

const queryClient = new QueryClient();

export default function Index() {
  const data = useLoaderData();
  console.log(data);

  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <header className="content-x">
          <GNB />
        </header>
        <main className="content-x">
          <Header />

          {/* <Banner /> */}

          <Toc />

          <About />

          <Tools />

          {/* <section>
            <ul className="flex">
              <li className="flex flex-col items-center gap-2">
                <div className="size-8 bg-black" />
                <p>GitHub</p>
              </li>
              <li className="flex flex-col items-center gap-2">
                <div className="size-8 bg-black" />
                <p>Resume</p>
              </li>
            </ul>
          </section> */}
          <Blog />
        </main>
        <Footer />
      </div>
    </QueryClientProvider>
  );
}
