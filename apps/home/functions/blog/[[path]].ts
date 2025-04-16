export const onRequest: PagesFunction = async ({ request }) => {
  const url = new URL(request.url);

  const isBlogRequest =
    url.pathname === "/blog" || url.pathname.startsWith("/blog/");

  // const isDataRequest = url.pathname.startsWith("/blog.data");

  if (!isBlogRequest) {
    return new Response("Not found", { status: 404 });
  }

  const targetUrl = `https://rhei-blog.pages.dev${url.pathname}${url.search}`;
  return fetch(targetUrl, {
    method: request.method,
    headers: request.headers,
    body:
      request.method !== "GET" && request.method !== "HEAD"
        ? request.body
        : null,
  });
};
