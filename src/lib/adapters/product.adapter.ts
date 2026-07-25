import type { LandingProduct, Locale } from '../api/types';

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
