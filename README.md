# Ectropy Core

**Construction intelligence primitives. Apache-2.0.**

Ectropy Core provides the foundational building blocks for
construction decision intelligence — schema-first types,
multi-tenant RLS enforcement, AI provider abstraction, BIM
federation, IFC parsing, clash detection, and MCP client
connectivity.

This is the open-core layer of the [Ectropy](https://ectropy.ai)
platform. It is designed to ensure that tenant data remains
permanently readable by any LLM via [MCP](https://modelcontextprotocol.io),
independent of any single vendor.

## Packages

| Package | Description |
|---------|-------------|
| `@ectropy/rls` | Row-Level Security tenant context primitives |
| `@ectropy/federation` | BIM model federation primitive |
| `@ectropy/ifc` | IFC file parser primitive |
| `@ectropy/mcp-client` | MCP server client |
| `@ectropy/sdk` | Official JavaScript/TypeScript SDK |
| `@ectropy/ai-provider` | AI provider abstraction and factory |
| `@ectropy/clash` | Clash detection primitive |

## Installation

```bash
# Via GitHub pin (recommended)
pnpm add "@ectropy/rls@github:ectropy-ai/core#v0.1.0&path:packages/rls"
```

## Schema Dependency

Core packages consume types from
[@ectropy/schemas](https://github.com/ectropy-ai/schemas)
via GitHub pin.

## License

Apache-2.0. See [LICENSE](./LICENSE).

## Security

See [SECURITY.md](./SECURITY.md) for vulnerability reporting.

## Contributing

Ectropy Core is maintained by [LuhTech Holdings](https://luh.tech).
We welcome issues and discussions. Pull requests require CLA
signature (coming soon).

---

*Enterprise Excellence. Schema-First. No Shortcuts.*
