import { Button, defaultTheme, styled } from "@horizontal-org/shira-ui";
import { FunctionComponent, useState } from "react";
import { useTranslation } from "react-i18next";
import type { QuestionSubmissionDetailDto } from "../../../../fetch/submissions";
import { AppLayout } from "../../../QuestionPreview/AppLayout";
import { isMessagingNotPhoneApp, isMessagingPhoneApp } from "../../../../utils/appNames";
import { PreviewModalPage } from "../../PreviewModal";
import { QuestionSubmissionPreviewDetailsCard } from "./QuestionSubmissionPreviewDetailsCard";

type Props = {
  question: QuestionSubmissionDetailDto;
  onClose: () => void;
};

export const QuestionSubmissionPreview: FunctionComponent<Props> = ({ question, onClose }) => {
  const { t, i18n } = useTranslation();
  const [showExplanations, setShowExplanations] = useState(false);

  return (
    <PreviewModalPage
      onClose={onClose}
      title={question.questionName}
      subtitle={null}
      actions={(
        <Button
          text={t(
            showExplanations
              ? "preview.hide_explanations"
              : "preview.show_explanations",
          )}
          type="primary"
          color={defaultTheme.colors.blue7}
          onClick={() => setShowExplanations((current) => !current)}
        />
      )}
      details={(
        <QuestionSubmissionPreviewDetailsCard
          language={question.language}
          tags={question.tags}
          isPhishing={question.isPhishing}
          app={question.app}
          dateSubmitted={question.dateSubmitted}
          locale={i18n.language}
        />
      )}
    >
      <PreviewArea>
        {showExplanations && <ExplanationOverlay />}
        <PreviewAppFrame
          $isFullWidth={isMessagingNotPhoneApp(question.app)}
          $isPhoneFrame={isMessagingPhoneApp(question.app)}
        >
          <AppLayout
            appName={question.app}
            content={question.content}
            explanations={question.explanations}
            explanationNumber={0}
            showExplanations={showExplanations}
          />
        </PreviewAppFrame>
      </PreviewArea>
    </PreviewModalPage>
  );
};

const PreviewArea = styled.div`
  position: relative;
  margin-top: 16px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
`;

const PreviewAppFrame = styled.div<{
  $isFullWidth: boolean;
  $isPhoneFrame: boolean;
}>`
  position: relative;
  width: ${(props) => (props.$isFullWidth ? "100%" : "fit-content")};
  max-width: 100%;
  height: ${(props) => (props.$isPhoneFrame ? "80vh" : "68vh")};
  min-height: 620px;
  max-height: ${(props) => (props.$isPhoneFrame ? "none" : "780px")};
`;

const ExplanationOverlay = styled.div`
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: rgba(0, 0, 0, 0.45);
  pointer-events: none;
`;
