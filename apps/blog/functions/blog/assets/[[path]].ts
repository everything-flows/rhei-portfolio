export const onRequest: PagesFunction = async ({ request, params }) => {
  const { path } = params;

  const assetPath = Array.isArray(path) ? path.join("/") : path;

  const rewrittenUrl = new URL(request.url);
  rewrittenUrl.pathname = `/assets/${assetPath}`;

  return fetch(rewrittenUrl.toString(), request);
};
