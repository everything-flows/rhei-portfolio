// apps/home/functions/resume.ts

export const onRequest = async ({ request }: { request: Request }) => {
  const url = new URL(request.url);
  const strippedPath = url.pathname.replace(/^\/resume/, "") || "/";
  // [todo] fix this route
  const target = `https://rhei-resume.pages.dev${strippedPath}${url.search}`;

  return fetch(target, {
    method: request.method,
    headers: request.headers,
    body: request.body,
  });
};
