import { describe, expect, it } from 'vitest';
import { MARKET_FLOW_MODEL, nextFlowRole } from './flow';

describe('MarketRole semantic flow', () => {
  it('keeps the business sequence independent from text direction', () => {
    expect(MARKET_FLOW_MODEL.order).toEqual([
      'source',
      'hub',
      'destination',
      'audiences',
    ]);
  });

  it('advances through the semantic sequence without physical direction assumptions', () => {
    expect(nextFlowRole('source')).toBe('hub');
    expect(nextFlowRole('hub')).toBe('destination');
    expect(nextFlowRole('destination')).toBe('audiences');
    expect(nextFlowRole('audiences')).toBeNull();
  });
});
