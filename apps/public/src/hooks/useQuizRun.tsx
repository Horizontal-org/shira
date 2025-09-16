import { useEffect, useCallback, useMemo, useState, useRef } from "react";
import { finishQuizRun, startQuizRun, Answer, QuestionRunPayload } from "../fetch/quiz_runs";

type UseQuizRunValue = {
    runId: number | null;
    started: boolean;
    recordAnswer: (questionId: number, answer: Answer) => void;
    start: (quizId: number | string, learnerId?: string | null) => Promise<void>;
    finish: () => Promise<void>;
    answers: QuestionRunPayload[];
};

const readSession = (key: string): QuestionRunPayload[] => {
    if (typeof window === "undefined") return [];
    try {
        const raw = window.sessionStorage.getItem(key);
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
};

/** Safe sessionStorage set */
const writeSession = (key: string, value: QuestionRunPayload[]) => {
    if (typeof window === "undefined") return;
    try {
        window.sessionStorage.setItem(key, JSON.stringify(value));
    } catch {
        // ignore quota / privacy errors
    }
};

const removeSession = (key: string) => {
    if (typeof window === "undefined") return;
    try {
        window.sessionStorage.removeItem(key);
    } catch {
        // ignore
    }
};

export const useQuizRun = (quizId: number | string): UseQuizRunValue => {
    // Keep buffer separate per quiz to avoid cross-quiz bleed
    const SS_KEY = `shira:quizRunBuffer:${quizId}`;

    const [runId, setRunId] = useState<number | null>(null);
    const [answers, setAnswers] = useState<QuestionRunPayload[]>(() => readSession(SS_KEY));
    const started = runId !== null;

    // Persist buffer on change
    useEffect(() => {
        writeSession(SS_KEY, answers);
    }, [SS_KEY, answers]);

    // Reset when quizId changes
    useEffect(() => {
        removeSession(SS_KEY);
        setAnswers([]);
        setRunId(null);
        // only when quizId changes; SS_KEY already derives from it
    }, [quizId]);

    const start = useCallback(
        async (quizIdIn: number | string, learnerId: string | null = null) => {
            if (runId != null) return;

            const payload = { quizId: quizIdIn, learnerId, startedAt: new Date().toISOString() };
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
            writeSession(SS_KEY, next);
            return next;
        });
    }, [SS_KEY]);

    const answersRef = useRef(answers);
    useEffect(() => { answersRef.current = answers; }, [answers]);

    const finish = useCallback(async () => {
        if (runId == null) return;

        const payload = {
            finishedAt: new Date().toISOString(),
            questionRuns: answersRef.current,
        };

        await finishQuizRun(runId, payload);

        removeSession(SS_KEY);
        setAnswers([]);
        setRunId(null);
    }, [SS_KEY, runId]);

    return useMemo(
        () => ({ runId, started, recordAnswer, start, finish, answers }),
        [runId, started, recordAnswer, start, finish, answers]
    );
};

export type { Answer, QuestionRunPayload };