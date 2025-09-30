import { FunctionComponent } from "react";
import { styled, Button, defaultTheme } from "@shira/ui";
import { createPortal } from "react-dom";
import { ActiveQuestion } from "../../../store/types/active_question";
import { QuestionPreview } from "../../QuestionPreview";
import { Explanation } from "../../../fetch/question_library";

type Props = {
  question: ActiveQuestion;
  onAdd: (q: ActiveQuestion) => void;
  onClose: () => void;
  explanations: Explanation[];
};

export const QuestionLibraryPreviewModal: FunctionComponent<Props> = ({
  question,
  onAdd,
  onClose,
  explanations
}) => {
  return createPortal(
    <Overlay role="dialog" aria-modal="true">
      <Dialog>
        <Body>
          <QuestionPreview onClose={onClose} explanations={explanations} />
        </Body>
        <Footer>
          <Button text="+ Add to quiz" onClick={() => onAdd(question)} />
        </Footer>
      </Dialog>
    </Overlay>,
    document.body
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
  width: min(1100px, 92vw);
  height: min(88vh, 900px);
  background: ${defaultTheme.colors.light.white};
  border-radius: 16px;
  display: grid;
  grid-template-rows: auto 1fr auto;
`;

const Body = styled.div`
  overflow: auto;
  border-radius: 16px;
`;

const Footer = styled.div`
  position: sticky; bottom: 0;
  padding: 14px 20px;
  display: flex;
  justify-content: flex-end;
  background: ${defaultTheme.colors.light.white};
  border-radius: 16px;
`;
