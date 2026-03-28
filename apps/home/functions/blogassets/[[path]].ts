export const onRequest: PagesFunction = async ({ request }) => {
  const url = new URL(request.url);

  const isBlogAssetRoute =
    url.pathname === "/blogassets" || url.pathname.startsWith("/blogassets/");
  if (!isBlogAssetRoute) return new Response("Not found", { status: 404 });

  const targetUrl = `https://blog.rhei.me${url.pathname}${url.search}`;

  return fetch(targetUrl, {
    method: request.method,
    headers: request.headers,
    body:
      request.method !== "GET" && request.method !== "HEAD"
        ? request.body
        : undefined,
  });
};
