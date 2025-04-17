export const onRequest: PagesFunction = async ({ request }) => {
  const url = new URL(request.url);

  const match = url.pathname.match(/^\/blog\/(.+)\.data$/);

  if (match) {
    const originalPath = match[1];
    const rewrittenUrl = new URL(`/blog/${originalPath}/.data`, request.url);
    return fetch(rewrittenUrl.toString(), request);
  }

  return fetch(
    `https://rhei-blog.pages.dev${url.pathname}${url.search}`,
    request,
  );
};
