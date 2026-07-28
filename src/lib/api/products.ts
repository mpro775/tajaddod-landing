import { apiGet } from './client';
import type {
  LandingProduct,
  Locale,
  PublicProductCollection,
  PublicProductDetailResponse,
  QueryParams,
} from './types';

export const getLandingProducts = (locale: Locale) =>
  apiGet<LandingProduct[]>('products/landing', locale);

export const getProducts = (locale: Locale, query: QueryParams = {}) =>
  apiGet<PublicProductCollection>('products', locale, query);

export const getProductBySlug = (identifier: string, locale: Locale) => {
  const endpoint = /^[0-9a-f]{24}$/i.test(identifier)
    ? `products/${encodeURIComponent(identifier)}`
    : `products/slug/${encodeURIComponent(identifier)}`;
  return apiGet<PublicProductDetailResponse>(endpoint, locale);
};
