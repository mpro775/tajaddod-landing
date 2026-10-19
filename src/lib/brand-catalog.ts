import { ApiError, apiGet, getBrand, getProducts } from './api';
import type { Locale, Pagination, PublicBrand, PublicProductSummary } from './api/types';
import { referenceName } from './product-view';

export interface CatalogQuery { search: string; categoryId: string; sortBy: 'createdAt'; sortOrder: 'asc' | 'desc'; page: number; }
export interface CatalogCategory { id: string; name: string; }
export interface CatalogData {
  brand?: PublicBrand;
  products: PublicProductSummary[];
  meta?: Pagination;
  categories: CatalogCategory[];
  query: CatalogQuery;
  status: number;
  error: boolean;
}
const objectId = /^[a-f\d]{24}$/i;
const record = (value: unknown): Record<string, unknown> => value && typeof value === 'object' ? value as Record<string, unknown> : {};

export function catalogQuery(params: URLSearchParams): CatalogQuery {
  const page = Number(params.get('page'));
  const categoryId = params.get('categoryId') || '';
  return {
    search: (params.get('search') || '').trim().slice(0, 120),
    categoryId: objectId.test(categoryId) ? categoryId : '',
    sortBy: 'createdAt',
    sortOrder: params.get('sortOrder') === 'asc' ? 'asc' : 'desc',
    page: Number.isSafeInteger(page) && page > 0 ? Math.min(page, 10000) : 1,
  };
}

export function catalogSearch(query: CatalogQuery, page = query.page): string {
  const params = new URLSearchParams();
  if (query.search) params.set('search', query.search);
  if (query.categoryId) params.set('categoryId', query.categoryId);
  params.set('sortBy', query.sortBy);
  params.set('sortOrder', query.sortOrder);
  if (page > 1) params.set('page', String(page));
  return params.toString();
}

function checkedCollection(value: unknown, brand: PublicBrand) {
  const source = record(value);
  if (!Array.isArray(source.data)) throw new ApiError('Invalid product response', 503);
  const products = source.data as PublicProductSummary[];
  const brandId = brand.id || brand._id;
  if (products.some((product) => {
    if (!product || typeof product !== 'object') return true;
    const reference = product.brand;
    const id = reference?.id || reference?._id;
    return (id && id !== brandId) || (reference?.slug && reference.slug.toLowerCase() !== brand.slug.toLowerCase());
  })) throw new ApiError('Brand product response mismatch', 503);
  const candidate = record(source.meta);
  const meta = ['total', 'page', 'limit', 'totalPages'].every((key) => Number.isSafeInteger(candidate[key]) && Number(candidate[key]) >= (key === 'page' || key === 'limit' ? 1 : 0))
    ? candidate as unknown as Pagination : undefined;
  return { products, meta };
}

export async function getBrandPreview(brand: PublicBrand, locale: Locale): Promise<PublicProductSummary[]> {
  const brandId = brand.id || brand._id;
  if (!brandId) throw new ApiError('Missing brand identity', 503);
  const query = { brandId, limit: 6, page: 1, sortBy: 'createdAt', sortOrder: 'desc' };
  try {
    const featured = checkedCollection(await getProducts(locale, { ...query, isFeatured: true }), brand);
    if (featured.products.length) return featured.products.slice(0, 6);
  } catch {
    // Featured selection is optional; the same brand's regular catalog remains useful.
  }
  return checkedCollection(await getProducts(locale, query), brand).products.slice(0, 6);
}

async function getCatalogCategories(locale: Locale): Promise<CatalogCategory[]> {
  const response = await apiGet<unknown>('categories/tree', locale);
  const source = Array.isArray(response) ? response : record(response).data;
  const categories = new Map<string, string>();
  function visit(nodes: unknown, depth = 0) {
    if (!Array.isArray(nodes) || depth > 12) return;
    for (const node of nodes) {
      const item = record(node);
      const id = String(item.id || item._id || '');
      const name = referenceName({ name: typeof item.name === 'string' ? item.name : '', nameAr: typeof item.nameAr === 'string' ? item.nameAr : '', nameEn: typeof item.nameEn === 'string' ? item.nameEn : '' }, locale);
      if (objectId.test(id) && name && item.isActive !== false) categories.set(id, name);
      visit(item.children, depth + 1);
    }
  }
  visit(source);
  return [...categories].map(([id, name]) => ({ id, name }));
}

export async function loadBrandCatalog(slug: string, locale: Locale, params: URLSearchParams): Promise<CatalogData> {
  const result: CatalogData = { products: [], categories: [], query: catalogQuery(params), status: 200, error: false };
  try {
    result.brand = await getBrand(slug, locale);
  } catch (cause) {
    result.status = cause instanceof ApiError && cause.status === 404 ? 404 : 503;
    result.error = true;
    return result;
  }
  const brand = result.brand;
  const brandId = brand.id || brand._id;
  if (!brandId) return { ...result, status: 503, error: true };
  const categories = getCatalogCategories(locale).catch(() => []);
  try {
    const fetchPage = (page: number) => getProducts(locale, { ...result.query, page, brandId, limit: 12, includeSubcategories: true });
    let collection = checkedCollection(await fetchPage(result.query.page), brand);
    if (collection.meta && collection.meta.totalPages > 0 && result.query.page > collection.meta.totalPages) {
      collection = checkedCollection(await fetchPage(collection.meta.totalPages), brand);
    }
    result.products = collection.products;
    result.meta = collection.meta;
    if (collection.meta) result.query.page = collection.meta.page;
  } catch {
    result.error = true;
    result.status = 503;
  }
  result.categories = await categories;
  return result;
}
