export const onRequest: PagesFunction = async ({ request }) => {
  const url = new URL(request.url);

  if (url.pathname === "/resume") {
    url.pathname = "/resume/";
    return Response.redirect(url.toString(), 301);
  }

  const isResumeRoute = url.pathname.startsWith("/resume/");
  if (!isResumeRoute) return new Response("Not found", { status: 404 });

  const targetUrl = `https://rhei-resume.pages.dev${url.pathname}${url.search}`;

  return fetch(targetUrl, {
    method: request.method,
    headers: request.headers,
    body:
      request.method !== "GET" && request.method !== "HEAD"
        ? request.body
        : undefined,
  });
};
