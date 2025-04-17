export const onRequest: PagesFunction = async ({ request }) => {
  const url = new URL(request.url);
  const { pathname, search } = url;

  let targetPath = pathname;

  if (pathname.endsWith(".data") && !pathname.endsWith("/.data")) {
    targetPath = pathname.slice(0, -5) + "/.data";
  }

  const targetUrl = `https://rhei-blog.pages.dev/blog${targetPath}${search}`;

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
