export const onRequest: PagesFunction = async ({ request }) => {
  const url = new URL(request.url);

  const isBlogRoute = url.pathname.startsWith("/craft");
  if (!isBlogRoute) return new Response("Not found", { status: 404 });

  const targetUrl = `https://craft.rhei.me${url.pathname}${url.search}`;

  return fetch(targetUrl, {
    method: request.method,
    headers: request.headers,
    body:
      request.method !== "GET" && request.method !== "HEAD"
        ? request.body
        : undefined,
  });
};
