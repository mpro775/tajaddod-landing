import type { Locale } from '../lib/api/types';

export function formatWarrantyDuration(years: number | null | undefined, locale: Locale): string | null {
  if (typeof years !== 'number' || !Number.isSafeInteger(years) || years <= 0) return null;
  if (locale === 'en') return `${years}-year warranty`;
  if (years === 1) return 'ضمان لمدة سنة';
  if (years === 2) return 'ضمان لمدة سنتين';
  const remainder = years % 100;
  return `ضمان لمدة ${years} ${remainder >= 3 && remainder <= 10 ? 'سنوات' : 'سنة'}`;
}
