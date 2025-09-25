import { FunctionComponent } from "react";
import { styled, Button, defaultTheme } from "@shira/ui";
import { createPortal } from "react-dom";
import { Question } from "../../../fetch/question_library";
import { IoClose } from "react-icons/io5";
import { QuestionReview } from "../../QuestionReview";

type Props = {
  question: Question;
  // onAdd: (q: Question) => void;
  onClose: () => void;
};

export const QuestionLibraryPreviewModal: FunctionComponent<Props> = ({
  question,
  // onAdd,
  onClose,
}) => {
  return createPortal(
    <Overlay role="dialog" aria-modal="true">
      <Dialog>
        <Header>
          <CloseWrapper onClick={onClose}>
            <IoClose
              color={defaultTheme.colors.dark.darkGrey}
              size={24}
            />
          </CloseWrapper>
        </Header>

        <Body>
          <QuestionReview />
          <div style={{ padding: 16 }}>{question.name}</div>
        </Body>

        <Footer>
          {/* <Button text="+ Add to quiz" onClick={() => onAdd(question)} /> */}
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
  grid-template-rows:
  auto 1fr auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
`;

const Body = styled.div`
  overflow: auto;
  background: ${defaultTheme.colors.light.paleGrey};
`;

const Footer = styled.div`
  position: sticky; bottom: 0;
  padding: 14px 20px;
  display: flex;
  justify-content: flex-end;
  background: ${defaultTheme.colors.light.white};
  border-top: 1px solid #ececec;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
`;

const CloseWrapper = styled.div`
  padding: 0 8px;
  margin: 0 20px;
  cursor: pointer;
  display: flex; 
  align-items: center;
`