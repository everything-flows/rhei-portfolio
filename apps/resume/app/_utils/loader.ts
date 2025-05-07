import { LoaderFunctionArgs } from "@remix-run/cloudflare";

export default async function loader({ request }: LoaderFunctionArgs) {
  const cookie = request.headers.get("Cookie") ?? "";
  const theme = cookie.includes("theme=dark") ? "dark" : "light";

  return {
    themeVar: theme,
  };
}
