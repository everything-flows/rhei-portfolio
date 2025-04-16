export const onRequest: PagesFunction = async ({ request }) => {
  const url = new URL(request.url);

  const isBlogRequest =
    url.pathname === "/blog" || url.pathname.startsWith("/blog/");

  const isDataRequest = url.pathname.endsWith(".data");

  if (!isBlogRequest) {
    return new Response("Not found", { status: 404 });
  }

  if (isDataRequest) {
    const pathname = url.pathname.split(".data")[0];
    return fetch(`https://rhei-blog.pages.dev${pathname}/.data`, {
      method: request.method,
      headers: request.headers,
      body:
        request.method !== "GET" && request.method !== "HEAD"
          ? request.body
          : null,
    });
  }

  return fetch(`https://rhei-blog.pages.dev${url.pathname}${url.search}`, {
    method: request.method,
    headers: request.headers,
    body:
      request.method !== "GET" && request.method !== "HEAD"
        ? request.body
        : null,
  });
};
