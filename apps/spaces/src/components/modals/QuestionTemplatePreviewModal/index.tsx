import { FunctionComponent } from "react";
import { FullScreenModal, styled } from "@horizontal-org/shira-ui";
import { QuestionPreview } from "../../QuestionPreview";
import type { RowType } from "../../QuestionLibraryListLayout/components/Columns";

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
  return (
    <FullScreenModal isOpen onClose={onClose}>
      <Body>
        <QuestionPreview
          onAdd={onAdd}
          onClose={onClose}
          explanations={question.explanations}
          question={question}
        />
      </Body>
    </FullScreenModal>
  );
};

const Body = styled.div`
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;
