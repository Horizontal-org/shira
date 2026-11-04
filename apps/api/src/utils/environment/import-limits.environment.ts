import * as dotenv from 'dotenv';
dotenv.config();

export const QUIZ_IMPORT_MAX_QUESTIONS: number = Number(process.env.QUIZ_IMPORT_MAX_QUESTIONS) || 100;
export const QUESTION_IMPORT_MAX_EXPLANATIONS: number = Number(process.env.QUESTION_IMPORT_MAX_EXPLANATIONS) || 50;
export const IMPORT_MAX_ZIP_ENTRIES: number = Number(process.env.IMPORT_MAX_ZIP_ENTRIES) || 5000;
export const IMPORT_LIMIT_PER_HOUR: number = Number(process.env.IMPORT_LIMIT_PER_HOUR) || 20;
