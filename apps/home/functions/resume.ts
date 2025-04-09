export const onRequest = async ({ request }: { request: Request }) => {
  const url = new URL(request.url);
  const target = `https://rhei-resume.pages.dev${url.pathname}${url.search}`;

  return fetch(target, {
    method: request.method,
    headers: request.headers,
    body: request.body,
  });
};
