import { FunctionComponent } from "react";
import { Button, styled, useTheme } from '@horizontal-org/shira-ui'
import { useTranslation } from "react-i18next";
import { MdOutlineMenuBook } from "react-icons/md";
import { useNavigate } from "react-router-dom";

interface Props {
  isSubActive: boolean
  quizCount: number
  disabled?: boolean
  onLimitReached?: () => void
}

export const UseAQuizTemplateButton: FunctionComponent<Props> = ({
  quizCount,
  isSubActive,
  disabled,
  onLimitReached,
}) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const hasReachedLimit = quizCount >= 3;

  const handleClick = () => {
    if (!isSubActive && hasReachedLimit) {
      onLimitReached?.();
      return;
    }

    navigate("/quiz/templates");
  };

  return (
    <ButtonContainer>
      <Button
        id="use-quiz-template-button"
        type="primary"
        leftIcon={<MdOutlineMenuBook />}
        text={t('dashboard.use_a_quiz_template_button')}
        onClick={handleClick}
        disabled={disabled}
        color={theme.colors.green7}
      />
    </ButtonContainer>
  );
};

const ButtonContainer = styled.div`
  display: flex;
  align-items: flex-start;
`;
