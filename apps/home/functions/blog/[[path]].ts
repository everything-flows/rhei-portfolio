export const onRequest: PagesFunction = async ({ request }) => {
  const url = new URL(request.url);

  const isBlogRequest = url.pathname.startsWith("/blog");

  if (!isBlogRequest) {
    return new Response("Not found", { status: 404 });
  }

  if (url.pathname === "/blog.data") {
    return fetch("https://rhei-blog.pages.dev/blog/.data", {
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
