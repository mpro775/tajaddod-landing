import type {
  ArticleDetail,
  ArticleSummary,
  LandingProduct,
  PublicProductSummary,
  Locale,
  ProjectDetail,
  ProjectSummary,
  PublicBrand,
} from '../api/types';
import { categoryLabels } from '../../i18n';
import { adaptArticle } from '../adapters/article.adapter';
import { adaptProduct, adaptPublicProduct } from '../adapters/product.adapter';
import { adaptProject, formatProjectPeriod } from '../adapters/project.adapter';

export const DEFAULT_PROJECT_IMAGE = '/assets/projects/project.webp';
export const DEFAULT_NEWS_IMAGE = '/assets/news/news.webp';

const brandProfiles = {
  cnc: {
    id: 'cnc',
    slug: 'cnc',
    displayName: 'CNC',
    arabicName: 'سي إن سي',
    logo: '/logos/cnc-logo.svg',
    whiteLogo: '/logos/cnc-logo-white.svg',
    accent: 'cnc',
    officialWebsite: 'https://www.cncele.com/',
    ar: {
      title: 'قواطع، حماية، تحكم صناعي، تحويل، وDC للطاقة الشمسية',
      description: 'CNC يمثل العمود الفني في تجدد: حماية كهربائية، لوحات، مؤقتات، تحكم صناعي، سكاكين تحويل، وحلول DC للمنظومات الشمسية.',
      focus: 'الحماية والتحكم والتوزيع',
      orbit: 'قلب الأمان الكهربائي',
      categories: ['قواطع', 'حماية', 'تحكم صناعي', 'مؤقتات', 'سكاكين تحويل', 'طبالين', 'DC Solar'],
      story: 'CNC يظهر كخط الدفاع والتنظيم داخل المنظومة الكهربائية؛ من حماية المنزل والمتجر إلى تجهيز لوحات المشاريع وحلول التحويل والطاقة الشمسية.',
      country: 'الصين',
      category: 'الحماية والتحكم الكهربائي',
      heroTitle: 'CNC — حلول الحماية والتحكم والتوزيع',
      shortDescription: 'علامة تجارية رائدة عالمياً في توفير حلول الحماية الكهربائية المتطورة، والتحكم الصناعي، والتوزيع الكهربائي الموثوق.',
      longDescription: 'تعتبر CNC من العلامات التجارية البارزة التي تقدم مجموعة واسعة من المنتجات المبتكرة وعالية الجودة في مجال الحماية والتحكم الكهربائي. تتميز منتجاتها بالموثوقية العالية والأداء الاستثنائي، مما يجعلها الخيار الأمثل للمقاولين والمهندسين.',
      representedBy: 'تجدد',
      specialties: ['القواطع الكهربائية', 'التحكم الصناعي', 'مكونات الطاقة الشمسية (DC)', 'سكاكين التحويل'],
      productFamilies: ['قواطع MCB & MCCB', 'كونتاكتورات', 'ريليهات', 'صناديق التوزيع'],
      applications: ['المشاريع السكنية', 'المصانع والورش', 'المرافق التجارية', 'منظومات الطاقة الشمسية'],
    },
    en: {
      title: 'Breakers, protection, industrial control, transfer and solar DC solutions',
      description: 'CNC is the technical backbone of Tajaddod: electrical protection, panels, timers, industrial control, transfer switching and DC solutions for solar systems.',
      focus: 'Protection, control and distribution',
      orbit: 'The core of electrical safety',
      categories: ['Breakers', 'Protection', 'Industrial control', 'Timers', 'Transfer switches', 'Distribution', 'Solar DC'],
      story: 'CNC forms the protection and control layer across residential, commercial and project electrical systems, from final circuits to distribution boards and solar DC protection.',
      country: 'China',
      category: 'Electrical Protection & Control',
      heroTitle: 'CNC — Protection, Control & Distribution',
      shortDescription: 'A globally established brand delivering dependable electrical protection, industrial control and distribution solutions.',
      longDescription: 'CNC provides a broad portfolio of dependable electrical protection and control products for contractors, engineers and projects, combining wide application coverage with proven performance.',
      representedBy: 'Tajaddod',
      specialties: ['Circuit breakers', 'Industrial control', 'Solar DC components', 'Transfer switches'],
      productFamilies: ['MCB & MCCB breakers', 'Contactors', 'Relays', 'Distribution boxes'],
      applications: ['Residential projects', 'Factories and workshops', 'Commercial facilities', 'Solar energy systems'],
    },
  },
  liper: {
    id: 'liper',
    slug: 'liper',
    displayName: 'Liper',
    arabicName: 'لايبر',
    logo: '/logos/liper-logo.svg',
    whiteLogo: '/logos/liper-logo-white.svg',
    accent: 'liper',
    officialWebsite: 'https://www.liper.com/',
    ar: {
      title: 'إضاءة داخلية وخارجية وكشافات شمسية للمشاريع',
      description: 'Liper يمثل جانب الإضاءة والطاقة الخارجية في تجدد: إنارة ديكورية، إنارة أحواش، كشافات شوارع، وحلول Solar Lighting.',
      focus: 'الإضاءة والطاقة الشمسية الخارجية',
      orbit: 'الضوء الذي يكتمل به المشروع',
      categories: ['إضاءة داخلية', 'إضاءة خارجية', 'كشافات شوارع', 'Solar Lighting', 'IP65'],
      story: 'Liper هو وجه الإضاءة في تجربة تجدد؛ يربط بين الإنارة الجمالية والاستخدام الخارجي وحلول الإضاءة الشمسية للمزارع والشوارع والمساحات المفتوحة.',
      country: 'ألمانيا / الصين',
      category: 'حلول الإضاءة',
      heroTitle: 'Liper — حلول الإضاءة المبتكرة',
      shortDescription: 'خيارك الأول لجميع حلول الإضاءة الداخلية والخارجية الموفرة للطاقة ذات التصاميم العصرية والجودة الألمانية.',
      longDescription: 'تقدم Liper تشكيلة متكاملة من حلول الإضاءة التي تجمع بين الجودة العالية، كفاءة استهلاك الطاقة، والتصاميم المبتكرة. سواء كنت تبحث عن إضاءة داخلية، أو حلول إضاءة خارجية وإضاءة شوارع بتقنية الطاقة الشمسية.',
      representedBy: 'تجدد',
      specialties: ['الإضاءة الداخلية', 'الإضاءة الخارجية', 'إضاءة الشوارع (Solar)', 'كشافات واجهات'],
      productFamilies: ['لمبات LED', 'كشافات بانل', 'كشافات شوارع', 'إنارة الحدائق'],
      applications: ['المنازل', 'المكاتب والمباني التجارية', 'الشوارع والساحات', 'الحدائق والمزارع'],
    },
    en: {
      title: 'Indoor, outdoor and solar lighting solutions for projects',
      description: 'Liper represents the lighting side of Tajaddod: architectural lighting, outdoor luminaires, street lights and solar lighting solutions.',
      focus: 'Lighting and outdoor solar solutions',
      orbit: 'The light that completes the project',
      categories: ['Indoor lighting', 'Outdoor lighting', 'Street lighting', 'Solar lighting', 'IP65'],
      story: 'Liper brings the lighting experience together across interiors, façades, streets, farms and open spaces with efficient and practical lighting solutions.',
      country: 'Germany / China',
      category: 'Lighting Solutions',
      heroTitle: 'Liper — Innovative Lighting Solutions',
      shortDescription: 'A comprehensive choice for efficient indoor and outdoor lighting with modern design and dependable quality.',
      longDescription: 'Liper offers an integrated range of lighting solutions combining quality, energy efficiency and modern design, from interior applications to outdoor and solar street lighting.',
      representedBy: 'Tajaddod',
      specialties: ['Indoor lighting', 'Outdoor lighting', 'Solar street lighting', 'Façade floodlights'],
      productFamilies: ['LED lamps', 'Panel lights', 'Street lights', 'Garden lighting'],
      applications: ['Homes', 'Offices and commercial buildings', 'Streets and public spaces', 'Gardens and farms'],
    },
  },
} as const;

