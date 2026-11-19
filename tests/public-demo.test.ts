import test from 'node:test';
import assert from 'node:assert/strict';
import { createPublicMarketReader, inspectPublicMarkets } from '../examples/public-market-data/reader.js';
import { describeFeeUnits, encodeBuilderFixture, WHENX_BUILDER_CONFIGURATION } from '../examples/builder-appendix/appendix.js';
import { DemoObservationSet, inspectFixture, SYNTHETIC_EXECUTION } from '../examples/activity-deduplication/activity.js';

test('public reader exposes queries without signer or execution methods', () => {
  const reader = createPublicMarketReader();
  assert.deepEqual(Object.keys(reader).sort(), ['markets', 'quote']);
  assert(Object.isFrozen(reader));
});
test('market formatting uses labelled public observations and bounds the output', async () => {
  const reader = { markets: async () => Array.from({ length: 8 }, (_, productId) => ({ productId, type: 1, oraclePrice: '10' })),
    quote: async (productId: number) => ({ productId, bid: '9', ask: '11' }) };
  const result = await inspectPublicMarkets(reader, 2);
  assert.equal(result.markets.length, 2); assert.equal(result.totalMarketRecords, 8);
  assert.match(result.scope, /Not a trade/); assert.equal(result.quote.productId, 2);
  await assert.rejects(inspectPublicMarkets(reader, 0));
  await assert.rejects(inspectPublicMarkets(reader, 21));
});
test('public reader rejects invalid product IDs before a network request', async () => {
  await assert.rejects(createPublicMarketReader().quote(-1));
  await assert.rejects(createPublicMarketReader().quote(1.5));
});
test('upstream failure is not replaced by mock market data', async () => {
  await assert.rejects(inspectPublicMarkets({ markets: async () => { throw Error('offline'); }, quote: async () => { throw Error('must not run'); } }));
});
test('no registered WHENX builder is invented', () => {
  assert.equal(WHENX_BUILDER_CONFIGURATION.id, 'WHENX_BUILDER_ID');
  assert.equal(WHENX_BUILDER_CONFIGURATION.feeRate, 'WHENX_BUILDER_FEE_RATE');
  assert.equal(encodeBuilderFixture(0, 0).decoded.builder, undefined);
  assert.throws(() => encodeBuilderFixture(0, 1));
});
test('official SDK preserves offline builder field bit boundaries', () => {
  // Boundary values are synthetic test inputs, not assigned WHENX registrations.
  const fixture = encodeBuilderFixture(65535, 1023);
  assert.equal(fixture.fixtureOnly, true);
  assert.deepEqual(fixture.decoded.builder, { builderId: 65535, builderFeeRate: 1023 });
  assert.equal((fixture.appendix >> 48n) & 65535n, 65535n);
  assert.equal((fixture.appendix >> 38n) & 1023n, 1023n);
  assert.equal(fixture.decoded.orderExecutionType, 'default');
});
test('builder fixture bounds and integer fees are enforced', () => {
  for (const [id, fee] of [[-1, 0], [65536, 0], [1, -1], [1, 1024], [1.2, 1], [1, 0.1]]) assert.throws(() => encodeBuilderFixture(id, fee));
  assert.deepEqual(describeFeeUnits(10), { basisPoints: 1, percent: 0.01 });
});
test('one venue execution remains one observation across interface routes', () => {
  const store = new DemoObservationSet();
  assert.equal(store.observe(SYNTHETIC_EXECUTION).duplicate, false);
  const duplicate = store.observe({ ...SYNTHETIC_EXECUTION, provenance: 'Otomate route' });
  assert.equal(duplicate.duplicate, true); assert.equal(duplicate.observations, 1);
  assert.equal(duplicate.provenance.length, 2); assert.equal(duplicate.xpIssued, 0);
});
test('replayed and distinct executions are handled separately', () => {
  const store = new DemoObservationSet(); store.observe(SYNTHETIC_EXECUTION);
  assert.equal(store.observe(SYNTHETIC_EXECUTION).duplicate, true);
  assert.equal(store.observe({ ...SYNTHETIC_EXECUTION, executionReference: 'fixture:nado:execution:002' }).observations, 2);
});
test('owner mismatch and unconfirmed or unlabeled fixtures are rejected', () => {
  assert.throws(() => inspectFixture({ ...SYNTHETIC_EXECUTION, expectedOwner: 'other-demo-owner' }));
  assert.throws(() => inspectFixture({ ...SYNTHETIC_EXECUTION, confirmed: false }));
  assert.throws(() => inspectFixture({ ...SYNTHETIC_EXECUTION, executionReference: 'production-reference' }));
});
