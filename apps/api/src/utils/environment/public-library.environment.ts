import * as dotenv from 'dotenv';
dotenv.config();

export const PUBLIC_LIBRARY_ENABLED: boolean = process.env.ENABLE_PUBLIC_LIBRARY !== 'false';
