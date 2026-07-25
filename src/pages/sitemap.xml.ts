import type { APIRoute } from 'astro';
import { getArticles, getBrands, getProjects } from '../lib/api';

export const GET: APIRoute = async ({ site }) => {
  const origin = (import.meta.env.PUBLIC_SITE_URL || site?.toString() || 'https://tagadodgroup.com').replace(/\/+$/, '');
  const paths = new Set(['/', '/en', '/projects', '/en/projects', '/news', '/en/news']);

  try {
    const [projects, articles, brands] = await Promise.all([
      getProjects('ar', { page: 1, limit: 100 }),
      getArticles('ar', { page: 1, limit: 100 }),
      getBrands('ar', { page: 1, limit: 100 }),
    ]);
    projects.projects.forEach(({ slug }) => {
      paths.add(`/projects/${slug}`);
      paths.add(`/en/projects/${slug}`);
    });
    articles.articles.forEach(({ slug }) => {
      paths.add(`/news/${slug}`);
      paths.add(`/en/news/${slug}`);
    });
    brands.brands.forEach(({ slug }) => {
      paths.add(`/brands/${slug}`);
      paths.add(`/en/brands/${slug}`);
    });
  } catch {
    // Keep the static routes available when the CMS is temporarily unavailable.
  }

  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${[...paths]
    .map((path) => `<url><loc>${origin}${path}</loc></url>`)
    .join('')}</urlset>`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
