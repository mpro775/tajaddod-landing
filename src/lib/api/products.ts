import { apiGet } from './client';
import { getBrands } from './brands';
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

export const getProductBySlug = async (identifier: string, locale: Locale) => {
  const endpoint = /^[0-9a-f]{24}$/i.test(identifier)
    ? `products/${encodeURIComponent(identifier)}`
    : `products/slug/${encodeURIComponent(identifier)}`;
  const response = await apiGet<PublicProductDetailResponse>(endpoint, locale);
  const reference = response.product?.brand;
  const brandId = reference?.id || reference?._id;
  if (reference && !reference.slug && brandId) {
    try {
      const collection = await getBrands(locale, { limit: 100, page: 1 });
      const brand = collection.brands.find((item) => (item.id || item._id) === brandId);
      if (brand?.slug) response.product.brand = { ...reference, slug: brand.slug };
    } catch {
      // Keep product information available even if brand navigation cannot be resolved.
    }
  }
  return response;
};
