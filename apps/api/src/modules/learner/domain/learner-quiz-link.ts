import { LEARNER_QUIZ_LINK_TTL_DAYS } from 'src/utils/environment/learner-quiz-link.environment';
import { LearnerQuiz } from './learners_quizzes.entity';

export function isLearnerQuizLinkExpired(learnerQuiz: Pick<LearnerQuiz, 'assignedAt'>): boolean {
  const expiresAt = new Date(learnerQuiz.assignedAt).getTime() + LEARNER_QUIZ_LINK_TTL_DAYS * 24 * 60 * 60 * 1000;
  return Date.now() > expiresAt;
}
