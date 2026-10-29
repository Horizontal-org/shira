import { useState } from "react";
import { finishQuizRun, startQuizRun, Answer, QuestionRunPayload } from "../fetch/quiz_runs";

type UseQuizRunValue = {
  runId: number | null;
  started: boolean;
  recordAnswer: (questionId: number, answer: Answer) => void;
  start: (hash: string) => Promise<void>;
  finish: () => Promise<void>;
};

export const useQuizRun = (hasResultsEnabled: boolean = true): UseQuizRunValue => {

  const [runId, setRunId] = useState<number | null>(null);
  const [runToken, setRunToken] = useState<string | null>(null);
  const [answers, setAnswers] = useState<QuestionRunPayload[]>([]);
  const started = runId !== null;

  const start = async (hash: string) => {
    if (!hasResultsEnabled) return
    if (runId != null) return;
    const payload = { hash, startedAt: new Date().toISOString() };
    try {
      const run = await startQuizRun(payload);
      setRunId(Number(run.id));
      setRunToken(run.token);
    } catch (e) {
      console.error("Could not start quiz run", e);
    }
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
    if (!hasResultsEnabled) return
    if (runId == null || runToken == null) return;

    const payload = {
      finishedAt: new Date().toISOString(),
      questionRuns: answers,
    };

    await finishQuizRun(runId, runToken, payload);

    setAnswers([]);
    setRunId(null);
    setRunToken(null);
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
