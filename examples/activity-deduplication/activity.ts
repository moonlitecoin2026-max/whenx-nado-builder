/** Public synthetic contract for the demo; not the production verification engine. */
export interface ExecutionFixture {
  fixture: true;
  venue: 'NADO';
  executionReference: string;
  subaccountOwner: string;
  expectedOwner: string;
  confirmed: boolean;
  provenance: 'Direct interface' | 'Otomate route';
}

export function inspectFixture(f: ExecutionFixture) {
  if (f.fixture !== true || f.venue !== 'NADO') throw Error('Synthetic NADO fixture required');
  if (!/^fixture:[a-z0-9:-]{1,100}$/.test(f.executionReference)) throw Error('Invalid synthetic reference');
  if (!f.confirmed) throw Error('Unconfirmed fixture');
  // A string match illustrates ownership binding; it does not authenticate a real receipt or wallet.
  if (!f.subaccountOwner || f.subaccountOwner.toLowerCase() !== f.expectedOwner.toLowerCase()) throw Error('Owner mismatch');
  return { canonicalReference: f.executionReference, provenance: f.provenance,
    status: 'Synthetic demonstration only; not production eligibility' as const };
}

export class DemoObservationSet {
  private readonly observations = new Map<string, Set<string>>();
  observe(f: ExecutionFixture) {
    const checked = inspectFixture(f);
    const existing = this.observations.get(checked.canonicalReference);
    if (existing) {
      existing.add(checked.provenance);
      return { duplicate: true, observations: this.observations.size, provenance: [...existing], xpIssued: 0 };
    }
    this.observations.set(checked.canonicalReference, new Set([checked.provenance]));
    return { duplicate: false, observations: this.observations.size, provenance: [checked.provenance], xpIssued: 0 };
  }
}

export const SYNTHETIC_EXECUTION: ExecutionFixture = Object.freeze({ fixture: true, venue: 'NADO',
  executionReference: 'fixture:nado:execution:001', subaccountOwner: 'demo-owner', expectedOwner: 'demo-owner',
  confirmed: true, provenance: 'Direct interface' });
