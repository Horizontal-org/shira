import { useCallback, useMemo, useState } from "react";

type PreviewQuestion = { questionId: number };

/**
 * Shared navigation state for a list preview and its nested question preview.
 * Data loading and question mutations intentionally remain with each feature.
 */
export const usePreviewQuestionSelection = <T extends PreviewQuestion>(questions: T[]) => {
  const [selectedQuestionId, setSelectedQuestionId] = useState<number | null>(null);

  const openPreviewQuestion = useCallback((questionId: number) => {
    setSelectedQuestionId(questionId);
  }, []);

  const closePreviewQuestion = useCallback(() => {
    setSelectedQuestionId(null);
  }, []);

  const previewQuestion = useMemo(
    () => questions.find((question) => question.questionId === selectedQuestionId) ?? null,
    [questions, selectedQuestionId],
  );

  return {
    selectedQuestionId,
    previewQuestion,
    openPreviewQuestion,
    closePreviewQuestion,
  };
};
