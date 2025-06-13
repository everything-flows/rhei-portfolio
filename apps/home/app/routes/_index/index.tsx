import { useLoaderData } from "@remix-run/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GNB, Footer } from "@rhei/ui";

import Blog from "./_components/Blog";
import Header from "./_components/Header";
import Banner from "./_components/Banner";
import Tools from "./_components/Tools";
// import Toc from "./_components/Toc";
import About from "./_components/About";
import Notification from "./_components/Notification";

export { default as loader } from "./_utils/loader";

const queryClient = new QueryClient();

export default function Index() {
  const { user } = useLoaderData();

  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <header className="content-x">
          <GNB isLoggedIn={!!user} />
        </header>
        <main className="content-x">
          <Header />
          <Banner />
          <Notification />
          {/* <Toc /> */}
          <About />
          <Tools />
          <Blog />
        </main>

        <Footer />
      </div>
    </QueryClientProvider>
  );
}
