import { useCallback, useMemo, useState } from "react";
import { RowSelectionState } from "@tanstack/react-table";
import { Learner } from "../components/LearnersTable";
import { fetchLearners as fetchLearnersApi } from "../fetch/learner";

export const useLearners = () => {
  const [learners, setLearners] = useState<Learner[]>([]);
  const [loading, setLoading] = useState(true);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const fetchLearners = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetchLearnersApi();
      setLearners(res);
      setRowSelection({});
    } catch (e) {
      console.log("🚀 ~ fetchLearners ~ error:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  const selectedLearnerIds = useMemo(
    () =>
      Object.entries(rowSelection)
        .filter(([, isSelected]) => Boolean(isSelected))
        .map(([id]) => Number(id)),
    [rowSelection]
  );

  const clearSelectedLearners = useCallback(() => {
    setRowSelection({});
  }, [rowSelection]);

  return {
    learners,
    loading,
    fetchLearners,
    rowSelection,
    setRowSelection,
    selectedLearnerIds,
    clearSelectedLearners
  };
};
