export const onRequest: PagesFunction = async ({ request }) => {
  const url = new URL(request.url);

  const isBlogRequest =
    url.pathname === "/blog" ||
    url.pathname.startsWith("/blog/") ||
    url.pathname === "/blog.data" ||
    url.pathname === "/blog/blog.data" ||
    (url.pathname.startsWith("/blog/") && url.pathname.endsWith(".data"));

  if (!isBlogRequest) {
    return new Response("Not found", { status: 404 });
  }

  const proxyPath =
    url.pathname === "/blog.data" ? "/blog/blog.data" : url.pathname;

  const targetUrl = `https://rhei-blog.pages.dev${proxyPath}${url.search}`;
  return fetch(targetUrl, {
    method: request.method,
    headers: request.headers,
    body:
      request.method !== "GET" && request.method !== "HEAD"
        ? request.body
        : null,
  });
};
