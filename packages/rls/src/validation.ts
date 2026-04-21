/**
 * @fileoverview Tenant ID validation. Fail-fast before any database call.
 *
 * Security: UUID-format validation prevents SQL injection via the
 * tenant_id parameter. Copied from the production-proven
 * `packages/database/src/middleware/rls-context.ts` implementation.
 */

import { RLSContextError } from './errors.js';

/**
 * Canonical UUID format (8-4-4-4-12 hex, case-insensitive).
 */
const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * Fail-fast UUID validation for tenant identifiers.
 *
 * Asserts that `tenantId` is a non-empty string in canonical UUID form.
 * Throws `RLSContextError` otherwise. Use before any database call that
 * scopes by tenant, so invalid inputs never reach the driver.
 *
 * The `asserts` return signature narrows the type to `string` in the
 * caller scope after a successful validation.
 *
 * @param tenantId - The tenant identifier to validate.
 * @throws {RLSContextError} If `tenantId` is null, undefined, empty, or
 *   not a canonical UUID.
 */
export function validateTenantId(
  tenantId: string | null | undefined,
): asserts tenantId is string {
  if (!tenantId) {
    throw new RLSContextError(
      'Tenant ID is required for shared database operations',
    );
  }

  if (!UUID_REGEX.test(tenantId)) {
    throw new RLSContextError(
      `Invalid tenant ID format: ${tenantId}. Expected UUID.`,
      tenantId,
    );
  }
}
