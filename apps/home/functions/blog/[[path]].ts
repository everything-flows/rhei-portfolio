export const onRequest: PagesFunction = async ({ request }) => {
  const url = new URL(request.url);

  const isBlogRequest =
    url.pathname === "/blog" || url.pathname.startsWith("/blog/");
  const isRootDataRequest = url.pathname === "/blog.data";
  const isNestedDataRequest = url.pathname.endsWith(".data");

  if (!isBlogRequest && !isRootDataRequest && !isNestedDataRequest) {
    return new Response("Not found", { status: 404 });
  }

  if (isRootDataRequest) {
    return fetch("https://rhei-blog.pages.dev/blog/.data", {
      method: request.method,
      headers: request.headers,
      body:
        request.method !== "GET" && request.method !== "HEAD"
          ? request.body
          : null,
    });
  }

  if (isNestedDataRequest) {
    const pathname = url.pathname.replace(/\.data$/, "/.data");
    return fetch(`https://rhei-blog.pages.dev${pathname}${url.search}`, {
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
