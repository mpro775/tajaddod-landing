import { apiGet } from './client';
import type { ArticleCollection, ArticleDetail, Locale, QueryParams } from './types';

export const getArticles = (locale: Locale, query: QueryParams = {}) =>
  apiGet<ArticleCollection>('articles', locale, query);

export const getArticle = (slug: string, locale: Locale) =>
  apiGet<ArticleDetail>(`articles/${encodeURIComponent(slug)}`, locale);
