import { FunctionComponent } from "react";
import { styled, Button, defaultTheme } from "@shira/ui";
import { QuestionPreview } from "../../QuestionPreview";
import { Explanation } from "../../../fetch/question_library";
import { QuestionToDuplicate } from "../../../fetch/question_library";

type Props = {
  question: QuestionToDuplicate;
  explanations: Explanation[];
  onAdd: () => void;
  onClose: () => void;
};

export const QuestionLibraryPreviewModal: FunctionComponent<Props> = ({
  question,
  explanations,
  onAdd,
  onClose,
}) => {
  return (
    <>
      <Overlay role="dialog" aria-modal="true">
        <Dialog>
          <Body>
            <QuestionPreview 
              onAdd={onAdd}
              onClose={onClose} 
              explanations={explanations} 
              question={question} 
            />
          </Body>
          {/* <Footer>
            <FixedButtonWrapper>
              
            </FixedButtonWrapper>
          </Footer> */}
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

const Footer = styled.div`
  padding: 16px 20px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background: ${defaultTheme.colors.light.white};
  border-radius: 16px;
`;

const FixedButtonWrapper = styled.div`
  min-width: 180px;
  max-width: 300px;
`;
