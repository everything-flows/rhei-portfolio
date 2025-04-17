export const onRequest: PagesFunction = async ({ request }) => {
  const url = new URL(request.url);

  const pathWithoutBlog = url.pathname.replace(/^\/blog/, "") || "/";
  const targetUrl = `https://rhei-blog.pages.dev${pathWithoutBlog}${url.search}`;

  const safeHeaders = new Headers();
  safeHeaders.set("Accept", request.headers.get("Accept") || "*/*");

  return fetch(targetUrl, {
    method: request.method,
    headers: safeHeaders,
    body:
      request.method !== "GET" && request.method !== "HEAD"
        ? request.body
        : null,
  });
};
