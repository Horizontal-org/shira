import * as dotenv from 'dotenv';
dotenv.config();

export const SELF_HOSTED: boolean = process.env.SELF_HOSTED === 'true';
