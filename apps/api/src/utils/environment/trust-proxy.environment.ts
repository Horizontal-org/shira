import * as dotenv from 'dotenv';
dotenv.config();

const parsedHops = Number.parseInt(process.env.TRUST_PROXY_HOPS ?? '', 10);

export const TRUST_PROXY_HOPS: number = Number.isNaN(parsedHops) || parsedHops < 0 ? 1 : parsedHops;
