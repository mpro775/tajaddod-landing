import type { Locale, LocalizedMedia } from '../api/types';

export function normalizeMedia(
  media: LocalizedMedia | null | undefined,
): LocalizedMedia | undefined {
  if (!media?.url?.trim()) return undefined;
  return {
    ...media,
    url: media.url.trim(),
    order: Number.isFinite(media.order) ? media.order : 0,
  };
}

export function localizedMediaAlt(
  media: LocalizedMedia | null | undefined,
  locale: Locale,
  fallback: string,
): string {
  const normalized = normalizeMedia(media);
  if (!normalized) return fallback;
  return locale === 'en'
    ? normalized.altEn || normalized.altAr || fallback
    : normalized.altAr || normalized.altEn || fallback;
}

export function localizedMediaCaption(
  media: LocalizedMedia | null | undefined,
  locale: Locale,
): string {
  const normalized = normalizeMedia(media);
  if (!normalized) return '';
  return locale === 'en'
    ? normalized.captionEn || normalized.captionAr || ''
    : normalized.captionAr || normalized.captionEn || '';
}
