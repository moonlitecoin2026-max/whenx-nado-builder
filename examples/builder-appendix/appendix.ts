import { packOrderAppendix, unpackOrderAppendix } from '@nadohq/shared';

export const WHENX_BUILDER_CONFIGURATION = Object.freeze({
  id: 'WHENX_BUILDER_ID', feeRate: 'WHENX_BUILDER_FEE_RATE', status: 'Registration and fee approval pending',
});

/** Offline fixture encoding only. There is no order, account, signer or submission path. */
export function encodeBuilderFixture(builderId: number, feeRateUnits: number) {
  if (!Number.isSafeInteger(builderId) || builderId < 0 || builderId > 65535) throw Error('Invalid builder ID');
  if (!Number.isSafeInteger(feeRateUnits) || feeRateUnits < 0 || feeRateUnits > 1023) throw Error('Invalid fee units');
  if (builderId === 0 && feeRateUnits !== 0) throw Error('No fee without a registered builder');
  const appendix = packOrderAppendix({ orderExecutionType: 'default',
    ...(builderId === 0 ? {} : { builder: { builderId, builderFeeRate: feeRateUnits } }) });
  return { fixtureOnly: true as const, appendix, decoded: unpackOrderAppendix(appendix) };
}

export function describeFeeUnits(units: number) {
  if (!Number.isSafeInteger(units) || units < 0 || units > 1023) throw Error('Invalid fee units');
  return { basisPoints: units / 10, percent: units / 1000 };
}
