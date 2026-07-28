import type { LandingProduct, Locale, PublicProductSummary } from '../api/types';

export function adaptProduct(product: LandingProduct, locale: Locale) {
  const isEnglish = locale === 'en';
  return {
    ...product,
    name: isEnglish
      ? product.landingLabelEn || product.nameEn || product.nameAr
      : product.landingLabelAr || product.nameAr || product.nameEn,
    description: isEnglish
      ? product.landingDescriptionEn || product.descriptionEn || product.descriptionAr
      : product.landingDescriptionAr || product.descriptionAr || product.descriptionEn,
  };
}

export function adaptPublicProduct(product: PublicProductSummary, locale: Locale) {
  const isEnglish = locale === 'en';
  return {
    ...product,
    name: isEnglish
      ? product.nameEn || product.name || product.nameAr || ''
      : product.nameAr || product.name || product.nameEn || '',
    description: isEnglish
      ? product.descriptionEn || product.description || product.descriptionAr || ''
      : product.descriptionAr || product.description || product.descriptionEn || '',
  };
}
