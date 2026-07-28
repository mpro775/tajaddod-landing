import { readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const sourceRoot = dirname(fileURLToPath(import.meta.url));
const componentRoot = join(sourceRoot, 'components');
const read = (...parts: string[]) => readFileSync(join(sourceRoot, ...parts), 'utf8');
const filesUnder = (directory: string): string[] =>
  readdirSync(directory).flatMap((name) => {
    const path = join(directory, name);
    return statSync(path).isDirectory() ? filesUnder(path) : [path];
  });

describe('final closure contracts', () => {
  it('reserves always-cinematic home surfaces for the intentional visual scenes', () => {
    const adaptiveSections = [
      'About',
      'Brands',
      'FeaturedProjects',
      'Coverage',
      'Sectors',
      'AppDownload',
      'LatestNews',
      'ContactCTA',
    ];

    for (const section of adaptiveSections) {
      const source = read('components', 'sections', `${section}.astro`);
      const openingTag = source.match(/<section\b[^>]*>/)?.[0] ?? '';
      expect(openingTag).not.toMatch(/\b(?:theme-inverse|layer-cinematic)\b/);
      expect(openingTag).toMatch(/\blayer-corporate(?:-alt)?\b/);
    }

    expect(read('components', 'sections', 'CinematicHero.astro')).toMatch(
      /<section\b[^>]*\btheme-inverse\b/,
    );
    expect(read('components', 'sections', 'MarketRole.astro')).toMatch(
      /<section\b[^>]*\blayer-cinematic\b/,
    );
    expect(read('components', 'sections', 'EnergyJourney.astro')).toMatch(
      /<section\b[^>]*\blayer-cinematic\b/,
    );
  });

  it('keeps one semantic MarketRole connector contract and locale-aware desktop ordering', () => {
    const marketRole = read('components', 'sections', 'MarketRole.astro');

    expect(marketRole).toContain('mr-flow__lines--brands');
    expect(marketRole).toContain('mr-flow__lines--market');
    expect(marketRole).not.toMatch(/mr-flow__lines--(?:in|out)\b/);
    expect(marketRole).toContain(':global([dir="ltr"]) .mr-flow');
    expect(marketRole).toContain('grid-template-areas: "brands hub market"');
    expect(marketRole).toContain(':global([dir="rtl"]) .mr-flow');
    expect(marketRole.match(/grid-template-areas: "brands hub market"/g)).toHaveLength(2);
    expect(marketRole).toContain('animation-name: mrLaserFlowReverse');
  });

  it('reserves layout space for every rendered image and keeps hero art direction', () => {
    const astroFiles = filesUnder(componentRoot).filter((path) => path.endsWith('.astro'));
    const imageTags = astroFiles.flatMap((path) => {
      const source = readFileSync(path, 'utf8');
      return [...source.matchAll(/<img\b[\s\S]*?>/g)].map((match) => match[0]);
    });

    expect(imageTags.length).toBeGreaterThan(0);
    for (const image of imageTags) {
      expect(image).toMatch(/\bwidth=/);
      expect(image).toMatch(/\bheight=/);
    }

    const hero = read('components', 'sections', 'CinematicHero.astro');
    expect(hero).toContain('media="(max-width: 767px)"');
    expect(hero).toContain('hero-static-scene-mobile.webp');
    expect(hero).toContain('loading="eager"');
    expect(hero).toContain('fetchpriority="high"');
  });

  it('keeps mobile accessibility and viewport safeguards in the final CSS contract', () => {
    const styles = filesUnder(join(sourceRoot, 'styles'))
      .filter((path) => path.endsWith('.css'))
      .map((path) => readFileSync(path, 'utf8'))
      .join('\n');
    const header = read('components', 'layout', 'Header.astro');
    const footer = read('components', 'layout', 'Footer.astro');

    expect(styles).toContain('@media (prefers-reduced-motion: reduce)');
    expect(styles).toContain('env(safe-area-inset-bottom)');
    expect(footer).toContain('env(safe-area-inset-bottom)');
    expect(header).toMatch(/\.theme-quick-toggle,[\s\S]*?width:\s*44px;[\s\S]*?height:\s*44px;/);
    expect(styles).not.toMatch(/(?:html|body)\s*(?:,\s*(?:html|body)\s*)?\{[^}]*overflow-x:\s*hidden/i);
  });
});
