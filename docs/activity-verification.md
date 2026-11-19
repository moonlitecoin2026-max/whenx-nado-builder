# From a fill to eligible activity

NADO API and indexer responses are useful discovery inputs. Production eligibility requires independent evidence checks, owner/subaccount association, source validity and finality. Repeated observations must not create repeated credits. Verification and policy eligibility are distinct decisions.

## Public fixture

`examples/activity-deduplication/activity.ts` demonstrates a narrow interface:

1. A clearly labelled synthetic execution carries a venue-level reference.
2. The sample rejects an unconfirmed fixture or an owner mismatch.
3. Re-observing the reference through another route adds provenance, not another economic observation.
4. The example always issues zero XP.

The owner string comparison illustrates binding only. It does not authenticate a wallet, receipt, order, fill or proof. A production reader must supply independently authenticated evidence; that implementation is not exported.

## Cross-route provenance

A direct NADO interface and an Otomate-originated route can expose the same underlying venue execution. Route labels do not establish separate economic actions. The conceptual invariant is **one verified venue execution → one canonical economic identity → at most one eligible credit** under the approved policy.

## Not public eligibility

Quests, token purchases and NADO history are not currently a promise of XP. Holding, minting or staking alone does not constitute verified activity. No historical action is made eligible simply by showing it in a preview. This showcase contains no reward signer, production policy thresholds or admission configuration.
