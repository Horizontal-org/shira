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
  console.log("[QuizRun] provider render. quizId:", quizId);

  // ---- state ----
  const [runId, setRunId] = useState<number | null>(null);
  const [answers, setAnswers] = useState<QuestionRunPayload[]>(() => {
    const cached = sessionStorage.getItem(SS_KEY);
    const initial = cached ? JSON.parse(cached) : [];
    console.log("[QuizRun] hydrate answers from sessionStorage:", initial);
    return initial;
  });
  const started = runId !== null;

  // ---- keep sessionStorage in sync with answers ----
  useEffect(() => {
    console.log("[QuizRun] answers changed -> sync to sessionStorage. count:", answers.length, "answers:", answers);
    sessionStorage.setItem(SS_KEY, JSON.stringify(answers));
  }, [answers]);

  // ---- reset local state if quizId prop changes ----
  useEffect(() => {
    console.log("[QuizRun] quizId changed -> resetting local run/answers");
    sessionStorage.removeItem(SS_KEY);
    setAnswers([]);
    setRunId(null);
  }, [quizId]);

  // ---- record an answer ----
  const recordAnswer = useCallback((qId: number, ans: Answer) => {
    console.log("[QuizRun] recordAnswer called with:", { qId, ans });
    setAnswers(prev => {
      const next = [
        ...prev.filter(a => a.questionId !== qId),
        { questionId: qId, answer: ans, answeredAt: new Date().toISOString() },
      ];
      console.log("[QuizRun] answers updated. prevCount:", prev.length, "nextCount:", next.length, "next:", next);
      sessionStorage.setItem(SS_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  // ---- start a run (guarded by runId) ----
  const start = useCallback(
    async (quizIdIn: number | string, learnerId: string | null = null) => {
      console.log("[QuizRun] start() called with:", { quizIdIn, learnerId, runId });
      if (runId != null) {
        console.log("[QuizRun] start() aborted: run already started with id:", runId);
        return;
      }

      const payload = { quizId: quizIdIn, learnerId, startedAt: new Date().toISOString() };
      console.log("[QuizRun] startQuizRun -> request payload:", payload);

      const run = await startQuizRun(payload);

      console.log("[QuizRun] startQuizRun -> response:", run);
      setRunId(Number(run.id));
      console.log("[QuizRun] start() success. runId set to:", Number(run.id));
    },
    [runId]
  );

  // ---- keep a stable snapshot of answers for finish() ----
  const answersRef = useRef(answers);
  useEffect(() => {
    answersRef.current = answers;
    console.log("[QuizRun] answersRef updated. count:", answersRef.current.length);
  }, [answers]);

  // ---- finish the run, persist answers, clear local state ----
  const finish = useCallback(async () => {
    console.log("[QuizRun] finish() called. runId:", runId);
    if (runId == null) {
      console.log("[QuizRun] finish() aborted: no runId");
      return;
    }

    const payload = {
      finishedAt: new Date().toISOString(),
      questionRuns: answersRef.current,
    };
    console.log("[QuizRun] finishQuizRun -> request payload:", payload);

    try {
      await finishQuizRun(runId, payload);
      console.log("[QuizRun] finishQuizRun -> success");
    } catch (e) {
      console.log("[QuizRun] finishQuizRun -> error:", e);
      throw e;
    }

    console.log("[QuizRun] clearing local buffer and runId");
    sessionStorage.removeItem(SS_KEY);
    setAnswers([]);
    setRunId(null); // allow a new run later
    console.log("[QuizRun] cleared. runId:", null, "answersLen:", 0);
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

  console.log("[QuizRun] context value memoized:", value);

  return <QuizRunContext.Provider value={value}>{children}</QuizRunContext.Provider>;
};

export const useQuizRun = () => {
  const ctx = useContext(QuizRunContext);
  if (!ctx) {
    console.log("[QuizRun] useQuizRun called outside provider");
    throw new Error("useQuizRun must be used within QuizRunProvider");
  }
  console.log("[QuizRun] useQuizRun -> ctx:", ctx);
  return ctx;
};
