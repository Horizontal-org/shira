import { useEffect, useCallback, useMemo, useState, useRef } from "react";
import { finishQuizRun, startQuizRun, Answer, QuestionRunPayload } from "../fetch/quiz_runs";

type UseQuizRunValue = {
  runId: number | null;
  started: boolean;
  recordAnswer: (questionId: number, answer: Answer) => void;
  start: (quizId: number, learnerId?: number | null) => Promise<void>;
  finish: () => Promise<void>;
  answers: QuestionRunPayload[];
};

export const useQuizRun = (quizId: number): UseQuizRunValue => {
  const [runId, setRunId] = useState<number | null>(null);
  const [answers, setAnswers] = useState<QuestionRunPayload[]>([]);
  const started = runId !== null;

  useEffect(() => {
    setAnswers([]);
    setRunId(null);
  }, [quizId]);

  const start = useCallback(
    async (quizId: number, learnerId: number | null = null) => {
      if (runId != null) return;
      const payload = { quizId, learnerId, startedAt: new Date().toISOString() };
      const run = await startQuizRun(payload);
      setRunId(Number(run.id));
    },
    [runId]
  );

  const recordAnswer = useCallback((qId: number, ans: Answer) => {
    setAnswers(prev => {
      const next = [
        ...prev.filter(a => a.questionId !== qId),
        { questionId: qId, answer: ans, answeredAt: new Date().toISOString() },
      ];
      return next;
    });
  }, []);

  // Keep a ref in sync to avoid stale closures inside finish()
  const answersRef = useRef(answers);
  useEffect(() => {
    answersRef.current = answers;
  }, [answers]);

  const finish = useCallback(async () => {
    if (runId == null) return;

    const payload = {
      finishedAt: new Date().toISOString(),
      questionRuns: answersRef.current,
    };

    await finishQuizRun(runId, payload);

    setAnswers([]);
    setRunId(null);
  }, [runId]);

  return useMemo(
    () => ({ runId, started, recordAnswer, start, finish, answers }),
    [runId, started, recordAnswer, start, finish, answers]
  );
};

export type { Answer, QuestionRunPayload };
