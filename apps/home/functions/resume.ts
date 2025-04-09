export const onRequest = async ({ request }: { request: Request }) => {
  const url = new URL(request.url);
  const newPath = url.pathname.replace(/^\/resume/, "") || "/";
  const target = `https://rhei-resume.pages.dev${newPath}${url.search}`;

  return fetch(target, {
    method: request.method,
    headers: request.headers,
    body: request.body,
  });
};
