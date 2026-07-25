import type { WebsiteHome } from '../api/types';

export const HOME_SECTION_KEYS = ['brands', 'projects', 'products', 'articles'] as const;
export type HomeSectionKey = (typeof HOME_SECTION_KEYS)[number];

export function resolveHomeSectionOrder(home?: WebsiteHome): HomeSectionKey[] {
  const configured = Array.isArray(home?.settings.sectionOrder)
    ? home.settings.sectionOrder
    : [];
  const normalized = configured.filter(
    (value): value is HomeSectionKey =>
      typeof value === 'string' &&
      (HOME_SECTION_KEYS as readonly string[]).includes(value),
  );
  return [
    ...new Set<HomeSectionKey>(normalized),
    ...HOME_SECTION_KEYS.filter((value) => !normalized.includes(value)),
  ];
}

export function adaptHome(home?: WebsiteHome) {
  return {
    settings: home?.settings,
    sectionOrder: resolveHomeSectionOrder(home),
    projects: home?.settings.enableProjectsSection === false ? [] : home?.projects || [],
    products: home?.settings.enableProductsSection === false ? [] : home?.products || [],
    articles: home?.settings.enableArticlesSection === false ? [] : home?.articles || [],
    brands: home?.settings.enableBrandsSection === false ? [] : home?.brands || [],
  };
}
