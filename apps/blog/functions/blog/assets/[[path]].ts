export const onRequest: PagesFunction = async ({ request }) => {
  const targetUrl = new URL(request.url);
  targetUrl.pathname = targetUrl.pathname.replace("blog/assets", "assets");

  return fetch(targetUrl.toString(), request);
};
