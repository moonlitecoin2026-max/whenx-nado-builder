import { EngineClient, ENGINE_CLIENT_ENDPOINTS } from '@nadohq/engine-client';

/** Deliberately narrow interface: the examples cannot submit an order. */
export interface PublicMarketReader {
  markets(): Promise<readonly { productId: number; type: number; oraclePrice: string }[]>;
  quote(productId: number): Promise<{ productId: number; bid: string; ask: string }>;
}

export function createPublicMarketReader(): PublicMarketReader {
  // The official SDK accepts an absent wallet client for public queries.
  const engine = new EngineClient({ url: ENGINE_CLIENT_ENDPOINTS.inkMainnet });
  return Object.freeze({
    async markets() {
      const rows = await engine.getAllMarkets();
      return rows.map(row => ({ productId: row.productId, type: row.type, oraclePrice: row.product.oraclePrice.toString() }));
    },
    async quote(productId: number) {
      if (!Number.isSafeInteger(productId) || productId < 0) throw Error('Invalid product ID');
      const quote = await engine.getMarketPrice({ productId });
      return { productId: quote.productId, bid: quote.bid.toString(), ask: quote.ask.toString() };
    },
  });
}

export async function inspectPublicMarkets(reader: PublicMarketReader, limit = 5) {
  if (!Number.isSafeInteger(limit) || limit < 1 || limit > 20) throw Error('Limit must be 1–20');
  const markets = await reader.markets();
  return { source: 'NADO official SDK / public query', observedAt: new Date().toISOString(),
    totalMarketRecords: markets.length, markets: markets.slice(0, limit),
    quote: await reader.quote(2),
    scope: 'Read-only observation. Not a trade, verified fill, forecast or XP award.' };
}