export type VisualBrand = ReturnType<typeof toVisualBrand>;

export function toVisualBrand(brand: PublicBrand | undefined, slug: string, locale: Locale) {
  const key = (slug.toLowerCase() === 'liper' ? 'liper' : 'cnc') as keyof typeof brandProfiles;
  const profile = brandProfiles[key];
  const lang = profile[locale];
  const apiName = locale === 'en'
    ? brand?.nameEn || brand?.name || brand?.nameAr
    : brand?.nameAr || brand?.name || brand?.nameEn;
  const apiDescription = locale === 'en'
    ? brand?.descriptionEn || brand?.description || brand?.descriptionAr
    : brand?.descriptionAr || brand?.description || brand?.descriptionEn;

  return {
    id: profile.id,
    slug: brand?.slug || profile.slug,
    name: apiName || profile.displayName,
    displayName: apiName || profile.displayName,
    arabicName: profile.arabicName,
    title: lang.title,
    description: apiDescription || lang.description,
    logo: brand?.image || brand?.logoUrl || profile.logo,
    whiteLogo: profile.whiteLogo,
    accent: profile.accent,
    focus: lang.focus,
    orbit: lang.orbit,
    categories: [...lang.categories],
    story: lang.story,
    officialWebsite: brand?.website || profile.officialWebsite,
    country: lang.country,
    category: lang.category,
    heroTitle: lang.heroTitle,
    shortDescription: apiDescription || lang.shortDescription,
    longDescription: apiDescription || lang.longDescription,
    representedBy: lang.representedBy,
    specialties: [...lang.specialties],
    productFamilies: [...lang.productFamilies],
    applications: [...lang.applications],
    products: [],
  };
}

