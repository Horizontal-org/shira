import { createHash } from 'crypto';

export const hashResetToken = (rawToken: string): string => {
  return createHash("sha256").update(rawToken, "utf8").digest("hex");
};