import { useLoaderData } from "@remix-run/react";
import { Footer, GNB } from "@rhei/ui";

import PostDirectory from "~/components/PostDirectory";
import TagHeader from "./_components/TagHeader";

export { default as loader } from "./_utils/loader";
export { default as meta } from "./_utils/meta";

export default function PostPage() {
  const { tagData, postList } = useLoaderData();

  if (!tagData) {
    return null;
  }

  return (
    <>
      <header className="content-x">
        <GNB />
      </header>

      <main className="content-x">
        <TagHeader data={tagData} />

        <PostDirectory postList={postList} />
      </main>

      <Footer />
    </>
  );
}
