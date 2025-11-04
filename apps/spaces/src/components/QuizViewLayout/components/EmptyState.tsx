import { FunctionComponent } from "react";
import { styled, SettingsFishIcon, Body1, Button, defaultTheme } from '@shira/ui'
import { FiPlus } from "react-icons/fi";
import { MdOutlineMenuBook } from "react-icons/md";
import { useTranslation } from "react-i18next";

interface Props {
  onAdd: () => void,
  onAddLibrary: (quizId: string) => void,
  quizId: string,
}

export const EmptyState: FunctionComponent<Props> = ({
  onAdd,
  onAddLibrary,
  quizId,
}) => {

  const { t } = useTranslation();

  return (
    <Container>
      <SettingsFishIcon />
      <Body1>{t('no_questions.subtitle')}</Body1>
      <ButtonWrapper>
        <Button
          leftIcon={<FiPlus size={16} />}
          text={t('questions_tab.create_question_button')}
          type="primary"
          color={defaultTheme.colors.green7}
          onClick={onAdd}
        />
        <Button
          leftIcon={<MdOutlineMenuBook size={19} />}
          text={t('questions_tab.add_from_library_button')}
          type="primary"
          color={defaultTheme.colors.green7}
          onClick={() => onAddLibrary(quizId)}
        />
      </ButtonWrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  padding: 48px 16px;
  gap:16px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: 16px;
  gap: 10px;
`;

export default EmptyState;