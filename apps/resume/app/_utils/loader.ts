import { LoaderFunctionArgs } from "@remix-run/cloudflare";

export default async function loader({ context, request }: LoaderFunctionArgs) {
  const cookie = request.headers.get("Cookie") ?? "";
  const theme = cookie.includes("theme=dark") ? "dark" : "light";

  const isDev = context.cloudflare.env.NODE_ENV === "development";
  const gaId = isDev ? undefined : context.cloudflare.env.GA_ID;

  return {
    themeVar: theme,
    gaId,
  };
}
