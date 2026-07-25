import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const origin = (import.meta.env.PUBLIC_SITE_URL || site?.toString() || 'https://tagadodgroup.com').replace(/\/+$/, '');
  return new Response(`User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
