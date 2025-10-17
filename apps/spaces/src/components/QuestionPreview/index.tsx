import { FunctionComponent, useEffect, useState } from "react";
import { Button, styled, Body1, defaultTheme } from "@shira/ui";
import "../../fonts/GoogleSans/style.css";
import "../../fonts/Segoe/style.css";
import { MdBlock } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { Explanation, QuestionToDuplicate } from "../../fetch/question_library";
import { AppLayout } from "./AppLayout";
import { FiPlus } from "react-icons/fi";

export type UIExplanation = {
  index: string;
  text: string;
  position: string;
};

interface Props {
  question?: QuestionToDuplicate;
  onClose?: () => void;
  explanations: Explanation[];
  onAdd: () => void;
}

export const QuestionPreview: FunctionComponent<Props> = ({ 
  question, 
  onClose, 
  explanations,
  onAdd
}) => {
  const [explanationNumber, setExplanationNumber] = useState<number>(0);
  const [explanationsOrder, handleExplanationsOrder] = useState<Array<number>>([]);
  const [showExplanations, handleShowExplanations] = useState<boolean>(false);

  useEffect(() => {
    const order = explanations
      .sort((a, b) => a.position - b.position)
      .map((e) => e.index);
    handleExplanationsOrder(order);
  }, [explanations]);

  if (!question) return null;

  const mapToUIExplanations = (items: Explanation[]): UIExplanation[] =>
    items.map((e) => ({
      position: e.position.toString(),
      text: e.text,
      index: e.index.toString(),
    }));

  return (
    <>
      <ExplanationHeader>
        <CloseWrapper onClick={onClose}>
          <IoClose color={defaultTheme.colors.dark.darkGrey} size={22} />
        </CloseWrapper>

        <Header>
          {explanations.length === 0 ? (
            <IsNoExplanationWrapper>
              <Content>
                <MdBlock size={18} color={defaultTheme.colors.error6} />
                <Body1>There are no explanations for this question.</Body1>
              </Content>
            </IsNoExplanationWrapper>
          ) : (
            <Button
              type="outline"
              onClick={() => {
                if (showExplanations) {
                  setExplanationNumber(0)
                }
                handleShowExplanations(!showExplanations)
              }}
              text={showExplanations ? 'Hide explanations' : 'Show explanations'}
            />
          )}

          {showExplanations && (
            <ExplanationButtonWrapper>
              {explanationNumber >= 1 && (
                <Button
                  onClick={() => {
                    setExplanationNumber(explanationNumber - 1)
                  }}
                  text='Previous explanation'
                />
              )}
              {explanationNumber < explanations.length - 1 && (
                <Button
                  onClick={() => {
                    setExplanationNumber(explanationNumber + 1)
                  }}
                  text='Next explanation'
                />
              )}
            </ExplanationButtonWrapper>
          )}

          <SubmitButtonWrapper>
            <Button
              aria-label="Add to quiz"
              leftIcon={<FiPlus size={16} />}
              text="Add to quiz"
              onClick={onAdd}
            />
          </SubmitButtonWrapper>
        </Header>
      </ExplanationHeader>

      <StyledBox>
        <AppLayout
          appName={question.app.name}
          content={question.content}
          explanations={mapToUIExplanations(explanations)}
          explanationNumber={explanationsOrder[explanationNumber]}
          showExplanations={showExplanations}
        // images={images}
        />
        {showExplanations && <Overlay />}
      </StyledBox>
    </>
  );
};

const ExplanationHeader = styled("div")`
  display: flex;
  align-items: center;
  padding: 16px 0;
  margin: 0 20px;
`;

const Header = styled("div")`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 12px;
`;

const StyledBox = styled("div")`
  position: relative;
  flex: 1;
  min-height: 0;
  z-index: 1;
  background: ${defaultTheme.colors.light.white};
  width: 100%;
  box-sizing: border-box;
  padding: 0 20px;
  overflow: auto;
`;

const ExplanationButtonWrapper = styled("div")`
  display: flex;
  gap: 12px;
`;

const IsNoExplanationWrapper = styled("div")`
  width: fit-content;
  margin: 12px 0;
  background: ${defaultTheme.colors.light.white};
  border-radius: 100px;
`;

const Overlay = styled("div")`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
`;

const Content = styled("div")`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 20px;
  padding: 16px 20px;
  gap: 12px;
  background: ${defaultTheme.colors.light.paleGrey};
`;

const CloseWrapper = styled("div")`
  display: flex;
  align-items: center;
  padding: 16px 20px;
  cursor: pointer;
`;


const SubmitButtonWrapper = styled.div`
  padding-left: 12px;
  border-left: 1px solid rgb(172, 173, 174)
`