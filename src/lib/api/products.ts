import { apiGet } from './client';
import type { LandingProduct, Locale } from './types';

export const getLandingProducts = (locale: Locale) =>
  apiGet<LandingProduct[]>('products/landing', locale);
