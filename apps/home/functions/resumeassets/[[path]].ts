export const onRequest: PagesFunction = async ({ request }) => {
  const url = new URL(request.url);

  const isResumeAssetRoute =
    url.pathname === "/resumeassets" ||
    url.pathname.startsWith("/resumeassets/");
  if (!isResumeAssetRoute) return new Response("Not found", { status: 404 });

  const targetUrl = `https://rhei-resume.pages.dev${url.pathname}${url.search}`;
  const response = await fetch(targetUrl, {
    method: request.method,
    headers: request.headers,
    redirect: "manual",
    body:
      request.method !== "GET" && request.method !== "HEAD"
        ? request.body
        : undefined,
  });

  const location = response.headers.get("Location");
  if (!location) return response;

  const nextUrl = new URL(location, targetUrl);
  if (nextUrl.hostname !== "rhei-resume.pages.dev") return response;

  nextUrl.hostname = url.hostname;

  const headers = new Headers(response.headers);
  headers.set("Location", nextUrl.toString());

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
};