export function toVisualBrands(brands: PublicBrand[], locale: Locale) {
  const source = new Map(brands.map((brand) => [brand.slug.toLowerCase(), brand]));
  return ['cnc', 'liper'].map((slug) => toVisualBrand(source.get(slug), slug, locale));
}

export function toLegacyProject(project: ProjectSummary | ProjectDetail, locale: Locale) {
  const adapted = adaptProject(project, locale);
  const category = categoryLabels[locale][project.category] || project.category;
  const detail = project as ProjectDetail;
  const status = project.status === 'completed'
    ? (locale === 'en' ? 'Completed' : 'منجز')
    : project.status === 'in_progress'
      ? (locale === 'en' ? 'In progress' : 'قيد التنفيذ')
      : (locale === 'en' ? 'Planned' : 'مخطط');

  return {
    ...project,
    title: adapted.title,
    category,
    location: adapted.location || (locale === 'en' ? 'Yemen' : 'اليمن'),
    year: formatProjectPeriod(project, locale),
    status,
    coverImage: project.cover?.url || DEFAULT_PROJECT_IMAGE,
    summary: adapted.shortDescription,
    description: adapted.description,
    challenge: locale === 'en' ? detail.challengeEn || detail.challengeAr : detail.challengeAr || detail.challengeEn,
    solution: locale === 'en' ? detail.solutionEn || detail.solutionAr : detail.solutionAr || detail.solutionEn,
    scope: locale === 'en' ? detail.scopeEn || [] : detail.scopeAr || [],
    results: locale === 'en' ? detail.resultsEn || detail.resultsAr : detail.resultsAr || detail.resultsEn,
    stats: (project.metrics || []).map((metric) => ({
      label: locale === 'en' ? metric.labelEn || metric.labelAr : metric.labelAr || metric.labelEn,
      value: metric.value,
    })),
    gallery: (detail.gallery || []).map((media) => media.url),
    brands: [] as string[],
  };
}

export function toLegacyArticle(article: ArticleSummary | ArticleDetail, locale: Locale) {
  const adapted = adaptArticle(article, locale);
  const detail = article as ArticleDetail;
  return {
    ...article,
    title: adapted.title,
    excerpt: adapted.excerpt,
    category: article.category || (article.type === 'news' ? (locale === 'en' ? 'Company news' : 'أخبار الشركة') : article.type),
    date: article.publishDate || '',
    coverImage: article.cover?.url || DEFAULT_NEWS_IMAGE,
    author: article.authorName || (locale === 'en' ? 'Tajaddod Team' : 'فريق تجدد'),
    gallery: (detail.gallery || []).map((media) => media.url),
    contentSource: locale === 'en' ? detail.contentEn || detail.contentAr || '' : detail.contentAr || detail.contentEn || '',
  };
}

export function toLegacyProduct(product: LandingProduct | PublicProductSummary, locale: Locale) {
  const isLanding = 'landingOrder' in product;
  const adapted = isLanding
    ? adaptProduct(product as LandingProduct, locale)
    : adaptPublicProduct(product as PublicProductSummary, locale);
  const mainImage = product.mainImage;
  return {
    slug: product.slug || product.id || (product as any)._id,
    name: adapted.name,
    description: adapted.description,
    image: typeof mainImage === 'string' ? mainImage : mainImage?.url || '/assets/projects/project.webp',
    category: product.category
      ? (locale === 'en' ? product.category.nameEn || product.category.nameAr : product.category.nameAr || product.category.nameEn)
      : (locale === 'en' ? 'Products' : 'منتجات'),
    type: product.brand
      ? (locale === 'en' ? product.brand.nameEn || product.brand.nameAr : product.brand.nameAr || product.brand.nameEn)
      : '',
    badges: [],
    warrantyYears: 'warrantyDurationYears' in product ? product.warrantyDurationYears : undefined,
  };
}
