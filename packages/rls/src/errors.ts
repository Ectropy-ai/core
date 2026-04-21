/**
 * @fileoverview Error types for RLS tenant context operations.
 */

/**
 * Error thrown when RLS tenant context operations fail.
 *
 * Carries the `tenantId` that caused the failure on an instance field
 * for structured error handling and logging (e.g. attaching to a
 * request context or emitting as a tagged log line).
 *
 * @example
 * ```ts
 * try {
 *   await setRLSTenantContext(client, tenantId);
 * } catch (err) {
 *   if (isRLSContextError(err)) {
 *     log.error({ tenantId: err.tenantId }, err.message);
 *   }
 * }
 * ```
 */
export class RLSContextError extends Error {
  readonly tenantId?: string;

  constructor(message: string, tenantId?: string) {
    super(message);
    this.name = 'RLSContextError';
    this.tenantId = tenantId;
  }
}

/**
 * Type guard for `RLSContextError` instances.
 *
 * Prefer this over `instanceof` when crossing module boundaries where
 * class identity cannot be guaranteed (dual realms, duplicate package
 * installs, etc.).
 *
 * @param error - Any caught value to test.
 * @returns `true` if `error` is an `RLSContextError`.
 */
export function isRLSContextError(error: unknown): error is RLSContextError {
  return error instanceof RLSContextError;
}
