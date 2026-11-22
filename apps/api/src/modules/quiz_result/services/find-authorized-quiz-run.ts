import { NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { QuizRun } from '../domain/quiz_runs.entity';
import { matchesTokenHash } from 'src/utils/token.utils';

export const findAuthorizedQuizRun = async (
  quizRunRepo: Repository<QuizRun>,
  runId: number,
  token: string | undefined,
): Promise<QuizRun> => {
  const run = await quizRunRepo
    .createQueryBuilder('run')
    .addSelect('run.tokenHash')
    .where('run.id = :runId', { runId })
    .getOne();

  if (!run || !matchesTokenHash(token, run.tokenHash)) {
    throw new NotFoundException('Quiz run not found');
  }

  delete run.tokenHash;
  return run;
};
