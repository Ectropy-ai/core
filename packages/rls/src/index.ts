/**
 * @ectropy/rls — PostgreSQL Row-Level Security tenant context primitives.
 *
 * Zero-dependency tenant context management for any PostgreSQL client
 * that supports tagged-template `$executeRaw` (which every Prisma client
 * does, regardless of schema). Part of the Ectropy open-core platform
 * (Apache-2.0).
 *
 * @packageDocumentation
 */

// Core operation — the primary primitive.
export { setRLSTenantContext, RLS_SESSION_VAR } from './context.js';

// Validation — fail-fast UUID assertion.
export { validateTenantId } from './validation.js';

// Error handling — instance + type guard.
export { RLSContextError, isRLSContextError } from './errors.js';

// Structural typing — any client with `$executeRaw`.
export type { RLSCapable } from './types.js';
