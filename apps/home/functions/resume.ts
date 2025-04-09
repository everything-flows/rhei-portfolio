// apps/home/functions/resume.ts

export const onRequest = async ({ request }: { request: Request }) => {
  const url = new URL(request.url);

  // resume 경로 전용 프록시
  if (!url.pathname.startsWith("/resume")) {
    return new Response("Not Found", { status: 404 });
  }

  const target = `https://rhei-resume.pages.dev${url.pathname.replace(/^\/resume/, "")}${url.search}`;

  return fetch(target, {
    method: request.method,
    headers: request.headers,
    body: request.body,
  });
};
