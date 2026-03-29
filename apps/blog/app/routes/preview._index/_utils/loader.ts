import { json, type LoaderFunctionArgs } from "@remix-run/cloudflare";
import type { Document } from "~/types/post";
import { DocumentType } from "~/types/post";
import parse from "../../$subBlogId.$postId._index/parse";

export type FileEntry = { name: string; title: string };

export default async function loader({ request }: LoaderFunctionArgs) {
  // 로컬 개발 환경에서만 파일 시스템 접근 가능
  let readFile: typeof import("node:fs/promises").readFile;
  let readdir: typeof import("node:fs/promises").readdir;
  let join: typeof import("node:path").join;
  let dirname: typeof import("node:path").dirname;
  let PREVIEW_DIR: string | null = null;

  try {
    const fs = await import("node:fs/promises");
    const path = await import("node:path");
    const { fileURLToPath } = await import("node:url");
    readFile = fs.readFile;
    readdir = fs.readdir;
    join = path.join;
    dirname = path.dirname;

    // 현재 파일의 위치를 기준으로 apps/blog/preview 경로 계산
    // loader.ts -> _utils -> preview._index -> routes -> app -> blog
    const currentFile = fileURLToPath(import.meta.url);
    const blogDir = dirname(dirname(dirname(dirname(dirname(currentFile)))));
    PREVIEW_DIR = join(blogDir, "preview");
  } catch {
    // Cloudflare Workers 환경에서는 사용 불가
    return json(
      {
        error:
          "Preview 기능은 로컬 개발 환경에서만 사용할 수 있습니다. (Node.js 환경 필요)",
      },
      { status: 503 },
    );
  }

  // preview 디렉토리의 .md 파일 목록 조회
  let files: FileEntry[] = [];
  try {
    const entries = await readdir(PREVIEW_DIR);
    const mdFiles = entries.filter(
      (f) => f.endsWith(".md") && f !== "README.md",
    );
    files = await Promise.all(
      mdFiles.map(async (name) => {
        try {
          const content = await readFile(join(PREVIEW_DIR!, name), "utf-8");
          return { name, title: extractTitle(content) || name };
        } catch {
          return { name, title: name };
        }
      }),
    );
  } catch {
    // 디렉토리 읽기 실패 시 빈 목록
  }

  const url = new URL(request.url);
  const filePath = url.searchParams.get("file");

  // 파일이 선택되지 않은 경우 파일 목록만 반환
  if (!filePath) {
    return json({ files });
  }

  // 보안을 위해 파일 경로 검증
  if (filePath.includes("..") || filePath.startsWith("/")) {
    return json({ error: "Invalid file path" }, { status: 400 });
  }

  // 확장자 없으면 .md 붙이기
  const resolvedFilePath =
    filePath.endsWith(".md") || filePath.endsWith(".json")
      ? filePath
      : filePath + ".md";

  try {
    const fullPath = join(PREVIEW_DIR, resolvedFilePath);
    const fileContent = await readFile(fullPath, "utf-8");

    // 파일 확장자에 따라 처리
    if (resolvedFilePath.endsWith(".json")) {
      const document = JSON.parse(fileContent) as Document;

      // content가 있으면 파싱
      if (document.content) {
        const parsedContent = await parse(document.content);
        return json({ files, postInfo: document, postContent: parsedContent });
      }

      return json({ files, postInfo: document });
    }

    if (resolvedFilePath.endsWith(".md")) {
      // .md 파일을 Document 형식으로 변환
      const document: Document = {
        id: "preview",
        title: extractTitle(fileContent) || "Preview",
        subTitle: undefined,
        parentId: "",
        type: DocumentType.Post,
        subBlog: "cse",
        tags: [],
        content: fileContent,
      };

      const parsedContent = await parse(stripFrontmatter(fileContent));

      return json(
        { files, postInfo: document, postContent: parsedContent },
        {
          // 개발 환경에서 캐시를 비활성화하여 파일 변경 시 즉시 반영
          headers: import.meta.env.DEV
            ? {
                "Cache-Control": "no-cache, no-store, must-revalidate",
                Pragma: "no-cache",
                Expires: "0",
              }
            : undefined,
        },
      );
    }

    return json({ error: "Unsupported file type" }, { status: 400 });
  } catch (error) {
    if (error instanceof Error) {
      return json({ error: error.message }, { status: 500 });
    }
    return json({ error: "Failed to read file" }, { status: 500 });
  }
}

function stripFrontmatter(content: string): string {
  return content.replace(/^---[\s\S]*?---\n?/, "");
}

function extractTitle(content: string): string | null {
  // frontmatter의 title 필드 우선
  const frontmatterMatch = content.match(/^---[\s\S]*?^title:\s*(.+)$/m);
  if (frontmatterMatch) {
    return frontmatterMatch[1].trim();
  }

  // fallback: 첫 번째 h1
  const h1Match = content.match(/^#\s+(.+)$/m);
  if (h1Match) {
    return h1Match[1].trim();
  }

  return null;
}
