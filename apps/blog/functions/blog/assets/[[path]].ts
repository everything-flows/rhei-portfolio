export const onRequest: PagesFunction = async ({ request, params }) => {
  const { path } = params;

  const originalUrl = new URL(request.url);

  const assetPath = Array.isArray(path) ? path.join("/") : path;
  originalUrl.pathname = `/assets/${assetPath}`;

  return fetch(originalUrl.toString(), request);
};
