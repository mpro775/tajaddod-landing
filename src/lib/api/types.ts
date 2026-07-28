export type Locale = 'ar' | 'en';

export interface LocalizedMedia {
  id?: string;
  url: string;
  altAr?: string;
  altEn?: string;
  captionAr?: string;
  captionEn?: string;
  width?: number;
  height?: number;
  order?: number;
}

export interface ProjectMetric {
  value: string;
  labelAr: string;
  labelEn: string;
  order?: number;
}

export interface ProjectSummary {
  id: string;
  slug: string;
  titleAr: string;
  titleEn: string;
  shortDescriptionAr?: string;
  shortDescriptionEn?: string;
  clientNameAr: string;
  clientNameEn: string;
  clientAcronym?: string;
  countryCode: string;
  locationAr?: string;
  locationEn?: string;
  periodType: 'single_year' | 'year_range' | 'lta' | 'ongoing' | 'unknown';
  startYear?: number;
  endYear?: number;
  periodLabelAr?: string;
  periodLabelEn?: string;
  category: string;
  services: string[];
  sectors: string[];
  status: string;
  displayMode: 'standard' | 'case_study';
  cover?: LocalizedMedia;
  metrics: ProjectMetric[];
}

export interface ProjectDetail extends ProjectSummary {
  descriptionAr: string;
  descriptionEn: string;
  cityAr?: string;
  cityEn?: string;
  governoratesAr: string[];
  governoratesEn: string[];
  gallery: LocalizedMedia[];
  challengeAr?: string;
  challengeEn?: string;
  solutionAr?: string;
  solutionEn?: string;
  scopeAr: string[];
  scopeEn: string[];
  resultsAr?: string;
  resultsEn?: string;
  tagsAr: string[];
  tagsEn: string[];
  metaTitleAr?: string;
  metaTitleEn?: string;
  metaDescriptionAr?: string;
  metaDescriptionEn?: string;
}

export interface ProjectCollection {
  projects: ProjectSummary[];
  pagination: Pagination;
}

export interface ArticleSummary {
  id: string;
  slug: string;
  titleAr: string;
  titleEn: string;
  excerptAr?: string;
  excerptEn?: string;
  type: string;
  category?: string;
  tags: string[];
  authorName?: string;
  publishDate?: string;
  readTime: number;
  cover?: LocalizedMedia;
}

export interface ArticleDetail extends ArticleSummary {
  contentAr: string;
  contentEn: string;
  gallery: LocalizedMedia[];
  metaTitleAr?: string;
  metaTitleEn?: string;
  metaDescriptionAr?: string;
  metaDescriptionEn?: string;
}

export interface ArticleCollection {
  articles: ArticleSummary[];
  pagination: Pagination;
}

export interface ProductReference {
  id: string;
  slug?: string;
  nameAr: string;
  nameEn: string;
  image?: string;
}

export interface LandingProduct {
  id: string;
  slug: string;
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  descriptionEn: string;
  landingLabelAr?: string;
  landingLabelEn?: string;
  landingDescriptionAr?: string;
  landingDescriptionEn?: string;
  mainImage?: LocalizedMedia;
  brand?: ProductReference;
  category?: ProductReference;
  landingOrder: number;
}

export interface PublicProductSummary {
  id?: string;
  _id?: string;
  slug?: string;
  name?: string;
  nameAr?: string;
  nameEn?: string;
  description?: string;
  descriptionAr?: string;
  descriptionEn?: string;
  mainImage?: LocalizedMedia | string | null;
  images?: Array<LocalizedMedia | string>;
  brand?: ProductReference;
  category?: ProductReference;
  warrantyDurationYears?: number;
  isFeatured?: boolean;
  isNew?: boolean;
  isAvailable?: boolean;
}

export interface ProductAttributeValue {
  id?: string;
  label?: string;
  value?: string;
  name?: string;
  nameEn?: string;
  hexCode?: string;
}

export interface ProductAttribute {
  id?: string;
  name?: string;
  nameEn?: string;
  values?: ProductAttributeValue[];
}

export interface PublicProductDetail extends PublicProductSummary {
  attributesDetails?: ProductAttribute[];
}

export interface PublicProductCollection {
  data: PublicProductSummary[];
  meta: Pagination;
}

export interface PublicProductDetailResponse {
  product: PublicProductDetail;
  relatedProducts?: PublicProductSummary[];
  variants?: Array<Record<string, unknown>>;
}

export interface PublicBrand {
  id?: string;
  _id?: string;
  slug: string;
  nameAr?: string;
  name?: string;
  nameEn?: string;
  descriptionAr?: string;
  description?: string;
  descriptionEn?: string;
  image?: string;
  logoUrl?: string;
  landingOrder?: number;
  website?: string;
}

export interface LandingSettings {
  enableProjectsSection: boolean;
  enableProductsSection: boolean;
  enableArticlesSection: boolean;
  enableBrandsSection: boolean;
  projectsLimit: number;
  productsLimit: number;
  articlesLimit: number;
  sectionOrder: string[];
  [key: string]: unknown;
}

export interface WebsiteHome {
  settings: LandingSettings;
  projects: ProjectSummary[];
  products: LandingProduct[];
  articles: ArticleSummary[];
  brands: PublicBrand[];
  generatedAt: string;
}

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface BrandCollection {
  brands: PublicBrand[];
  pagination: Pagination;
}

export interface QueryValue {
  toString(): string;
}

export type QueryParams = Record<string, QueryValue | undefined | null>;
