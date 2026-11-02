import { FunctionComponent, useState } from "react";
import { Button, defaultTheme, EmptyState } from '@horizontal-org/shira-ui';
import { FiPlus } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import { usePublicLibrary } from "../../../../hooks/usePublicLibrary";
import { EntityCreationOptionsModal } from "../../../modals/QuestionCreationOptionsModal";

interface Props {
  onAdd: () => void,
  onAddLibrary: (quizId: string) => void,
  onImport: () => void,
  onCreateNote: () => void,
  quizId: string,
}

export const QuestionEmptyState: FunctionComponent<Props> = ({
  onAdd,
  onAddLibrary,
  onImport,
  onCreateNote,
  quizId,
}) => {

  const { t } = useTranslation();
  const { isPublicLibraryEnabled } = usePublicLibrary();
  const [isCreationOptionsModalOpen, setIsCreationOptionsModalOpen] = useState(false);

  const buttons = [
    <Button
      key="create-question"
      leftIcon={<FiPlus size={16} />}
      text={t('questions_tab.create_question_button')}
      type="primary"
      color={defaultTheme.colors.green7}
      onClick={() => setIsCreationOptionsModalOpen(true)}
    />,
    <Button
      key="create-note"
      leftIcon={<FiPlus size={16} />}
      text={t('questions_tab.create_note_button')}
      type="primary"
      color={defaultTheme.colors.green7}
      onClick={onCreateNote}
    />
  ];

  return (
    <>
      <EmptyState
        subtitle={t('no_questions.subtitle')}
        buttons={buttons}
      />
      <EntityCreationOptionsModal
        entityType="question"
        isPublicLibraryEnabled={isPublicLibraryEnabled}
        isModalOpen={isCreationOptionsModalOpen}
        setIsModalOpen={setIsCreationOptionsModalOpen}
        onAction={(action) => {
          setIsCreationOptionsModalOpen(false);
          if (action === 'scratch') {
            onAdd();
          } else if (action === 'template') {
            onAddLibrary(quizId);
          } else if (action === 'import') {
            onImport();
          }
        }}
      />
    </>
  );
};

