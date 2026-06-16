import { FunctionComponent } from "react";
import { styled, defaultTheme } from "@horizontal-org/shira-ui";
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
    <>
      <Overlay>
        <Dialog
          role="dialog"
          aria-modal="true"
        >
          <Body>
            <QuestionPreview
              onAdd={onAdd}
              onClose={onClose}
              explanations={question.explanations}
              question={question}
            />
          </Body>
        </Dialog>
      </Overlay>
    </>
  );
};

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,.5);
  display: grid;
  place-items: center;
  z-index: 1000;
`;

const Dialog = styled.div`
  max-height: 98vh;
  height: 100%;
  max-width: 98vw;
  width: 100%;
  background: ${defaultTheme.colors.light.white};
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  overflow: auto;
  margin: 0 10px;
`;

const Body = styled.div`
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;
