export const onRequest: PagesFunction = async ({ request }) => {
  const url = new URL(request.url);

  const isResumeAsset = url.pathname.startsWith("/resume/assets/");
  const isResumeRoute =
    url.pathname === "/resume" || url.pathname.startsWith("/resume/");

  if (isResumeAsset) {
    const assetPath = url.pathname.replace("/resume", "");
    const assetTarget = `https://rhei-resume.pages.dev/resume${assetPath}${url.search}`;

    return fetch(assetTarget, {
      method: request.method,
      headers: request.headers,
      body: request.body,
    });
  }

  if (isResumeRoute) {
    const target = `https://rhei-resume.pages.dev${url.pathname}${url.search}`;

    return fetch(target, {
      method: request.method,
      headers: request.headers,
      body: request.body,
    });
  }

  return new Response("Not found", { status: 404 });
};
