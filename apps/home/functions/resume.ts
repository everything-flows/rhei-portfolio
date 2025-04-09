export const onRequest = async ({ request }: { request: Request }) => {
  const url = new URL(request.url);

  const isAsset =
    url.pathname.startsWith("/resume/assets") ||
    url.pathname.startsWith("/resume/build");

  if (isAsset) {
    return Response.redirect(
      `https://rhei-resume.pages.dev${url.pathname.replace("/resume", "")}${url.search}`,
      302,
    );
  }

  // 프록시 HTML
  const proxyUrl = `https://rhei-resume.pages.dev${url.pathname.replace(/^\/resume/, "")}${url.search}`;
  return fetch(proxyUrl, {
    method: request.method,
    headers: request.headers,
    body: request.body,
  });
};
