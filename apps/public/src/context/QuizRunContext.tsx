import React, {
  createContext, useCallback, useContext, useMemo, useRef, useState, useEffect,
} from "react";
import { finishQuizRun, startQuizRun, Answer, QuestionRunPayload } from "../fetch/quiz_runs";

type QuizRunContextValue = {
  runId: number | null;
  started: boolean;
  recordAnswer: (questionId: number, answer: Answer) => void;
  start: (quizId: number | string, learnerId?: string | null) => Promise<void>;
  finish: () => Promise<void>;
  answers: QuestionRunPayload[];
};

const QuizRunContext = createContext<QuizRunContextValue | null>(null);

const SS_KEY = "shira:quizRunBuffer";

export const QuizRunProvider: React.FC<{ quizId: number | string; children: React.ReactNode }> = ({ quizId, children }) => {

  // ---- state ----
  const [runId, setRunId] = useState<number | null>(null);
  const [answers, setAnswers] = useState<QuestionRunPayload[]>(() => {
    const cached = sessionStorage.getItem(SS_KEY);
    const initial = cached ? JSON.parse(cached) : [];
    return initial;
  });
  const started = runId !== null;

  // ---- keep sessionStorage in sync with answers ----
  useEffect(() => {
    sessionStorage.setItem(SS_KEY, JSON.stringify(answers));
  }, [answers]);

  // ---- reset local state if quizId prop changes ----
  useEffect(() => {
    sessionStorage.removeItem(SS_KEY);
    setAnswers([]);
    setRunId(null);
  }, [quizId]);

  // ---- record an answer ----
  const recordAnswer = useCallback((qId: number, ans: Answer) => {
    setAnswers(prev => {
      const next = [
        ...prev.filter(a => a.questionId !== qId),
        { questionId: qId, answer: ans, answeredAt: new Date().toISOString() },
      ];
      sessionStorage.setItem(SS_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  // ---- start a run (guarded by runId) ----
  const start = useCallback(
    async (quizIdIn: number | string, learnerId: string | null = null) => {
      if (runId != null) {
        return;
      }

      const payload = { quizId: quizIdIn, learnerId, startedAt: new Date().toISOString() };

      const run = await startQuizRun(payload);

      setRunId(Number(run.id));
    },
    [runId]
  );

  // ---- keep a stable snapshot of answers for finish() ----
  const answersRef = useRef(answers);
  useEffect(() => {
    answersRef.current = answers;
  }, [answers]);

  // ---- finish the run, persist answers, clear local state ----
  const finish = useCallback(async () => {
    if (runId == null) {
      return;
    }

    const payload = {
      finishedAt: new Date().toISOString(),
      questionRuns: answersRef.current,
    };

    try {
      await finishQuizRun(runId, payload);
    } catch (e) {
      throw e;
    }

    sessionStorage.removeItem(SS_KEY);
    setAnswers([]);
    setRunId(null); // allow a new run later
  }, [runId]);

  // ---- memoized context value ----
  const value = useMemo(
    () => ({
      runId,
      started,
      recordAnswer,
      start,
      finish,
      answers,
    }),
    [runId, started, recordAnswer, start, finish, answers]
  );

  return <QuizRunContext.Provider value={value}>{children}</QuizRunContext.Provider>;
};

export const useQuizRun = () => {
  const ctx = useContext(QuizRunContext);
  if (!ctx) {
    throw new Error("useQuizRun must be used within QuizRunProvider");
  }
  return ctx;
};
