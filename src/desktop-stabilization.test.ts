import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const root = dirname(fileURLToPath(import.meta.url));
const read = (...parts: string[]) => readFileSync(join(root, ...parts), 'utf8');

describe('desktop final stabilization contracts', () => {
  it('keeps adaptive components theme-native', () => {
    for (const name of ['About', 'Coverage', 'Sectors', 'AppDownload', 'ContactCTA', 'BrandApplications']) {
      const source = read('components', 'sections', `${name}.astro`);
      const opening = source.match(/<section\b[^>]*>/)?.[0] || '';
      expect(opening).not.toContain('theme-inverse');
      expect(source).toMatch(/--tj-(?:bg|text|border)-/);
    }
    expect(read('components', 'sections', 'BrandApplications.astro')).toContain('var(--tj-bg-section-alt)');
  });

  it('uses shared centered headers for indexes and achievements', () => {
    const pageHeader = read('components', 'layout', 'PageHeader.astro');
    expect(pageHeader).toContain('align="center"');
    expect(pageHeader).toContain('margin: 0 auto');
    expect(read('components', 'pages', 'ProjectsPage.astro')).toContain('<PageHeader');
    expect(read('components', 'pages', 'NewsPage.astro')).toContain('<PageHeader');
    expect(read('components', 'pages', 'BrandsIndexPage.astro')).toContain('<PageHeader');
    expect(read('components', 'sections', 'Achievements.astro')).toContain('align="center"');
  });

  it('provides resilient brand indexes and real product routes in both locales', () => {
    for (const path of [
      ['pages', 'brands', 'index.astro'],
      ['pages', 'en', 'brands', 'index.astro'],
      ['pages', 'products', '[slug].astro'],
      ['pages', 'en', 'products', '[slug].astro'],
    ]) {
      expect(existsSync(join(root, ...path))).toBe(true);
    }
    const brandRoute = read('pages', 'brands', '[slug].astro');
    expect(brandRoute).toContain('getProducts');
    expect(brandRoute).toContain('brandId');
    expect(brandRoute).not.toContain('getWebsiteHome');
    expect(read('components', 'cards', 'BrandProductCard.astro')).toContain('<a class="product-card"');
  });

  it('maps and renders the distinct project description', () => {
    expect(read('lib', 'adapters', 'project.adapter.ts')).toContain("description: localizedValue(source, 'description', locale)");
    const detail = read('components', 'pages', 'ProjectDetailPage.astro');
    expect(detail).toContain('project.description');
    expect(detail).toContain('labels.overview');
  });

  it('uses URL-driven shared filters without DOM-only card filtering', () => {
    const projects = read('components', 'pages', 'ProjectsPage.astro');
    const news = read('components', 'pages', 'NewsPage.astro');
    expect(projects).toContain('<FilterBar');
    expect(news).toContain('<FilterBar');
    expect(projects).not.toContain('card.style.display');
    expect(news).not.toContain('card.style.display');
    expect(read('components', 'ui', 'FilterBar.astro')).toContain('method="get"');
  });

  it('builds hero flow geometry from live DOM anchors and uses logical step geometry', () => {
    const hero = read('scripts', 'heroMotion.ts');
    expect(hero).toContain('[data-flow-origin]');
    expect(hero).toContain('[data-flow-target=');
    expect(hero).toContain('getScreenCTM');
    expect(hero).toContain('ResizeObserver');
    expect(hero).not.toMatch(/(?:470|420|1024)\b/);
    const market = read('components', 'sections', 'MarketRole.astro');
    expect(market).toContain('inset-inline-start: calc(50% + 24px)');
    expect(market).toContain('inline-size: calc(100% + 20px - 48px)');
  });

  it('keeps one desktop appearance control and one footer surface', () => {
    const header = read('components', 'layout', 'Header.astro');
    const desktopControls = header.match(/<div class="theme-controls theme-controls--desktop"[\s\S]*?<\/div>\s*<div class="header-mobile-actions">/)?.[0] || '';
    expect(desktopControls).toContain('<details class="theme-menu">');
    expect(desktopControls).not.toContain('data-theme-toggle');
    const footer = read('components', 'layout', 'Footer.astro');
    expect(footer).toContain('.footer-accordion-item');
    expect(footer).toMatch(/\.footer-accordion-item\s*\{[\s\S]*?background:\s*transparent/);
    expect(footer).toContain('padding-block: 80px 60px');
  });
});
