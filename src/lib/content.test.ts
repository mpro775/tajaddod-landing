import { describe, expect, it } from 'vitest';
import { dictionary } from '../i18n';
import {
  alternatePath,
  localePath,
  mediaAlt,
  projectPeriod,
  renderRichContent,
} from './content';

describe('bilingual website content adapters', () => {
  it('uses RTL Arabic and LTR English dictionaries', () => {
    expect(dictionary('ar').dir).toBe('rtl');
    expect(dictionary('en').dir).toBe('ltr');
  });

  it('builds equivalent Arabic and English routes', () => {
    expect(localePath('ar', '/projects/demo')).toBe('/projects/demo');
    expect(localePath('en', '/projects/demo')).toBe('/en/projects/demo');
    expect(alternatePath('/projects/demo', 'ar')).toBe('/en/projects/demo');
    expect(alternatePath('/en/projects/demo', 'en')).toBe('/projects/demo');
  });

  it('adapts every supported project period', () => {
    const base: any = { slug: 'x' };
    expect(projectPeriod({ ...base, periodType: 'single_year', startYear: 2024 }, 'en')).toBe('2024');
    expect(projectPeriod({ ...base, periodType: 'year_range', startYear: 2021, endYear: 2024 }, 'ar')).toBe('2021–2024');
    expect(projectPeriod({ ...base, periodType: 'ongoing' }, 'en')).toBe('Ongoing');
  });

  it('uses localized media alt text and a safe placeholder label', () => {
    expect(mediaAlt({ url: '/x.jpg', altAr: 'صورة', altEn: 'Image' }, 'en', 'Fallback')).toBe('Image');
    expect(mediaAlt(undefined, 'ar', 'المشروع')).toBe('المشروع');
  });

  it('sanitizes HTML and renders Markdown without executable content', () => {
    const html = renderRichContent('# Heading\n\n[bad](javascript:evil)\n\n<script>alert(1)</script>');
    expect(html).toContain('<h1>Heading</h1>');
    expect(html).not.toContain('<script');
    expect(html).not.toContain('javascript:');
  });
});
