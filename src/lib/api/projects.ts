import { apiGet } from './client';
import type { Locale, ProjectCollection, ProjectDetail, QueryParams } from './types';

export const getProjects = (locale: Locale, query: QueryParams = {}) =>
  apiGet<ProjectCollection>('projects', locale, query);

export const getProject = (slug: string, locale: Locale) =>
  apiGet<ProjectDetail>(`projects/${encodeURIComponent(slug)}`, locale);
