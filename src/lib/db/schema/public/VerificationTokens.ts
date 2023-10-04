// @generated
// This file is automatically generated by Kanel. Do not modify manually.

import type { ColumnType, Selectable, Insertable, Updateable } from "kysely";

/** Represents the table public.verificationTokens */
export default interface VerificationTokensTable {
  identifier: ColumnType<string, string, string | null>;

  token: ColumnType<string, string, string | null>;

  expires: ColumnType<Date, Date | string, Date | string | null>;
}

export type VerificationTokens = Selectable<VerificationTokensTable>;

export type NewVerificationTokens = Insertable<VerificationTokensTable>;

export type VerificationTokensUpdate = Updateable<VerificationTokensTable>;
