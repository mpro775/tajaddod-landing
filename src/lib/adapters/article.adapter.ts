import type { ArticleSummary, Locale } from '../api/types';

export function adaptArticle(article: ArticleSummary, locale: Locale) {
  const isEnglish = locale === 'en';
  return {
    ...article,
    title: isEnglish
      ? article.titleEn || article.titleAr
      : article.titleAr || article.titleEn,
    excerpt: isEnglish
      ? article.excerptEn || article.excerptAr || ''
      : article.excerptAr || article.excerptEn || '',
  };
}
