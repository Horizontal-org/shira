import { Body1, Button, defaultTheme, styled } from "@horizontal-org/shira-ui";
import { FunctionComponent, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { FiX } from "react-icons/fi";
import { MdBlock } from "react-icons/md";
import { AppLayout } from "../../../../QuestionPreview/AppLayout";
import parseHtml from "../../../../../utils/parseHtml";
import type { PreviewQuestionRow } from "../QuizPreviewQuestionsTable";

type Props = {
  question: PreviewQuestionRow;
  onBack: () => void;
  onClose: () => void;
};

export const QuizTemplateQuestionPreview: FunctionComponent<Props> = ({
  question,
  onBack,
  onClose,
}) => {
  const { t } = useTranslation();
  const [explanationNumber, setExplanationNumber] = useState(0);
  const [showExplanations, setShowExplanations] = useState(false);

  const explanations = useMemo(
    () => parseHtml(question.content).parseExplanations(question.explanations),
    [question.content, question.explanations],
  );

  useEffect(() => {
    setExplanationNumber(0);
    setShowExplanations(false);
  }, [question.id]);

  const activeExplanation = explanations[explanationNumber]
    ? Number(explanations[explanationNumber].index)
    : 0;

  return (
    <PreviewShell>
      <PreviewHeader>
        <PreviewHeaderStart>
          <CloseButton type="button" onClick={onClose}>
            <FiX size={22} />
          </CloseButton>

          <PreviewTitle>{t("create_question.tabs.preview.aria_label")}</PreviewTitle>
        </PreviewHeaderStart>

        <PreviewActions>
          <Button
            text={t("quiz_library.preview.back_to_quiz_template")}
            type="outline"
            onClick={onBack}
          />

          <ActionsDivider />

          {explanations.length > 0 ? (
            <Button
              text={showExplanations
                ? t("create_question.tabs.preview.hide_explanations")
                : t("create_question.tabs.preview.show_explanations")}
              type="outline"
              onClick={() => {
                if (showExplanations) {
                  setExplanationNumber(0);
                }

                setShowExplanations((current) => !current);
              }}
            />
          ) : (
            <NoExplanationsNotice>
              <MdBlock size={18} color={defaultTheme.colors.error6} />
              <Body1>{t("create_question.tabs.preview.no_explanations")}</Body1>
            </NoExplanationsNotice>
          )}
        </PreviewActions>
      </PreviewHeader>

      {showExplanations && explanations.length > 1 && (
        <ExplanationControls>
          {explanationNumber > 0 && (
            <Button
              text={t("create_question.tabs.preview.previous_explanation")}
              type="outline"
              onClick={() => { setExplanationNumber((current) => current - 1); }}
            />
          )}

          {explanationNumber < explanations.length - 1 && (
            <Button
              text={t("create_question.tabs.preview.next_explanation")}
              type="outline"
              onClick={() => { setExplanationNumber((current) => current + 1); }}
            />
          )}
        </ExplanationControls>
      )}

      <PreviewCanvasWrapper>
        <PreviewCanvas>
          <PreviewAppFrame>
            <AppLayout
              appName={question.app}
              content={question.content}
              explanations={explanations}
              explanationNumber={activeExplanation}
              showExplanations={showExplanations}
            />
          </PreviewAppFrame>

          {showExplanations && <CanvasOverlay />}
        </PreviewCanvas>
      </PreviewCanvasWrapper>
    </PreviewShell>
  );
};

const PreviewShell = styled.div`
  display: flex;
  flex: 1;
  min-height: 0;
  flex-direction: column;
`;

const PreviewHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 20px 28px 0;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    flex-direction: column;
    align-items: stretch;
    padding: 20px 20px 0;
  }
`;

const PreviewHeaderStart = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const PreviewTitle = styled(Body1)`
  color: ${defaultTheme.colors.dark.darkGrey};
`;

const PreviewActions = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-left: auto;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
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

const CloseButton = styled.button`
  all: unset;
  width: 40px;
  height: 40px;
  cursor: pointer;
  color: ${defaultTheme.colors.dark.darkGrey};
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const NoExplanationsNotice = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 10px 16px;
  background: ${defaultTheme.colors.light.paleGrey};
  border-radius: 999px;
  color: ${defaultTheme.colors.dark.darkGrey};
`;

const ExplanationControls = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 20px 28px 0;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: 20px 20px 0;
    flex-wrap: wrap;
  }
`;

const PreviewCanvasWrapper = styled.div`
  padding: 20px 28px 28px;
  flex: 1;
  min-height: 0;
  overflow: auto;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: 20px;
  }
`;

const PreviewCanvas = styled.div`
  position: relative;
  min-height: 680px;
  border-radius: 4px;
  overflow: auto;
  display: flex;
  justify-content: center;
  padding: 24px;
  background: linear-gradient(90deg, #f6f4dd 0%, #eef7db 100%);
`;

const PreviewAppFrame = styled.div`
  position: relative;
  z-index: 1;
  width: fit-content;
  max-width: 100%;
`;

const CanvasOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
`;
