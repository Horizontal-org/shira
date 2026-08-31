import { FunctionComponent } from "react";
import { Button, defaultTheme, EmptyState } from '@horizontal-org/shira-ui';
import { FiPlus } from "react-icons/fi";
import { MdOutlineMenuBook } from "react-icons/md";
import { useTranslation } from "react-i18next";

interface Props {
  onAdd: () => void,
  onAddLibrary: (quizId: string) => void,
  quizId: string,
  isAddLibraryDisabled?: boolean,
}

export const QuestionEmptyState: FunctionComponent<Props> = ({
  onAdd,
  onAddLibrary,
  quizId,
  isAddLibraryDisabled,
}) => {

  const { t } = useTranslation();

  const buttons = [
    <Button
      key="create-question"
      leftIcon={<FiPlus size={16} />}
      text={t('questions_tab.create_question_button')}
      type="primary"
      color={defaultTheme.colors.green7}
      onClick={onAdd}
    />,
    <Button
      key="use-library-question"
      leftIcon={<MdOutlineMenuBook size={19} />}
      text={t('questions_tab.use_library_question_button')}
      type="primary"
      color={defaultTheme.colors.green7}
      disabled={isAddLibraryDisabled}
      onClick={() => onAddLibrary(quizId)}
    />
  ];

  return (
    <EmptyState
      subtitle={t('no_questions.subtitle')}
      buttons={buttons}
    />
  );
};

