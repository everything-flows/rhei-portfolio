export const onRequest: PagesFunction = async ({ request }) => {
  const url = new URL(request.url);
  let targetUrl = "";

  if (url.pathname.endsWith(".data") && !url.pathname.endsWith("/.data")) {
    const pathname = url.pathname.split(".data");
    targetUrl = `https://rhei-blog.pages.dev${pathname}/.data`;
  } else {
    targetUrl = `https://rhei-blog.pages.dev${url.pathname}${url.search}`;
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
