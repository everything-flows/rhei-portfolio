// apps/home/functions/resume.ts
export const onRequest = async ({ request }: { request: Request }) => {
  const url = new URL(request.url);

  // HTML (entrypoint) 프록시: /resume 또는 /resume/1 같은
  if (!url.pathname.startsWith("/resume/assets/")) {
    const proxyURL = `https://rhei-resume.pages.dev${url.pathname.replace(/^\/resume/, "")}${url.search}`;
    return fetch(proxyURL, {
      method: request.method,
      headers: request.headers,
      body: request.body,
    });
  }

  // assets 프록시
  const assetURL = `https://rhei-resume.pages.dev${url.pathname}${url.search}`;
  return fetch(assetURL, {
    method: request.method,
    headers: request.headers,
    body: request.body,
  });
};
