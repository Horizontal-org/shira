import { Button, defaultTheme, styled } from "@horizontal-org/shira-ui";
import { ComponentProps, ComponentType, FunctionComponent, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { MdBlock } from "react-icons/md";
import parseHtml from "../../../../../utils/parseHtml";

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
  OutlineButton?: ComponentType<ComponentProps<typeof Button>>;
  PrimaryButton?: ComponentType<ComponentProps<typeof Button>>;
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
  OutlineButton = Button,
  PrimaryButton = Button,
  className,
}) => {
  const { t } = useTranslation();

  if (explanations.length === 0) {
    return (
      <NoExplanationsNotice className={className}>
        <MdBlock />
        {t("create_question.tabs.preview.no_explanations")}
      </NoExplanationsNotice>
    );
  }

  const outlineButtonProps: ComponentProps<typeof Button> = {
    text: showExplanations
      ? t("create_question.tabs.preview.hide_explanations")
      : t("create_question.tabs.preview.show_explanations"),
    type: "outline",
    onClick: onToggleExplanations,
  };

  const previousButtonProps: ComponentProps<typeof Button> = {
    text: t("create_question.tabs.preview.previous_explanation"),
    type: "primary",
    onClick: onPreviousExplanation,
  };

  const nextButtonProps: ComponentProps<typeof Button> = {
    text: t("create_question.tabs.preview.next_explanation"),
    type: "primary",
    onClick: onNextExplanation,
  };

  return (
    <>
      <OutlineButton {...outlineButtonProps} />

      {showExplanations && explanations.length > 1 && explanationNumber > 0 && (
        <PrimaryButton {...previousButtonProps} />
      )}

      {showExplanations && explanations.length > 1 && explanationNumber < explanations.length - 1 && (
        <PrimaryButton {...nextButtonProps} />
      )}
    </>
  );
};

const NoExplanationsNotice = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 10px 16px;
  background: ${defaultTheme.colors.light.paleGrey};
  border-radius: 999px;
  color: ${defaultTheme.colors.dark.darkGrey};
`;
