import { createPublicMarketReader, inspectPublicMarkets } from './reader.js';
try {
  const result = await inspectPublicMarkets(createPublicMarketReader());
  console.log(JSON.stringify(result, null, 2));
} catch {
  console.error('Public NADO query unavailable. No fallback prices, wallet request or transaction was created.');
  process.exitCode = 1;
}
