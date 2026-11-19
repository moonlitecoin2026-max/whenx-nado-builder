# Publication privacy and demonstration review

Review date: **19 November 2026**. Scope: every file in this independent candidate, its image metadata, dependencies and fresh Git history. This review does not certify the complete WHENX protocol or smart contracts.

## Reviewed controls

- Exact file allowlist, including hidden files; no source repository copy, backups, build output, dependency directory, database, environment file, source map or workflow configuration in the export.
- Automated secret-pattern and privacy checks, followed by manual inspection of the demonstration source, documentation, screenshots and diagrams.
- Gitleaks 8.30.1, obtained from its official release with matching published SHA-256, scans the exact export and the fresh commit history with redacted findings.
- Image metadata checked; personal/operational identities, account balances, private URLs and credentials absent from the selected captures. Only already public project branding/product artwork previews are included.
- Lockfile package origins restricted to the public npm registry. Transitive dependency advisories were resolved with same-major Axios/WebSocket updates and repeated SDK/build/tests. `npm audit --omit=dev` reported zero advisories at review time.
- Original source history and operational configuration excluded. The root commit uses **WHENX Protocol** and the owning GitHub account's supported noreply email; no personal author name/email is used.
- MIT applies only to the new demonstration code. Branding, screenshots and original NFT artwork are excluded from that licence.

**Publication assessment:** suitable for owner review, with zero unresolved high-risk findings in the reviewed candidate. Secret scanning cannot mathematically prove the absence of all sensitive information; the allowlist, metadata review and manual review are complementary controls.

The owning GitHub username remains visible if this repository becomes public. The project has not created a separate account or organization. Public visibility and application submission remain approval gates; passing this review does not grant either approval.

See [complete file list](docs/PUBLIC_FILES.md), [validation results](docs/validation.json), [claim evidence](docs/evidence.md) and [screenshot register](docs/screenshots.md).
