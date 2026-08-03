import { Body1, Button, CloseButton, defaultTheme, styled } from "@horizontal-org/shira-ui";
import { FunctionComponent, ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { AppLayout } from "../../QuestionPreview/AppLayout";
import {
  isMessagingNotPhoneApp,
  isMessagingPhoneApp,
  normalizePreviewAppName,
} from "../../../utils/appNames";
import {
  ExplanationPreviewControls,
  useExplanationPreviewControls,
} from "./ExplanationPreviewControls";

type PreviewQuestion = {
  questionId: number;
  appName: string | null;
  content: string;
  explanations: {
    index: number | string;
    position: number | string;
    text: string;
  }[];
};

type Props = {
  question: PreviewQuestion;
  onClose: () => void;
  onBack?: () => void;
  submissionStatusBanner?: ReactNode;
  description?: ReactNode;
  details?: ReactNode;
  headerLabel?: ReactNode;
  actions?: ReactNode;
};

/**
 * Reusable question preview. Feature containers supply data, metadata,
 * and feature actions; this component owns the preview canvas and navigation.
 */
export const PreviewQuestionScreen: FunctionComponent<Props> = ({
  question,
  onClose,
  onBack,
  submissionStatusBanner,
  description,
  details,
  headerLabel,
  actions,
}) => {
  const { t } = useTranslation();
  const {
    activeExplanationIndex,
    explanationNumber,
    explanations,
    nextExplanation,
    previousExplanation,
    showExplanations,
    toggleExplanations,
  } = useExplanationPreviewControls({
    content: question.content,
    explanations: question.explanations,
    resetKey: question.questionId,
  });

  return (
    <Container>

      <Header>
        <HeaderStart>
          <CloseButton aria-label={t("buttons.close")} iconSize={22} onClick={onClose} />
          {headerLabel && <Body1>{headerLabel}</Body1>}
        </HeaderStart>

        <HeaderActions>
          {onBack && (
            <Button
              text={t("quiz_library.preview.back_to_quiz_template")}
              type="outline"
              onClick={onBack}
            />
          )}

          {(onBack || actions) && <ActionsDivider />}
          <ExplanationActions>
            <ExplanationPreviewControls
              explanationNumber={explanationNumber}
              explanations={explanations}
              showExplanations={showExplanations}
              onToggleExplanations={toggleExplanations}
              onPreviousExplanation={previousExplanation}
              onNextExplanation={nextExplanation}
            />
          </ExplanationActions>

          {actions && <FeatureActions>{actions}</FeatureActions>}
        </HeaderActions>
      </Header>

      <CanvasWrapper>
        {submissionStatusBanner}
        {description && <Description>{description}</Description>}
        {details}
        <Canvas>
          {showExplanations && <Overlay />}
          <AppFrame
            key={`${question.questionId}-${question.appName}`}
            $isFullWidth={isMessagingNotPhoneApp(question.appName)}
            $isPhoneFrame={isMessagingPhoneApp(question.appName)}
            $hasWhiteBackground={normalizePreviewAppName(question.appName) === "Messenger"}
          >
            <AppLayout
              appName={question.appName}
              content={question.content}
              showExplanations={showExplanations}
              explanations={explanations}
              explanationNumber={activeExplanationIndex}
            />
          </AppFrame>
        </Canvas>
      </CanvasWrapper>

    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex: 1;
  min-height: 0;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 20px 28px 0;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    flex-direction: column;
    align-items: stretch;
    padding: 20px 20px 0;
  }
`;

const HeaderStart = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-left: auto;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    width: 100%;
    justify-content: flex-end;
    flex-wrap: wrap;
  }
`;

const ActionsDivider = styled.div`
  width: 1px;
  height: 36px;
  background: ${defaultTheme.colors.dark.mediumGrey};
`;

const ExplanationActions = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: nowrap;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    flex-wrap: wrap;
    justify-content: flex-end;
  }
`;

const FeatureActions = styled.div`
  display: flex;
  align-items: center;
`;

const CanvasWrapper = styled.div`
  padding: 20px 28px 28px;
  flex: 1;
  min-height: 0;
  overflow: auto;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    padding: 20px;
  }
`;

const Description = styled(Body1)`
  margin: 0 0 28px;
  color: ${defaultTheme.colors.dark.darkGrey};
`;

const Canvas = styled.div`
  position: relative;
  border-radius: 4px;
  overflow: auto;
  display: flex;
  justify-content: center;
  padding: 24px;
  background: ${defaultTheme.colors.light.paleGreen};
`;

const AppFrame = styled.div<{
  $isFullWidth: boolean;
  $isPhoneFrame: boolean;
  $hasWhiteBackground: boolean;
}>`
  position: relative;
  width: ${(props) => (props.$isFullWidth ? "100%" : "fit-content")};
  max-width: 100%;
  height: ${(props) => (props.$isPhoneFrame ? "80vh" : "68vh")};
  min-height: 620px;
  max-height: ${(props) => (props.$isPhoneFrame ? "none" : "780px")};
  background: ${(props) => (
    props.$hasWhiteBackground ? defaultTheme.colors.light.white : "transparent"
  )};
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  background: rgba(0, 0, 0, 0.45);
  pointer-events: none;
`;
