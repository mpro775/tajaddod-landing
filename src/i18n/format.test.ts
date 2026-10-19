import { describe, expect, it } from 'vitest';
import { formatWarrantyDuration } from './format';

describe('product warranty duration', () => {
  it.each([
    [1, 'ضمان لمدة سنة'], [2, 'ضمان لمدة سنتين'], [3, 'ضمان لمدة 3 سنوات'],
    [5, 'ضمان لمدة 5 سنوات'], [10, 'ضمان لمدة 10 سنوات'], [11, 'ضمان لمدة 11 سنة'],
    [21, 'ضمان لمدة 21 سنة'], [25, 'ضمان لمدة 25 سنة'], [100, 'ضمان لمدة 100 سنة'],
    [103, 'ضمان لمدة 103 سنوات'],
  ] as const)('formats %s years in Arabic', (years, expected) => {
    expect(formatWarrantyDuration(years, 'ar')).toBe(expected);
    expect(formatWarrantyDuration(years, 'en')).toBe(`${years}-year warranty`);
  });
  it.each([undefined, null, 0, -1, NaN, Infinity, 2.5])('omits invalid duration %s', (years) => {
    expect(formatWarrantyDuration(years, 'ar')).toBeNull();
    expect(formatWarrantyDuration(years, 'en')).toBeNull();
  });
});
