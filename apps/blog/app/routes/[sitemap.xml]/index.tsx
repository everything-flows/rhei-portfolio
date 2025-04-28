import { SITE_URL } from "@rhei/meta";
import { LoaderFunctionArgs } from "@remix-run/cloudflare";
import {
  createServerClient,
  parseCookieHeader,
  serializeCookieHeader,
} from "@supabase/ssr";

import { getSitemapPostList } from "../getSitemapPostList";

export default async function loader({ context, request }: LoaderFunctionArgs) {
  const headers = new Headers();

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

  const posts = await getSitemapData({ supabaseClient });

  // XML 생성
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
${posts
  .map(
    (post) => `
  <url>
    <loc>${SITE_URL}/blog/${post.sub_blog}/${post.id}</loc>
    <lastmod>${new Date(post.last_edited_at).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
  </url>`,
  )
  .join("\n")}
</urlset>`;

  // 응답 반환
  return new Response(sitemap.trim(), {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
