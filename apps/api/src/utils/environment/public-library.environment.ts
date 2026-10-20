import * as dotenv from 'dotenv';
import { SELF_HOSTED } from './self-hosted.environment';
dotenv.config();

function parsePublicLibraryEnabled(value: string | undefined): boolean {
  const normalized = value?.trim().toLowerCase();

  if (!normalized) return !SELF_HOSTED;
  if (normalized === 'true') return true;
  if (normalized !== 'false') {
    console.warn(`Invalid ENABLE_PUBLIC_LIBRARY value "${value}", disabling the public library`);
  }

  return false;
}

export const PUBLIC_LIBRARY_ENABLED: boolean = parsePublicLibraryEnabled(process.env.ENABLE_PUBLIC_LIBRARY);
