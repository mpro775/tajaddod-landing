import sanitizeHtml from 'sanitize-html';
import { marked } from 'marked';
import type { Locale, LocalizedMedia, ProjectSummary } from './api/types';
import { localized } from '../i18n';
import { localizedMediaAlt } from './media/normalize-media';
import { formatProjectPeriod } from './adapters/project.adapter';

export function text(source: unknown, field: string, locale: Locale, fallback = '') {
  return localized(source, field, locale, fallback);
}

export function mediaAlt(media: LocalizedMedia | undefined, locale: Locale, fallback: string) {
  return localizedMediaAlt(media, locale, fallback);
}

export function projectPeriod(project: ProjectSummary, locale: Locale): string {
  return formatProjectPeriod(project, locale);
}

export function localizedArray(
  input: unknown,
  base: string,
  locale: Locale,
): string[] {
  const source = (input || {}) as Record<string, unknown>;
  const preferred = source[`${base}${locale === 'en' ? 'En' : 'Ar'}`];
  const alternate = source[`${base}${locale === 'en' ? 'Ar' : 'En'}`];
  const values = Array.isArray(preferred) && preferred.length ? preferred : alternate;
  return Array.isArray(values) ? values.map(String) : [];
}

export function renderRichContent(source: string): string {
  const html = marked.parse(source, { async: false }) as string;
  return sanitizeHtml(html, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat([
      'img',
      'figure',
      'figcaption',
      'h1',
      'h2',
      'h3',
      'h4',
    ]),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      img: ['src', 'alt', 'width', 'height', 'loading'],
      a: ['href', 'name', 'target', 'rel'],
    },
    allowedSchemes: ['http', 'https', 'mailto'],
    transformTags: {
      a: sanitizeHtml.simpleTransform('a', { rel: 'noopener noreferrer' }, true),
      img: sanitizeHtml.simpleTransform('img', { loading: 'lazy' }, true),
    },
  });
}

export function localePath(locale: Locale, path = ''): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return locale === 'en' ? `/en${normalized === '/' ? '' : normalized}` : normalized;
}

export function alternatePath(pathname: string, locale: Locale): string {
  if (locale === 'en') return pathname.replace(/^\/en(?=\/|$)/, '') || '/';
  return `/en${pathname === '/' ? '' : pathname}`;
}
