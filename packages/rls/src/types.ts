/**
 * @fileoverview Structural typing for RLS-capable database clients.
 */

/**
 * Structural interface for any client capable of executing raw SQL via
 * tagged template literals with parameterized values.
 *
 * Any Prisma client (generated from any schema) satisfies this interface
 * via its `$executeRaw` method. Other PG clients can satisfy it by
 * wrapping their driver in an adapter.
 *
 * Structural typing avoids a hard peer dependency on `@prisma/client`
 * or any specific driver — consumers bring their own.
 *
 * @example
 * ```ts
 * import { PrismaClient } from '@prisma/client';
 * const client: RLSCapable = new PrismaClient();
 * ```
 */
export interface RLSCapable {
  $executeRaw(
    strings: TemplateStringsArray,
    ...values: unknown[]
  ): Promise<unknown>;
}
