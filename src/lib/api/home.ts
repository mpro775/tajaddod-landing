import { apiGet } from './client';
import type { Locale, WebsiteHome } from './types';

export const getWebsiteHome = (locale: Locale) =>
  apiGet<WebsiteHome>('website/home', locale);
