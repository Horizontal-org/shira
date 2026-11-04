import { createHash, timingSafeEqual } from 'crypto';

export const hashResetToken = (rawToken: string): string => {
  return createHash("sha256").update(rawToken, "utf8").digest("hex");
};

export const hashToken = hashResetToken;

export const matchesTokenHash = (rawToken: string | undefined, storedHash: string | null | undefined): boolean => {
  if (!rawToken || !storedHash) return false;
  const given = Buffer.from(hashToken(rawToken), 'hex');
  const stored = Buffer.from(storedHash, 'hex');
  return given.length === stored.length && timingSafeEqual(given, stored);
};