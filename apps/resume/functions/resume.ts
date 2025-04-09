export const onRequest = async ({ request }: { request: Request }) => {
  const url = new URL(request.url);

  if (url.pathname.startsWith("/resume/assets/")) {
    const targetURL = `https://rhei-resume.pages.dev${url.pathname}${url.search}`;
    return fetch(targetURL, {
      method: request.method,
      headers: request.headers,
      body: request.body,
    });
  }

  return new Response("Not found", { status: 404 });
};
