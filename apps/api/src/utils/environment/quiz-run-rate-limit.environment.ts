import * as dotenv from 'dotenv';
dotenv.config();

export const QUIZ_RUN_START_LIMIT_PER_HOUR: number = Number(process.env.QUIZ_RUN_START_LIMIT_PER_HOUR) || 60;
