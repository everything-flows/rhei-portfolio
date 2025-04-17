export const onRequest: PagesFunction = async ({ request }) => {
  const url = new URL(request.url);
  const { pathname, search } = url;

  const match = pathname.match(/^(.+)\.data$/);

  if (match && !pathname.endsWith("/.data")) {
    const targetPath = `${match[1]}/.data`;
    const rewrittenUrl = new URL(
      targetPath + search,
      "https://rhei-blog.pages.dev",
    );

    console.log("Rewriting:", pathname, "→", rewrittenUrl.pathname);

    return fetch(rewrittenUrl.toString(), {
      method: request.method,
      headers: request.headers,
      body:
        request.method !== "GET" && request.method !== "HEAD"
          ? request.body
          : undefined,
    });
  }

  const passthroughUrl = new URL(
    pathname + search,
    "https://rhei-blog.pages.dev",
  );

  return fetch(passthroughUrl.toString(), request);
};
