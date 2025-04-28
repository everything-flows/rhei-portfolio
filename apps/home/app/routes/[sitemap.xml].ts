import { SITE_URL } from "@rhei/meta";

const date = new Date(2025, 3, 28).toISOString();

const content = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL}</loc>
    <lastmod>${date}</lastmod>
    <priority>1.0</priority>
    <changefreq>daily</changefreq>
  </url>
  <url>
    <loc>${SITE_URL}/resume</loc>
    <lastmod>${date}</lastmod>
    <priority>1.0</priority>
    <changefreq>monthly</changefreq>
  </url>
  <url>
    <loc>${SITE_URL}/craft</loc>
    <lastmod>${date}</lastmod>
    <priority>0.5</priority>
    <changefreq>monthly</changefreq>
  </url>
</urlset>`;

export async function loader() {
  return new Response(content, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
