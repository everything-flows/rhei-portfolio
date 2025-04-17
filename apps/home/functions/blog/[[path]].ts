// functions/blog.ts
export const onRequest: PagesFunction = async ({ request }) => {
  const url = new URL(request.url);

  if (url.pathname === "/blog") {
    url.pathname = "/blog/";
    return Response.redirect(url.toString(), 301);
  }

  const isBlogRoute = url.pathname.startsWith("/blog/");
  if (!isBlogRoute) return new Response("Not found", { status: 404 });

  const targetUrl = `https://rhei-blog.pages.dev${url.pathname}${url.search}`;

  return fetch(targetUrl, {
    method: request.method,
    headers: request.headers,
    body:
      request.method !== "GET" && request.method !== "HEAD"
        ? request.body
        : undefined,
  });
};
