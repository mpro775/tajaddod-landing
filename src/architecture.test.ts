import { readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const sourceRoot = dirname(fileURLToPath(import.meta.url));
const sourceFiles = (directory: string): string[] =>
  readdirSync(directory).flatMap((name) => {
    const path = join(directory, name);
    if (name.endsWith('.test.ts')) return [];
    return statSync(path).isDirectory() ? sourceFiles(path) : [path];
  });

describe('Astro production architecture', () => {
  it('contains no production import from removed project, news, brand, or product fixtures', () => {
    const source = sourceFiles(sourceRoot).map((path) => readFileSync(path, 'utf8')).join('\n');
    expect(source).not.toMatch(/data\/(projects|news|brands|generated-products)/);
  });

  it('renders the home, project, news, product, and brand data from the website aggregator', () => {
    const homePage = readFileSync(join(sourceRoot, 'pages', 'index.astro'), 'utf8');
    const homeComponent = readFileSync(join(sourceRoot, 'components', 'pages', 'HomePage.astro'), 'utf8');
    expect(homePage).toContain('getWebsiteHome');
    expect(homeComponent).toContain('adaptHome(home)');
    expect(homeComponent).toContain('projects, products, articles, brands');
    expect(homeComponent).toContain('PUBLIC_STORE_URL');
    expect(homeComponent).toContain('/products/${encodeURIComponent(product.slug)}');
    expect(homeComponent).toContain('sectionPosition');
  });

  it('keeps API resources and response adapters separated by domain', () => {
    for (const file of ['home.ts', 'projects.ts', 'articles.ts', 'products.ts', 'brands.ts']) {
      expect(readFileSync(join(sourceRoot, 'lib', 'api', file), 'utf8')).toContain('apiGet');
    }
    for (const file of [
      'project.adapter.ts',
      'article.adapter.ts',
      'product.adapter.ts',
      'home.adapter.ts',
    ]) {
      expect(readFileSync(join(sourceRoot, 'lib', 'adapters', file), 'utf8')).toContain('adapt');
    }
    expect(
      readFileSync(join(sourceRoot, 'lib', 'media', 'normalize-media.ts'), 'utf8'),
    ).toContain('normalizeMedia');
  });

  it('supports client filtering, related articles, and case-study-only sections', () => {
    const projectList = readFileSync(
      join(sourceRoot, 'components', 'pages', 'ProjectsPage.astro'),
      'utf8',
    );
    const projectDetail = readFileSync(
      join(sourceRoot, 'components', 'pages', 'ProjectDetailPage.astro'),
      'utf8',
    );
    const articleDetail = readFileSync(
      join(sourceRoot, 'pages', 'news', '[slug].astro'),
      'utf8',
    );
    expect(projectList).toContain('name="client"');
    expect(projectDetail).toContain("project.displayMode === 'case_study'");
    expect(articleDetail).toContain('getArticles');
    expect(articleDetail).toContain('related');
  });

  it('adds structured data to dynamic project and article details', () => {
    const projectAr = readFileSync(join(sourceRoot, 'pages', 'projects', '[slug].astro'), 'utf8');
    const articleAr = readFileSync(join(sourceRoot, 'pages', 'news', '[slug].astro'), 'utf8');
    const projectEn = readFileSync(join(sourceRoot, 'pages', 'en', 'projects', '[slug].astro'), 'utf8');
    const articleEn = readFileSync(join(sourceRoot, 'pages', 'en', 'news', '[slug].astro'), 'utf8');
    expect(projectAr).toContain("'@type': 'CreativeWork'");
    expect(projectEn).toContain("'@type': 'CreativeWork'");
    expect(articleAr).toContain("'@type': 'Article'");
    expect(articleEn).toContain("'@type': 'Article'");
  });

  it('provides real 404 handling for dynamic project and news routes', () => {
    const project = readFileSync(join(sourceRoot, 'pages', 'projects', '[slug].astro'), 'utf8');
    const article = readFileSync(join(sourceRoot, 'pages', 'news', '[slug].astro'), 'utf8');
    expect(project).toContain('Astro.response.status');
    expect(article).toContain('Astro.response.status');
    expect(project).toContain('cause.status === 404');
    expect(article).toContain('cause.status === 404');
  });

  it('emits canonical, hreflang, sitemap, and robots metadata', () => {
    const layout = readFileSync(join(sourceRoot, 'layouts', 'Layout.astro'), 'utf8');
    const sitemap = readFileSync(join(sourceRoot, 'pages', 'sitemap.xml.ts'), 'utf8');
    const robots = readFileSync(join(sourceRoot, 'pages', 'robots.txt.ts'), 'utf8');
    expect(layout).toContain('rel="canonical"');
    expect(layout).toContain('hreflang');
    expect(sitemap).toContain('<urlset');
    expect(robots).toContain('/sitemap.xml');
  });

  it('runs as Node SSR instead of static fixture generation', () => {
    const config = readFileSync(join(sourceRoot, '..', 'astro.config.mjs'), 'utf8');
    expect(config).toContain("output: 'server'");
    expect(config).toContain("mode: 'standalone'");
  });
});
