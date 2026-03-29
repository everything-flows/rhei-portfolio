import { Footer, GNB } from "@rhei/ui";

import {
  Link,
  useLoaderData,
  useRevalidator,
  useSearchParams,
} from "@remix-run/react";
import { useEffect } from "react";
import type { Document } from "~/types/post";
import PostContent from "~/components/PostContent";
import { DocumentType } from "~/types/post";
import PreviewHeader from "./_components/PreviewHeader";
import type { FileEntry } from "./_utils/loader";

export { default as loader } from "./_utils/loader";
export { default as meta } from "./_utils/meta";

type LoaderData =
  | { error: string }
  | { files: FileEntry[]; postInfo?: Document; postContent?: unknown };

function FileList({ files, selectedFile }: { files: FileEntry[]; selectedFile: string | null }) {
  if (files.length === 0) return null;

  return (
    <div className="mx-auto mb-6 max-w-6xl">
      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
        apps/blog/preview/
      </p>
      <ul className="flex flex-wrap gap-2">
        {files.map((f) => (
          <li key={f.name}>
            <Link
              to={`?file=${encodeURIComponent(f.name)}`}
              className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
                selectedFile === f.name
                  ? "bg-brand text-reverse border-transparent font-semibold"
                  : "border-sub hover:border-brand"
              }`}
            >
              {f.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function PreviewPage() {
  const data = useLoaderData<LoaderData>();
  const revalidator = useRevalidator();
  const [searchParams] = useSearchParams();
  const selectedFile = searchParams.get("file");

  // 개발 환경에서만 파일 변경 감지 (fs.watch 기반 SSE)
  useEffect(() => {
    if (!import.meta.env.DEV || !selectedFile) return;

    const eventSource = new EventSource(
      `/api/preview/watch?file=${encodeURIComponent(selectedFile)}`,
    );

    eventSource.addEventListener("message", (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === "change") {
          console.log(`File changed: ${data.file}, revalidating...`);
          revalidator.revalidate();
        }
      } catch (error) {
        console.error("Failed to parse SSE message:", error);
      }
    });

    eventSource.addEventListener("error", (error) => {
      console.error("SSE connection error:", error);
      eventSource.close();
    });

    return () => {
      eventSource.close();
    };
  }, [revalidator, selectedFile]);

  if ("error" in data) {
    return (
      <>
        <header className="content-x">
          <GNB route="/blog" />
        </header>
        <main className="content-x">
          <div className="mx-auto max-w-6xl">
            <h1 className="text-responsive-h1 mb-4">Preview Error</h1>
            <p className="text-responsive-p text-red-600 dark:text-red-400">
              {data.error}
            </p>
            <div className="mt-4">
              <p className="text-responsive-p mb-2">
                사용법: <code>/blog/preview?file=post.md</code> 또는{" "}
                <code>/blog/preview?file=post.json</code>
              </p>
              <p className="text-responsive-p text-gray-600 dark:text-gray-400">
                파일은 <code>apps/blog/preview</code> 폴더에 위치해야 합니다.
              </p>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const { files, postInfo, postContent } = data;

  return (
    <>
      <header className="content-x">
        <GNB route="/blog" />
      </header>

      <main className="content-x">
        <FileList files={files} selectedFile={selectedFile} />

        {postInfo ? (
          <>
            <PreviewHeader data={postInfo} />
            {(() => {
              switch (postInfo.type) {
                case DocumentType.Post:
                  return <PostContent content={postContent!} />;
                case DocumentType.Directory:
                  return (
                    <div className="mx-auto max-w-6xl">
                      <p className="text-responsive-p text-gray-600 dark:text-gray-400">
                        Directory 타입은 미리보기에서 지원하지 않습니다.
                      </p>
                    </div>
                  );
                default:
                  return null;
              }
            })()}
          </>
        ) : (
          <div className="mx-auto max-w-6xl py-12 text-center">
            <p className="text-responsive-p text-gray-500 dark:text-gray-400">
              위에서 파일을 선택해주세요.
            </p>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
