# @ectropy/rls

PostgreSQL Row-Level Security tenant context primitives for the Ectropy
open-core platform.

## Overview

This package provides the foundational RLS primitives that any PostgreSQL
client can use to set tenant context via `SET app.current_tenant_id`. It
is deliberately minimal — zero runtime dependencies, structural typing
only, one SQL statement.

## API

- `setRLSTenantContext(client, tenantId)` — Sets the PostgreSQL session
  variable for RLS policy enforcement.
- `validateTenantId(tenantId)` — Fail-fast UUID assertion.
- `RLSContextError` — Error class with `tenantId` context field.
- `isRLSContextError(error)` — Type guard.
- `RLSCapable` — Structural interface for any client that supports
  `$executeRaw` (every Prisma client does).
- `RLS_SESSION_VAR` — The session variable name constant
  (`'app.current_tenant_id'`).

## Usage

```typescript
import {
  setRLSTenantContext,
  validateTenantId,
  type RLSCapable,
} from '@ectropy/rls';

// Works with any Prisma client, regardless of schema
validateTenantId(tenantId);
await setRLSTenantContext(prismaClient, tenantId);

// All subsequent queries on prismaClient are now tenant-scoped
// via RLS policies that reference current_setting('app.current_tenant_id').
```

## How it works

The package executes a single SQL statement on the client's session:

```sql
SELECT set_config('app.current_tenant_id', $1, false);
```

The `false` third argument (PostgreSQL's `is_local` flag) persists the
setting for the entire database session, not just the current
transaction. This matches connection-pooled client lifecycles.

RLS policies on tenant-scoped tables should reference this variable in
their `USING` / `WITH CHECK` clauses:

```sql
CREATE POLICY tenant_isolation ON projects
  USING (tenant_id = current_setting('app.current_tenant_id')::uuid);
```

## Design

- **Zero runtime deps.** The only imports are internal (`./types`,
  `./errors`, `./validation`).
- **Structural typing over `$executeRaw`.** No peer dependency on
  `@prisma/client` or any specific driver — consumers bring their own.
- **Fail-fast UUID validation** before any database call. Invalid inputs
  throw synchronously without allocating a connection.
- **Production-proven SQL pattern.** The statement and parameterization
  match the pattern live in `@ectropy/database` (Ectropy's IMPL
  package).

## License

Apache-2.0. See LICENSE.

---

Enterprise Excellence. Schema-First. No Shortcuts.
