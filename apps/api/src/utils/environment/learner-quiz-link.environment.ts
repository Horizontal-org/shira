import * as dotenv from 'dotenv';
dotenv.config();

export const LEARNER_QUIZ_LINK_TTL_DAYS: number = Number(process.env.LEARNER_QUIZ_LINK_TTL_DAYS) || 30;
