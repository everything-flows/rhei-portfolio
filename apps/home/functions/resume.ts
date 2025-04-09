export const onRequest = async ({ request }: { request: Request }) => {
  const url = new URL(request.url);

  if (!url.pathname.startsWith("/resume")) {
    return new Response("Not found", { status: 404 });
  }

  if (
    url.pathname.startsWith("/resume/assets") ||
    url.pathname.startsWith("/resume/build")
  ) {
    return new Response("Not found", { status: 404 });
  }

  const target = `https://rhei-resume.pages.dev${url.pathname.replace(/^\/resume/, "")}${url.search}`;

  const headers = new Headers(request.headers);
  headers.set("host", "rhei-resume.pages.dev");

  const response = await fetch(target, {
    method: request.method,
    headers,
    body: ["GET", "HEAD"].includes(request.method) ? undefined : request.body,
    redirect: "manual",
  });

  const newHeaders = new Headers(response.headers);
  newHeaders.set("x-proxied-from", "rhei-resume.pages.dev");

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: newHeaders,
  });
};
