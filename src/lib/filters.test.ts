import { describe, expect, it } from 'vitest';
import { apiQuery, parseFilterQuery, serializeFilterQuery } from './filters';

describe('URL filter helpers', () => {
  it('parses only allowed non-empty values', () => {
    const params = new URLSearchParams('search=solar&year=2025&ignored=1&sector=');
    expect(parseFilterQuery(params, ['search', 'year', 'sector'])).toEqual({
      search: 'solar',
      year: '2025',
    });
  });

  it('serializes deterministically for shareable URLs', () => {
    expect(serializeFilterQuery({ year: '2025', search: 'solar', empty: '' })).toBe(
      'search=solar&year=2025',
    );
  });

  it('forwards only backend-supported query keys', () => {
    expect(apiQuery({ search: 'solar', category: 'lighting', year: '2025' }, ['search', 'category']))
      .toEqual({ search: 'solar', category: 'lighting' });
  });
});
