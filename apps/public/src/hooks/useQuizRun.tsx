import { useState } from "react";
import { finishQuizRun, startQuizRun, Answer, QuestionRunPayload } from "../fetch/quiz_runs";

type UseQuizRunValue = {
  runId: number | null;
  started: boolean;
  recordAnswer: (questionId: number, answer: Answer) => void;
  start: (quizId: number, learnerId?: number | null) => Promise<void>;
  finish: () => Promise<void>;
};

export const useQuizRun = (): UseQuizRunValue => {

  const [runId, setRunId] = useState<number | null>(null);
  const [answers, setAnswers] = useState<QuestionRunPayload[]>([]);
  const started = runId !== null;

  console.log(`🚀 ~ useQuizRun ~ answers: ${answers} - runId: ${runId} - started: ${started}`)
  
  const start = async (quizId: number, learnerId: number | null = null) => {
    if (runId != null) return;
    const payload = { quizId, learnerId, startedAt: new Date().toISOString() };
    const run = await startQuizRun(payload);
    setRunId(Number(run.id));
  }

  const recordAnswer = (qId: number, ans: Answer) => {
    setAnswers(prev => {
      const next = [
        ...prev.filter(a => a.questionId !== qId),
        { questionId: qId, answer: ans, answeredAt: new Date().toISOString() },
      ];
      return next;
    });
  }

  const finish = async () => {
    if (runId == null) return;

    const payload = {
      finishedAt: new Date().toISOString(),
      questionRuns: answers,
    };
 
    await finishQuizRun(runId, payload);

    setAnswers([]);
    setRunId(null);
  };

  return {
    start,
    recordAnswer,
    finish,
    runId,
    started
  }

};

export type { Answer, QuestionRunPayload };
