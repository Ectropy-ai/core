# Ectropy Core

**Construction intelligence primitives. Apache-2.0.**

Ectropy Core is a pnpm monorepo of standalone, open-core building
blocks for construction decision intelligence — schema-first types,
multi-tenant RLS enforcement, AI provider abstraction, BIM
federation, IFC parsing, clash detection, and MCP client
connectivity.

Each package is intentionally minimal and independently consumable:
no shared runtime, no framework lock-in. The intent is that tenant
data stays permanently readable by any LLM via
[MCP](https://modelcontextprotocol.io), independent of any single
vendor — but that is the design goal these primitives serve, not a
claim that a specific downstream service currently imports them (see
Status below).

## Status

- Tagged release: `v0.1.0` (single tag; all 7 packages at `0.1.0`).
- Workspace: pnpm 9.15.9, Node >= 20, TypeScript strict, `pnpm -r typecheck` / `pnpm -r lint` at the root.
- Maturity varies by package: `rls` and `clash` have working implementations and tests; `federation` and `mcp-client` are single-file primitives; `ifc` and `ai-provider` have the most built out (multi-file, with tests).
- Packages ship TypeScript source, not compiled output. A compiled npm release is planned; until then the GitHub-pin install below suits development, not production builds.

## Packages

| Package | Directory | Description |
|---------|-----------|--------------|
| `@ectropy/rls` | `packages/rls` | PostgreSQL Row-Level Security tenant context primitives |
| `@ectropy/federation` | `packages/federation` | BIM model federation primitive |
| `@ectropy/ifc` | `packages/ifc` | IFC file parser primitive |
| `@ectropy/mcp-client` | `packages/mcp-client` | MCP server client |
| `@ectropy/sdk` | `packages/sdk-javascript` | Official JavaScript/TypeScript SDK |
| `@ectropy/ai-provider` | `packages/ai-provider` | AI provider abstraction and factory (Anthropic / Ollama) |
| `@ectropy/clash` | `packages/clash` | Clash detection primitive |

Note: the npm package name for the SDK is `@ectropy/sdk`, but its
source lives in `packages/sdk-javascript` — use the full directory
path (not `packages/sdk`) in any GitHub-pin install command.

## Installation

```bash
# Via GitHub pin — pin to the package's own directory
pnpm add "@ectropy/rls@github:ectropy-ai/core#v0.1.0&path:packages/rls"
```

The GitHub-pin install is unsupported in production builds until compiled packages are published.

## What is open

Core holds general-purpose building blocks. The record shapes they work with are the open standard at [schemas.ectropy.ai](https://schemas.ectropy.ai/). The work done on a record (checking, comparing, predicting and proving it) is the Ectropy service and is not part of core.

## License

Apache-2.0. See [LICENSE](./LICENSE).

## Security

See [SECURITY.md](./SECURITY.md) for vulnerability reporting.

## Contributing

Ectropy Core is maintained by [LuhTech Holdings](https://luh.tech).
Not currently accepting external pull requests — see
[CONTRIBUTING.md](./CONTRIBUTING.md). Issues and discussions are
welcome.

---

*Enterprise Excellence. Schema-First. No Shortcuts.*
