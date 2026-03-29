import type { LoaderFunctionArgs } from "@remix-run/cloudflare";

export async function loader({ request }: LoaderFunctionArgs) {
  // SSE를 위한 헤더 설정
  const headers = new Headers({
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });

  // ReadableStream을 사용해서 SSE 구현
  const stream = new ReadableStream({
    async start(controller) {
      let watch: any = null;
      let join: typeof import("node:path").join;
      let dirname: typeof import("node:path").dirname;
      let PREVIEW_DIR: string | null = null;

      try {
        const fs = await import("node:fs");
        const path = await import("node:path");
        const { fileURLToPath } = await import("node:url");
        join = path.join;
        dirname = path.dirname;

        // 현재 파일의 위치를 기준으로 apps/blog/preview 경로 계산
        const currentFile = fileURLToPath(import.meta.url);
        const blogDir = dirname(dirname(dirname(currentFile)));
        PREVIEW_DIR = join(blogDir, "preview");

        // URL에서 감시할 파일 이름 가져오기
        const url = new URL(request.url);
        const fileName = url.searchParams.get("file") || "post.md";
        const fullPath = join(PREVIEW_DIR, fileName);

        // 파일 변경 감지
        watch = fs.watch(fullPath, (eventType) => {
          if (eventType === "change") {
            // 클라이언트에 변경 알림
            const data = JSON.stringify({ type: "change", file: fileName });
            controller.enqueue(new TextEncoder().encode(`data: ${data}\n\n`));
          }
        });

        // 연결 확인을 위한 heartbeat (30초마다)
        const heartbeatInterval = setInterval(() => {
          try {
            controller.enqueue(new TextEncoder().encode(": heartbeat\n\n"));
          } catch {
            clearInterval(heartbeatInterval);
          }
        }, 30000);

        // 클라이언트 연결 종료 감지
        request.signal.addEventListener("abort", () => {
          if (watch) {
            watch.close();
          }
          clearInterval(heartbeatInterval);
          controller.close();
        });
      } catch (error) {
        console.error("File watch error:", error);
        controller.close();
      }
    },
  });

  return new Response(stream, { headers });
}
