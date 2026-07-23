import { Button } from "@horizontal-org/shira-ui";
import { FunctionComponent } from "react";
import { FiPlus } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import type { RowType } from "../../QuestionLibraryListLayout/components/Columns";
import { PreviewModal } from "../PreviewQuizScreen";
import { PreviewQuestionScreen } from "../PreviewQuizScreen/PreviewQuestionScreen";

type Props = {
  question: RowType;
  onAdd: () => void;
  onClose: () => void;
};

export const QuestionTemplatePreviewModal: FunctionComponent<Props> = ({
  question,
  onAdd,
  onClose,
}) => {
  const { t } = useTranslation();

  return (
    <PreviewModal
      isOpen
      onClose={onClose}
    >
      <PreviewQuestionScreen
        question={{
          questionId: question.id,
          appName: question.app.name,
          content: question.content,
          explanations: question.explanations,
        }}
        headerLabel={t("create_question.tabs.preview.aria_label")}
        onClose={onClose}
        actions={(
          <Button
            aria-label="Add to quiz"
            leftIcon={<FiPlus size={16} />}
            text={t("preview.add")}
            onClick={onAdd}
          />
        )}
      />
    </PreviewModal>
  );
};
