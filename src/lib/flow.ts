export const MARKET_FLOW_MODEL = {
  id: 'brands-tajaddod-market-audiences',
  order: ['source', 'hub', 'destination', 'audiences'],
} as const;

export type MarketFlowRole = (typeof MARKET_FLOW_MODEL.order)[number];

export function nextFlowRole(role: MarketFlowRole): MarketFlowRole | null {
  const index = MARKET_FLOW_MODEL.order.indexOf(role);
  return MARKET_FLOW_MODEL.order[index + 1] ?? null;
}
