import { describe, expect, it } from 'vitest';
import { documentDirection, fromInlineEnd, fromInlineStart } from './direction';

describe('direction helpers', () => {
  it('resolves explicit document directions and defaults to ltr', () => {
    expect(documentDirection({ dir: 'rtl' } as HTMLElement)).toBe('rtl');
    expect(documentDirection({ dir: 'ltr' } as HTMLElement)).toBe('ltr');
    expect(documentDirection({ dir: '' } as HTMLElement)).toBe('ltr');
  });

  it('mirrors inline-start and inline-end motion', () => {
    expect(fromInlineStart(24, 'ltr')).toBe(-24);
    expect(fromInlineStart(24, 'rtl')).toBe(24);
    expect(fromInlineEnd(24, 'ltr')).toBe(24);
    expect(fromInlineEnd(24, 'rtl')).toBe(-24);
  });
});
