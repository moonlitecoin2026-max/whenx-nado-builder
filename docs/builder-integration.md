# Registered builder integration

WHENX is requesting registration. No WHENX Builder ID or fee rate has been issued or assumed by this package. ID 900 is not treated as WHENX attribution; existing third-party attribution must remain intact.

The official mechanism associates builder information with an order appendix. The builder field is 16 bits; the fee field is 10 bits in units of 0.1 basis points. Registration and the builder's permitted fee bounds are external prerequisites. See the [official integration guide](https://docs.nado.xyz/developer-resources/api/builder-integration).

## Demonstration

The code calls the public SDK's `packOrderAppendix` and `unpackOrderAppendix`. The default fixture uses no builder and no fee. Boundary-value tests are synthetic offline inputs, not WHENX registrations. No order, signature or network submission is produced.

Configuration placeholders:

```text
WHENX_BUILDER_ID
WHENX_BUILDER_FEE_RATE
```

We need confirmation of registration/owner association, accepted fee bounds, current quote denomination, claiming/deposit requirements and permitted attribution before enabling a product order path. Current NADO documentation describes quote and claiming details with terminology that should be reconfirmed during registration; no fee claim or funding is part of this showcase.

## Rollout boundary

Register → validate assigned configuration → test attributed fixtures/integration → review the exact production flow → separately approve activation. Public read-only access does not imply trading, builder revenue or fee distribution is active. Potential builder revenue is not automatically part of existing Mint/Fusion allocation rules.

References: [TypeScript SDK](https://nadohq.github.io/nado-typescript-sdk/), [Python builder reference](https://nadohq.github.io/nado-python-sdk/builder-integration.html).
