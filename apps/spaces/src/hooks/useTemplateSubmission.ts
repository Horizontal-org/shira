import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authorExists } from "../fetch/submissions";

type TemplateSubmission = {
  path: string;
  state: Record<string, unknown>;
};

export const useTemplateSubmission = (publicSpaceId?: string) => {
  const navigate = useNavigate();
  const [pendingSubmission, setPendingSubmission] = useState<TemplateSubmission | null>(null);

  const startTemplateSubmission = async (submission: TemplateSubmission) => {
    try {
      if (publicSpaceId && await authorExists(publicSpaceId)) {
        navigate(submission.path, { state: submission.state });
        return;
      }

      setPendingSubmission(submission);
    } catch (error) {
      console.error("Failed to check the template author:", error);
    }
  };

  const continueTemplateSubmission = (displayName: string) => {
    if (pendingSubmission) {
      navigate(pendingSubmission.path, {
        state: { ...pendingSubmission.state, displayName },
      });
    }
    setPendingSubmission(null);
  };

  return {
    isDisplayNameModalOpen: Boolean(pendingSubmission),
    cancelTemplateSubmission: () => setPendingSubmission(null),
    continueTemplateSubmission,
    startTemplateSubmission,
  };
};
