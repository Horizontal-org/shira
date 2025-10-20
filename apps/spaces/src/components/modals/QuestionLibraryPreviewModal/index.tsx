import { FunctionComponent } from "react";
import { styled, defaultTheme } from "@shira/ui";
import { QuestionPreview } from "../../QuestionPreview";
import { ExplanationDto } from "../../../fetch/question_library";
import { QuestionToDuplicate } from "../../../fetch/question_library";

type Props = {
  question: QuestionToDuplicate;
  explanations: ExplanationDto[];
  onAdd: () => void;
  onClose: () => void;
};

export const QuestionLibraryPreviewModal: FunctionComponent<Props> = ({
  question,
  explanations,
  onClose,
}) => {
  return (
    <>
      <Overlay role="dialog" aria-modal="true">
        <Dialog>
          <Body>
            <QuestionPreview 
              onClose={onClose} 
              explanations={explanations} 
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



