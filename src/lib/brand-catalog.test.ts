import { beforeEach, describe, expect, it, vi } from 'vitest';
import { catalogQuery, catalogSearch, getBrandPreview, loadBrandCatalog } from './brand-catalog';
import { apiGet, getBrand, getProducts } from './api';

vi.mock('./api', () => ({
  ApiError: class extends Error { constructor(message: string, public status: number) { super(message); } },
  apiGet: vi.fn(), getBrand: vi.fn(), getProducts: vi.fn(),
}));
const brand = { id: 'aaaaaaaaaaaaaaaaaaaaaaaa', slug: 'cnc', name: 'CNC' };
const meta = { total: 25, page: 1, limit: 12, totalPages: 3 };

beforeEach(() => {
  vi.resetAllMocks();
  vi.mocked(getBrand).mockResolvedValue(brand);
  vi.mocked(apiGet).mockResolvedValue([]);
});

describe('brand catalog requests', () => {
  it('keeps the brand fixed and uses API totals rather than the current page length', async () => {
    vi.mocked(getProducts).mockResolvedValue({ data: [{ id: 'product-1', brand }], meta });
    const result = await loadBrandCatalog('cnc', 'ar', new URLSearchParams('brandId=another-brand&search=breaker&page=-2&sortBy=price'));
    expect(getProducts).toHaveBeenCalledWith('ar', expect.objectContaining({ brandId: brand.id, page: 1, limit: 12, search: 'breaker', sortBy: 'createdAt' }));
    expect(result.meta?.total).toBe(25);
    expect(result.products).toHaveLength(1);
  });

  it('rejects an API response containing a different brand', async () => {
    vi.mocked(getProducts).mockResolvedValue({ data: [{ brand: { id: 'bbbbbbbbbbbbbbbbbbbbbbbb' } }], meta });
    const result = await loadBrandCatalog('cnc', 'en', new URLSearchParams());
    expect(result).toMatchObject({ error: true, status: 503, products: [] });
  });

  it('clamps out-of-range pages using the API page count', async () => {
    vi.mocked(getProducts)
      .mockResolvedValueOnce({ data: [], meta: { ...meta, page: 99 } })
      .mockResolvedValueOnce({ data: [{ id: 'last-product' }], meta: { ...meta, page: 3 } });
    const result = await loadBrandCatalog('cnc', 'en', new URLSearchParams('page=99'));
    expect(getProducts).toHaveBeenLastCalledWith('en', expect.objectContaining({ page: 3, brandId: brand.id }));
    expect(result.query.page).toBe(3);
  });

  it('falls back from an empty featured selection without loading the whole catalog', async () => {
    vi.mocked(getProducts)
      .mockResolvedValueOnce({ data: [], meta: { ...meta, total: 0, totalPages: 0 } })
      .mockResolvedValueOnce({ data: [{ id: 'product-1', brand }], meta });
    expect(await getBrandPreview(brand, 'ar')).toHaveLength(1);
    expect(getProducts).toHaveBeenNthCalledWith(1, 'ar', expect.objectContaining({ limit: 6, isFeatured: true, brandId: brand.id }));
    expect(getProducts).toHaveBeenLastCalledWith('ar', expect.objectContaining({ limit: 6, brandId: brand.id }));
  });

  it('preserves search, category and order in page links while rejecting malformed categories', () => {
    const query = catalogQuery(new URLSearchParams('search= LED &categoryId=bbbbbbbbbbbbbbbbbbbbbbbb&sortOrder=asc'));
    const params = new URLSearchParams(catalogSearch(query, 3));
    expect(params.get('search')).toBe('LED');
    expect(params.get('categoryId')).toBe('bbbbbbbbbbbbbbbbbbbbbbbb');
    expect(params.get('sortOrder')).toBe('asc');
    expect(params.get('page')).toBe('3');
    expect(catalogQuery(new URLSearchParams('categoryId=invalid&page=0')).categoryId).toBe('');
  });
});
