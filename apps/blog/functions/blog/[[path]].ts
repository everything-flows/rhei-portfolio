export const onRequest: PagesFunction = async ({ request }) => {
  const url = new URL(request.url);
  let targetUrl = "";
  const { pathname, search } = url;

  if (url.pathname.endsWith(".data") && !url.pathname.endsWith("/.data")) {
    const basePath = pathname.slice(0, -5); // ".data" 잘라내기
    targetUrl = `https://rhei-blog.pages.dev${basePath}/.data${search}`;
  } else {
    targetUrl = `https://rhei-blog.pages.dev${pathname}${search}`;
  }

  return fetch(targetUrl, {
    method: request.method,
    headers: request.headers,
    body:
      request.method !== "GET" && request.method !== "HEAD"
        ? request.body
        : null,
  });
};
