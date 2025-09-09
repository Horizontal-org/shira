import React, { createContext, useCallback, useContext, useMemo, useRef, useState, useEffect } from "react";
import { finishQuizRun, startQuizRun, QuestionRunDraft, Answer } from "../fetch/quiz_runs";

type QuizRunContextValue = {
  runId: string | number | null;
  started: boolean;
  recordAnswer: (questionId: number, answer: Answer) => void;
  start: (quizId: number | string, learnerId?: string | null) => Promise<void>;
  finish: () => Promise<void>;
  answers: QuestionRunDraft[];
};

const QuizRunContext = createContext<QuizRunContextValue | null>(null);

const SS_KEY = "shira:quizRunBuffer";

export const QuizRunProvider: React.FC<{ quizId: number | string; children: React.ReactNode }> = ({ quizId, children }) => {
  const [runId, setRunId] = useState<string | number | null>(null);
  const [answers, setAnswers] = useState<QuestionRunDraft[]>(() => {
    const cached = sessionStorage.getItem(SS_KEY);
    return cached ? JSON.parse(cached) : [];
  });
  const startedRef = useRef(false);

  // keep sessionStorage in sync (optional; remove if strictly in-memory)
  useEffect(() => {
    sessionStorage.setItem(SS_KEY, JSON.stringify(answers));
  }, [answers]);

  const recordAnswer = useCallback((questionId: number, answer: Answer) => {
    setAnswers(prev => {
      const now = new Date().toISOString();
      const idx = prev.findIndex(a => a.questionId === questionId);
      if (idx >= 0) {
        const copy = prev.slice();
        copy[idx] = { ...copy[idx], answer, answeredAt: now };
        return copy;
      }
      return [...prev, { questionId, answer, answeredAt: now }];
    });
  }, []);

  const start = useCallback(
    async (quizIdIn: number | string) => {
      if (startedRef.current) return;

      if (quizIdIn === null || quizIdIn === undefined || `${quizIdIn}`.trim() === "") {
        console.warn("start() called without a valid quizId");
        return;
      }

      startedRef.current = true;
      try {
        console.log("startQuizRun quizIdIn:", quizIdIn);

        const run = await startQuizRun({
          quizId: quizIdIn,
          learnerId: null,
          startedAt: new Date().toISOString(),
        });

        setRunId(run.id);
      } catch (e) {
        // if the call fails, allow retries
        startedRef.current = false;
        throw e;
      }
    },
    []
  );

  const finish = useCallback(async () => {
    if (!runId) return;
    await finishQuizRun(runId, {
      finishedAt: new Date().toISOString(),
      questionRuns: answers,
    });
    // clear ephemeral buffer after successful save
    sessionStorage.removeItem(SS_KEY);
    setAnswers([]);
  }, [runId, answers]);

  const value = useMemo(() => ({
    runId,
    started: startedRef.current,
    recordAnswer,
    start,
    finish,
    answers,
  }), [runId, recordAnswer, start, finish, answers]);

  return <QuizRunContext.Provider value={value}>{children}</QuizRunContext.Provider>;
};

export const useQuizRun = () => {
  const ctx = useContext(QuizRunContext);
  if (!ctx) throw new Error("useQuizRun must be used within <QuizRunProvider>");
  return ctx;
};
