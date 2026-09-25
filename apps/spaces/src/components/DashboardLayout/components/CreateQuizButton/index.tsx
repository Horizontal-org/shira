import { FunctionComponent, useMemo, useState } from "react"
import { Button, styled, useTheme } from '@horizontal-org/shira-ui'
import { FiPlus } from 'react-icons/fi'
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import { EntityCreationOptionsModal } from "../../../modals/QuestionCreationOptionsModal"

interface Props {
  isSubActive: boolean
  quizCount: number
  isPublicLibraryEnabled: boolean
  startCreateQuizFlow: () => void
  startImportQuizFlow: () => void
  onLimitReached: () => void
}

export const CreateQuizButton:FunctionComponent<Props> = ({
  startCreateQuizFlow,
  startImportQuizFlow,
  quizCount,
  isSubActive,
  isPublicLibraryEnabled,
  onLimitReached
}) => {
  const theme = useTheme()
  const { t } = useTranslation()
  const navigate = useNavigate()
  const hasReachedLimit = useMemo(() => quizCount >= 3, [quizCount])
  const [isCreationOptionsModalOpen, setIsCreationOptionsModalOpen] = useState(false)

  const handleClick = () => {
    if (!isSubActive && hasReachedLimit) {
      onLimitReached()
      return
    }

    setIsCreationOptionsModalOpen(true)
  }

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

      <EntityCreationOptionsModal
        entityType="quiz"
        isPublicLibraryEnabled={isPublicLibraryEnabled}
        isModalOpen={isCreationOptionsModalOpen}
        setIsModalOpen={setIsCreationOptionsModalOpen}
        onAction={(action) => {
          setIsCreationOptionsModalOpen(false)
          if (action === 'scratch') {
            startCreateQuizFlow()
          } else if (action === 'template') {
            navigate('/quiz/templates')
          } else if (action === 'import') {
            startImportQuizFlow()
          }
        }}
      />
    </ButtonContainer>
  )
}

const ButtonContainer = styled.div`
  display: flex;
  align-items: flex-start;
`
