# Run the isolated demonstration

Requirements: Node 22.19 or newer and npm. Installation uses the committed lockfile and public packages. No account, wallet, API key or private project access is needed.

```sh
npm ci
npm test
npm run markets
npm run appendix
npm run demo
```

The static demo opens at `http://127.0.0.1:5274/demo/`. It makes no external network requests and uses clearly labelled synthetic executions. Buttons illustrate a repeated venue observation through direct and alternate routes. XP issued stays zero.

`npm run markets` is different: it deliberately contacts NADO's public gateway using official SDK constants. It reads available market records and a public quote. A failure returns an error; it never substitutes fixture prices. Values are point-in-time observations, not advice, completed trades or guarantees.

`npm run appendix` uses offline SDK packing with unassigned configuration placeholders and a no-builder/no-fee fixture. It does not construct a full order or invoke any execution method.

TypeScript uses ES modules with Bundler type resolution to match the SDK declaration conventions. Emitted local imports retain `.js` extensions and run directly in Node. No private SDK wrapper is imported.

The tests cover query-only exposure, bounded formatting, unavailable upstream behavior, builder bounds, SDK bit packing, route-independent duplication, distinct executions and rejected unconfirmed/owner-mismatched synthetic inputs. Generated `dist/` and dependency directories are local build outputs, excluded from the repository.

The lockfile uses explicit same-major overrides for Axios and WebSocket dependencies to remove registry-reported advisories without downgrading the official SDK. Review and rerun tests/public queries when updating these pins. The demonstration server binds only to loopback, restricts paths to the demo/assets, and blocks script-initiated external connections using its Content Security Policy. Following an explicit external link leaves the local demonstration.
