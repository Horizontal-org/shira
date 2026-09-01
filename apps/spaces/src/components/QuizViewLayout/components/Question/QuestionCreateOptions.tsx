import { Button, defaultTheme } from "@horizontal-org/shira-ui";
import { FunctionComponent, useState } from "react";
import { useTranslation } from "react-i18next";
import { FiPlus } from "react-icons/fi";
import styled from "styled-components";
import { usePublicLibrary } from "../../../../hooks/usePublicLibrary";
import { EntityCreationOptionsModal } from "../../../modals/QuestionCreationOptionsModal";

interface Props {
  onAdd: () => void;
  onImport: () => void;
  onAddLibrary: () => void;
}

export const QuestionCreateOptions: FunctionComponent<Props> = ({ onAdd, onImport, onAddLibrary }) => {

  const { t } = useTranslation();
  const { isPublicLibraryEnabled } = usePublicLibrary();
  const [isOptionsModalOpen, setIsOptionsModalOpen] = useState(false);

  return (
    <Header>
      <Button
        id="create-question-button"
        leftIcon={<FiPlus size={16} />}
        text={t("questions_tab.create_question_button")}
        type="primary"
        color={defaultTheme.colors.green7}
        onClick={() => {
          setIsOptionsModalOpen(true);
        }}
      />

      <EntityCreationOptionsModal
        entityType="question"
        isPublicLibraryEnabled={isPublicLibraryEnabled}
        isModalOpen={isOptionsModalOpen}
        setIsModalOpen={setIsOptionsModalOpen}
        onAction={(action) => {
          setIsOptionsModalOpen(false)
          if (action === 'scratch') {
            onAdd();
          } else if (action === 'template') {
            onAddLibrary();
          } else if (action === 'import') {
            onImport();
          }
        }}
      />
    </Header>
  )
}

const Header = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-bottom: 16px;
  gap: 10px;
`;
