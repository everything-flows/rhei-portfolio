export const onRequest: PagesFunction = async ({ request }) => {
  const url = new URL(request.url);

  const isBlogRequest = url.pathname.startsWith("/blog");
  const isDataRequest = url.pathname.endsWith(".data");

  if (!isBlogRequest) {
    return new Response("Not found", { status: 404 });
  }

  if (isDataRequest) {
    const actualPath = url.pathname.replace(/\.data$/, "/.data");
    return fetch(`https://rhei-blog.pages.dev${actualPath}${url.search}`, {
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
