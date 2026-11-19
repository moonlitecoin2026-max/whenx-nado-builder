import { WHENX_BUILDER_CONFIGURATION, encodeBuilderFixture } from './appendix.js';
console.log(JSON.stringify({ configuration: WHENX_BUILDER_CONFIGURATION,
  noBuilderFixture: encodeBuilderFixture(0, 0),
  note: 'No WHENX Builder ID or fee is assumed. This is offline encoding, not an order.' },
  (_, value) => typeof value === 'bigint' ? value.toString() : value, 2));
