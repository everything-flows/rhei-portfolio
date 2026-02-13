import { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { META } from "@rhei/meta";
import {
  createServerClient,
  parseCookieHeader,
  serializeCookieHeader,
} from "@supabase/ssr";

import { getSitemapPostList } from "./getSitemapPostList";
import { getSitemapTagList } from "./getSitemapTagList";

export async function loader({ context, request }: LoaderFunctionArgs) {
  const SUPABASE_URL = context.cloudflare.env.SUPABASE_URL;
  const SUPABASE_ANON_KEY = context.cloudflare.env.SUPABASE_ANON_KEY;

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error("Missing SUPABASE env variables");
  }

  const headers = new Headers();

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

  const posts = await getSitemapPostList({ supabaseClient });
  const tags = await getSitemapTagList({ supabaseClient });

  const content = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${META.url.site}/blog/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <priority>1.0</priority>
  </url>
${posts
  .map(
    (post) => `
  <url>
    <loc>${META.url.site}/blog/${post.sub_blog}/${post.id}</loc>
    <lastmod>${new Date(post.last_edited_at).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
  </url>`,
  )
  .join("")}
  ${tags
    .map(
      (tag) => `
  <url>
    <loc>${META.url.site}/blog/tag/${tag.id}</loc>
    <lastmod>${new Date(tag.created_at).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
  </url>`,
    )
    .join("")}
</urlset>`;

  return new Response(content, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
      "xml-version": "1.0",
      encoding: "UTF-8",
    },
  });
}
