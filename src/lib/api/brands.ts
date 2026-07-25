import { apiGet } from './client';
import type { BrandCollection, Locale, PublicBrand, QueryParams } from './types';

export const getBrands = (locale: Locale, query: QueryParams = {}) =>
  apiGet<BrandCollection>('brands', locale, query);

export const getBrand = (slug: string, locale: Locale) =>
  apiGet<PublicBrand>(`brands/slug/${encodeURIComponent(slug)}`, locale);
