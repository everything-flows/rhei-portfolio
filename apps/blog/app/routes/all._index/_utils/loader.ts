import { type LoaderFunctionArgs } from "@remix-run/cloudflare";
import {
  createServerClient,
  parseCookieHeader,
  serializeCookieHeader,
} from "@supabase/ssr";

import { getPostList } from "~/utils/getPostList";

const PAGE_SIZE = 10;

export default async function loader({ context, request }: LoaderFunctionArgs) {
  const headers = new Headers();
  const url = new URL(request.url);
  const page = Math.max(1, Number(url.searchParams.get("page")) || 1);

  const SUPABASE_URL = context.cloudflare.env.SUPABASE_URL;
  const SUPABASE_ANON_KEY = context.cloudflare.env.SUPABASE_ANON_KEY;

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error("Missing SUPABASE env variables");
  }

  const supabaseClient = createServerClient(SUPABASE_URL!, SUPABASE_ANON_KEY!, {
    cookies: {
      getAll() {
        return parseCookieHeader(request.headers.get("Cookie") ?? "");
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) =>
          headers.append(
            "Set-Cookie",
            serializeCookieHeader(name, value, options),
          ),
        );
      },
    },
  });

  const result = await getPostList({
    supabaseClient,
    page,
    pageSize: PAGE_SIZE,
  });

  if (Array.isArray(result)) {
    return { postList: result, currentPage: 1, totalPages: 1 };
  }

  const { postList, totalCount } = result;
  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  return { postList, currentPage: page, totalPages };
}
