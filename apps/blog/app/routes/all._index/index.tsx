import { useLoaderData } from "@remix-run/react";
import { Footer, GNB } from "@rhei/ui";
import PostDirectory from "~/components/PostDirectory";

export { default as loader } from "./_utils/loader";

export default function AllPage() {
  const { postList } = useLoaderData();

  return (
    <>
      <header className="content-x">
        <GNB route="/blog" />
      </header>

      <main className="content-x flex flex-col">
        <PostDirectory postList={postList} />
      </main>

      <Footer />
    </>
  );
}
