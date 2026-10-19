import type { LandingProduct, Locale, ProductReference, PublicProductSummary } from './api/types';
import { adaptProduct, adaptPublicProduct } from './adapters/product.adapter';

export const PRODUCT_PLACEHOLDER = '/assets/products/product-placeholder.svg';
export const brandAccent = (slug?: string) => slug?.toLowerCase() === 'liper' ? '#ff8c00' : slug?.toLowerCase() === 'cnc' ? '#e63946' : '#1e99d3';

export function referenceName(reference: ProductReference | undefined, locale: Locale): string {
  if (!reference) return '';
  return locale === 'en'
    ? reference.nameEn || reference.name || reference.nameAr || ''
    : reference.nameAr || reference.name || reference.nameEn || '';
}

export function productView(product: LandingProduct | PublicProductSummary, locale: Locale) {
  const adapted = 'landingOrder' in product ? adaptProduct(product, locale) : adaptPublicProduct(product, locale);
  const identifier = product.slug || product.id || ('_id' in product ? product._id : undefined);
  const media = product.mainImage;
  return {
    identifier,
    name: adapted.name,
    description: adapted.description,
    image: (typeof media === 'string' ? media : media?.url) || PRODUCT_PLACEHOLDER,
    brandName: referenceName(product.brand, locale),
    brandSlug: product.brand?.slug,
    category: referenceName(product.category, locale),
    warrantyYears: 'warrantyDurationYears' in product ? product.warrantyDurationYears : undefined,
  };
}
