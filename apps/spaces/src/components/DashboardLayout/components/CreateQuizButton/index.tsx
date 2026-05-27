import { FunctionComponent, useMemo } from "react";
import { Button, styled, useTheme } from '@horizontal-org/shira-ui'
import { FiPlus } from 'react-icons/fi';
import { useTranslation } from "react-i18next";

interface Props {
  isSubActive: boolean
  quizCount: number
  startCreateQuizFlow: () => void
  onLimitReached: () => void
}

export const CreateQuizButton:FunctionComponent<Props> = ({
  startCreateQuizFlow,
  quizCount,
  isSubActive,
  onLimitReached
}) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const hasReachedLimit = useMemo(() => quizCount >= 3, [quizCount]);

  const handleClick = () => {
    if (!isSubActive && hasReachedLimit) {
      onLimitReached();
      return;
    }

    startCreateQuizFlow();
  };

  return (
    <ButtonContainer>
      <Button
        id="create-quiz-button"
        type="primary"
        leftIcon={<FiPlus />}
        text={t('dashboard.create_quiz_button')}
        onClick={handleClick}
        color={theme.colors.green7}
      />
    </ButtonContainer>
  );
};

const ButtonContainer = styled.div`
  display: flex;
  align-items: flex-start;
`;
