import { describe, expect, it } from 'vitest';
import { ar } from './ar';
import { en } from './en';
import { dictionary, formatMessage, intlLocale } from './index';

function keyPaths(value: unknown, prefix = ''): string[] {
  if (Array.isArray(value)) {
    return value.length ? keyPaths(value[0], `${prefix}[]`) : [`${prefix}[]`];
  }
  if (value && typeof value === 'object') {
    return Object.entries(value)
      .flatMap(([key, child]) => keyPaths(child, prefix ? `${prefix}.${key}` : key));
  }
  return [prefix];
}

describe('localization dictionaries', () => {
  it('keep Arabic and English structurally identical', () => {
    expect(keyPaths(en).sort()).toEqual(keyPaths(ar).sort());
  });

  it('exposes the correct locale, direction, and Intl locale', () => {
    expect(dictionary('ar').dir).toBe('rtl');
    expect(dictionary('en').dir).toBe('ltr');
    expect(intlLocale('ar')).toBe('ar-YE');
    expect(intlLocale('en')).toBe('en-US');
  });

  it('covers every home section and interpolates reusable messages', () => {
    const requiredSections = [
      'hero', 'about', 'achievements', 'brands', 'projects', 'marketRole',
      'coverage', 'sectors', 'energyJourney', 'appDownload', 'latestNews', 'contact',
    ];
    expect(Object.keys(ar.home)).toEqual(expect.arrayContaining(requiredSections));
    expect(Object.keys(en.home)).toEqual(expect.arrayContaining(requiredSections));
    expect(formatMessage(en.brands.products.ctaTitle, { brand: 'CNC' })).toContain('CNC');
  });
});
