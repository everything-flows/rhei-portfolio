export const onRequest: PagesFunction = async ({ request }) => {
  const url = new URL(request.url);

  const isBlogAsset = url.pathname.startsWith("/blog/assets/");
  const isBlogRoute =
    url.pathname === "/blog" || url.pathname.startsWith("/blog/");

  if (isBlogAsset) {
    const assetPath = url.pathname.replace("/blog", "/");
    const assetTarget = `https://rhei-blog.pages.dev/blog${assetPath}${url.search}`;

    return fetch(assetTarget, {
      method: request.method,
      headers: request.headers,
      body: request.body,
    });
  }

  if (isBlogRoute) {
    const target = `https://rhei-blog.pages.dev${url.pathname}${url.search}`;

    return fetch(target, {
      method: request.method,
      headers: request.headers,
      body: request.body,
    });
  }

  return new Response("Not found", { status: 404 });
};
