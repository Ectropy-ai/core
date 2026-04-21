/**
 * @fileoverview PostgreSQL RLS tenant context setter.
 *
 * Primary CORE primitive: sets `app.current_tenant_id` on the client's
 * database session so that RLS policies using
 * `current_setting('app.current_tenant_id')` resolve to the right tenant
 * on every subsequent query on that session.
 *
 * The SQL pattern (`SELECT set_config(...)` with `is_local=false`) is
 * copied verbatim from the production-proven implementation at
 * `packages/database/src/clients/shared-trials-client.ts:233`.
 */

import type { RLSCapable } from './types.js';
import { RLSContextError } from './errors.js';
import { validateTenantId } from './validation.js';

/**
 * PostgreSQL session variable name used for RLS policies.
 *
 * RLS policies on tenant-scoped tables should reference this variable
 * via `current_setting('app.current_tenant_id')` in their `USING` /
 * `WITH CHECK` clauses.
 *
 * Exported for consumers who need the name in their own queries (e.g.
 * diagnostic `SELECT current_setting(...)` calls, custom migrations,
 * or observability tooling).
 */
export const RLS_SESSION_VAR = 'app.current_tenant_id';

/**
 * Sets the PostgreSQL session-level tenant context for Row-Level
 * Security policy enforcement.
 *
 * Executes: `SELECT set_config('app.current_tenant_id', $1, false)`.
 *
 * The `false` third argument to `set_config` (PostgreSQL's
 * `is_local` flag) means the setting persists for the entire database
 * session, not just the current transaction. This matches the
 * expected lifecycle of connection-pooled Prisma clients where one
 * session serves many sequential queries.
 *
 * Validates `tenantId` via `validateTenantId` before touching the
 * database — invalid inputs throw synchronously without allocating a
 * connection.
 *
 * @param client - Any client satisfying the `RLSCapable` structural
 *   interface (every Prisma client satisfies this via `$executeRaw`).
 * @param tenantId - UUID of the tenant to scope queries to.
 * @throws {RLSContextError} If `tenantId` validation fails or the SQL
 *   execution fails.
 *
 * @example
 * ```ts
 * import { setRLSTenantContext } from '@ectropy/rls';
 * await setRLSTenantContext(prismaClient, tenantId);
 * // All subsequent queries on prismaClient are now tenant-scoped.
 * ```
 */
export async function setRLSTenantContext<T extends RLSCapable>(
  client: T,
  tenantId: string,
): Promise<void> {
  validateTenantId(tenantId);

  try {
    // SQL pattern matches packages/database/src/clients/shared-trials-client.ts:233
    // Session var is a hardcoded SQL literal; tenantId is parameterized by
    // Prisma's $executeRaw tagged template (prevents injection).
    await client.$executeRaw`SELECT set_config('app.current_tenant_id', ${tenantId}, false)`;
  } catch (error) {
    if (error instanceof Error) {
      throw new RLSContextError(
        `Failed to set tenant context for ${tenantId}: ${error.message}`,
        tenantId,
      );
    }
    throw new RLSContextError(
      `Failed to set tenant context for ${tenantId}`,
      tenantId,
    );
  }
}
