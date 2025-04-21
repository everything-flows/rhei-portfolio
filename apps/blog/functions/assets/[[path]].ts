export const onRequest: PagesFunction = async ({ request, params }) => {
  const { path } = params;

  const targetUrl = new URL(request.url);
  targetUrl.pathname = `/assets/${Array.isArray(path) ? path.join("/") : path}`;

  return fetch(targetUrl.toString(), request);
};
