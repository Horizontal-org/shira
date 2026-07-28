import { Button, defaultTheme, styled } from "@horizontal-org/shira-ui";
import { FunctionComponent, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { MdBlock, MdChevronLeft, MdChevronRight } from "react-icons/md";
import parseHtml from "../../../utils/parseHtml";

type PreviewExplanation = {
  index: string;
  text: string;
  position: string;
};

type SourceExplanation = {
  index: number | string;
  text: string;
  position: number | string;
};

type UseExplanationPreviewControlsProps = {
  content: string;
  explanations: SourceExplanation[];
  resetKey: string | number;
};

type ExplanationControlsProps = {
  explanationNumber: number;
  explanations: PreviewExplanation[];
  showExplanations: boolean;
  onToggleExplanations: () => void;
  onPreviousExplanation: () => void;
  onNextExplanation: () => void;
  className?: string;
};

export const useExplanationPreviewControls = ({
  content,
  explanations: sourceExplanations,
  resetKey,
}: UseExplanationPreviewControlsProps) => {
  const [explanationNumber, setExplanationNumber] = useState(0);
  const [showExplanations, setShowExplanations] = useState(false);

  const explanations = useMemo(
    () => parseHtml(content).parseExplanations(sourceExplanations),
    [content, sourceExplanations],
  );

  useEffect(() => {
    setExplanationNumber(0);
    setShowExplanations(false);
  }, [resetKey]);

  const activeExplanationIndex = explanations[explanationNumber]
    ? Number(explanations[explanationNumber].index)
    : 0;

  const toggleExplanations = () => {
    if (showExplanations) {
      setExplanationNumber(0);
    }

    setShowExplanations((current) => !current);
  };

  const previousExplanation = () => {
    setExplanationNumber((current) => Math.max(0, current - 1));
  };

  const nextExplanation = () => {
    setExplanationNumber((current) => Math.min(explanations.length - 1, current + 1));
  };

  return {
    activeExplanationIndex,
    explanationNumber,
    explanations,
    nextExplanation,
    previousExplanation,
    showExplanations,
    toggleExplanations,
  };
};

export const ExplanationPreviewControls: FunctionComponent<ExplanationControlsProps> = ({
  explanationNumber,
  explanations,
  showExplanations,
  onToggleExplanations,
  onPreviousExplanation,
  onNextExplanation,
  className,
}) => {
  const { t } = useTranslation();

  const hasMultipleExplanations = explanations.length > 1;

  return (
    <>
      {explanations.length === 0 ? (
        <NoExplanationsNotice className={className}>
          <MdBlock size={18} color={defaultTheme.colors.error6} />
          {t("create_question.tabs.preview.no_explanations")}
        </NoExplanationsNotice>
      ) : (
        <>
          {showExplanations && hasMultipleExplanations && (
            <>
              <ExplanationNavigationButton
                text={t("create_question.tabs.preview.previous_explanation")}
                type="outline"
                leftIcon={<MdChevronLeft size={18} />}
                disabled={explanationNumber === 0}
                onClick={onPreviousExplanation}
              />
              <ExplanationNavigationButton
                text={t("create_question.tabs.preview.next_explanation")}
                type="outline"
                rightIcon={<MdChevronRight size={18} />}
                disabled={explanationNumber === explanations.length - 1}
                onClick={onNextExplanation}
              />
            </>
          )}

          <ExplanationToggleButton
            text={showExplanations
              ? t("create_question.tabs.preview.hide_explanations")
              : t("create_question.tabs.preview.show_explanations")}
            type="primary"
            onClick={onToggleExplanations}
          />
        </>
      )}
    </>
  );
};

const ExplanationToggleButton = styled(Button)`
  justify-content: center;
`;

const ExplanationNavigationButton = styled(Button)`
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
