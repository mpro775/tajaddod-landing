import type {
  ArticleCollection,
  ProjectCollection,
  ProjectSummary,
  QueryParams,
} from './api/types';

export type FilterQuery = Record<string, string>;

export function parseFilterQuery(
  params: URLSearchParams,
  allowed: readonly string[],
): FilterQuery {
  return Object.fromEntries(
    allowed
      .map((key) => [key, (params.get(key) || '').trim()] as const)
      .filter(([, value]) => value !== ''),
  );
}

export function serializeFilterQuery(query: FilterQuery): string {
  const params = new URLSearchParams();
  Object.entries(query)
    .filter(([, value]) => value.trim() !== '')
    .sort(([a], [b]) => a.localeCompare(b))
    .forEach(([key, value]) => params.set(key, value));
  return params.toString();
}

export function apiQuery(query: FilterQuery, supported: readonly string[]): QueryParams {
  return Object.fromEntries(
    supported
      .filter((key) => query[key])
      .map((key) => [key, query[key]]),
  );
}

function includes(value: string | undefined, needle: string): boolean {
  return !needle || (value || '').toLocaleLowerCase().includes(needle.toLocaleLowerCase());
}

function projectYearMatches(project: ProjectSummary, year: string): boolean {
  if (!year) return true;
  const parsed = Number(year);
  if (!Number.isFinite(parsed)) return true;
  const start = project.startYear || project.endYear;
  const end = project.endYear || project.startYear;
  return Boolean(start && end && parsed >= start && parsed <= end);
}

export function applyProjectFilters(
  collection: ProjectCollection,
  query: FilterQuery,
): ProjectCollection {
  const projects = collection.projects.filter((project) => {
    const client = `${project.clientNameAr} ${project.clientNameEn}`;
    return (
      (!query.category || project.category === query.category) &&
      (!query.sector || project.sectors.includes(query.sector)) &&
      (!query.service || project.services.includes(query.service)) &&
      includes(client, query.client || '') &&
      projectYearMatches(project, query.year || '')
    );
  });
  return {
    projects,
    pagination: {
      ...collection.pagination,
      total: projects.length,
      totalPages: projects.length ? 1 : 0,
      page: 1,
    },
  };
}

export function articleCategories(collection?: ArticleCollection): string[] {
  return [...new Set((collection?.articles || []).map((article) => article.category).filter(Boolean))] as string[];
}
