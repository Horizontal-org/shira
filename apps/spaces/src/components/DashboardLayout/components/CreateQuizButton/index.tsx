import { FunctionComponent, useMemo, useState } from "react";
import { Button, GeneralTooltip, styled, useTheme } from '@shira/ui'
import { FiPlus } from 'react-icons/fi';
import { RiProhibitedLine } from "react-icons/ri";
import { useTranslation } from "react-i18next";

interface Props {
  isSubActive: boolean
  quizCount: number
  startCreateQuizFlow: () => void
}

export const CreateQuizButton:FunctionComponent<Props> = ({
  startCreateQuizFlow,
  quizCount,
  isSubActive
}) => {

  const theme = useTheme();
  const { t } = useTranslation();

  const hasReachedLimit = useMemo(() => quizCount >= 3, [quizCount])

  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <ButtonContainer>
      <GeneralTooltip
        enabled={!isSubActive && hasReachedLimit}
        show={showTooltip}
        setShow={setShowTooltip}
        label={t('dashboard.create_limit_reached')}
      >
        <Button
          id="create-quiz-button"
          type="primary"
          disabled={!isSubActive && hasReachedLimit}
          leftIcon={(!isSubActive && hasReachedLimit) ? <RiProhibitedLine /> : <FiPlus /> }
          text={t('dashboard.create_quiz_button')}
          onClick={startCreateQuizFlow}
          color={theme.colors.green7}
        />
      </GeneralTooltip>
    </ButtonContainer>
  )
}

const ButtonContainer = styled.div`
  display: flex;
  align-items: flex-start;
`;