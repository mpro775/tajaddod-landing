import type { Locale, ProjectSummary } from '../api/types';

function localizedValue(
  source: Record<string, unknown>,
  field: string,
  locale: Locale,
): string {
  const preferred = source[`${field}${locale === 'en' ? 'En' : 'Ar'}`];
  const alternate = source[`${field}${locale === 'en' ? 'Ar' : 'En'}`];
  return typeof preferred === 'string' && preferred.trim()
    ? preferred
    : typeof alternate === 'string'
      ? alternate
      : '';
}

export function formatProjectPeriod(project: ProjectSummary, locale: Locale): string {
  const custom =
    locale === 'en'
      ? project.periodLabelEn || project.periodLabelAr
      : project.periodLabelAr || project.periodLabelEn;
  if (custom) return custom;
  if (project.periodType === 'lta') return locale === 'en' ? 'Long-Term Agreement (LTA)' : 'اتفاقية طويلة الأجل (LTA)';
  if (project.periodType === 'ongoing') return locale === 'en' ? 'Ongoing' : 'مستمر';
  if (project.periodType === 'unknown') return locale === 'en' ? 'Not specified' : 'غير محدد';
  if (project.startYear && project.endYear && project.startYear !== project.endYear) {
    return `${project.startYear}–${project.endYear}`;
  }
  return String(project.startYear || project.endYear || '');
}

export function adaptProject(project: ProjectSummary, locale: Locale) {
  const source = project as unknown as Record<string, unknown>;
  return {
    ...project,
    title: localizedValue(source, 'title', locale),
    shortDescription: localizedValue(source, 'shortDescription', locale),
    description: localizedValue(source, 'description', locale),
    clientName: localizedValue(source, 'clientName', locale),
    location: localizedValue(source, 'location', locale),
    period: formatProjectPeriod(project, locale),
  };
}
