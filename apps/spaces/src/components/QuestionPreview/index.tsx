import { FunctionComponent, useEffect, useState } from "react";
import { Button, styled, Body1, defaultTheme } from "@shira/ui";
import { getContentProps } from "./utils";
import "../../fonts/GoogleSans/style.css";
import "../../fonts/Segoe/style.css";
import { useStore } from "../../store";
import { shallow } from "zustand/shallow";
import { MdBlock } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { ActiveQuestion } from "../../store/types/active_question";
import { AppSelector } from "../QuestionReview/components/AppSelector";
import { Explanation, Question } from "../../fetch/question_library";

interface Props {
  activeQuestion?: ActiveQuestion,
  question?: Question,
  onClose?: () => void,
  explanations: Explanation[]
}

export const QuestionPreview: FunctionComponent<Props> = ({ onClose, explanations }) => {

  const {
    activeQuestion,
  } = useStore((state) => ({
    activeQuestion: state.activeQuestion
  }), shallow);

  const [elementProps, handleElementProps] = useState(null);
  const [explanationNumber, setExplanationNumber] = useState<number>(0);
  const [explanationsOrder, handleExplanationsOrder] = useState<Array<number>>([]);
  const [showExplanations, handleShowExplanations] = useState<boolean>(false);

  useEffect(() => {
    const order = explanations
      .sort((a, b) => a.position - b.position)
      .map(e => e.index)

    handleExplanationsOrder(order);

    if (activeQuestion && activeQuestion.app) {
      const contentProps = getContentProps(activeQuestion.app.name, activeQuestion)
      console.log("🚀 ~ QuestionPreview ~ contentProps:", contentProps)

      handleElementProps({
        ...contentProps
      })
    }
  }, []);

  if (!activeQuestion || !elementProps) {
    return
  };

  return (
    <>
      <ExplanationHeader>
        <CloseWrapper onClick={onClose}>
          <IoClose
            color={defaultTheme.colors.dark.darkGrey}
            size={22}
          />
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
        </Header>

      </ExplanationHeader>

      <StyledBox>
        <AppSelector
          appName={activeQuestion.app.name}
          customProps={elementProps}
          explanationNumber={explanationsOrder[explanationNumber]}
          showExplanations={showExplanations}
          explanations={explanations}
        />
        {showExplanations && <Overlay />}
      </StyledBox>
    </>
  )
}

const ExplanationHeader = styled('div')`
  display: flex;
  align-items: center;
  padding: 16px 0;
  margin: 0 20px;
`;

const Header = styled('div')`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

const StyledBox = styled('div')`
  position: relative;
  z-index: 1;
  background: ${defaultTheme.colors.light.white};
  width: 100%;
  box-sizing: border-box;
  padding: 0 20px;
  max-height: 600px;
  overflow-y: auto;
`;

const ExplanationButtonWrapper = styled('div')`
  display: flex;
  gap: 12px;
`;

const IsNoExplanationWrapper = styled('div')`
  width: fit-content;
  margin: 12px 0;
  background: ${defaultTheme.colors.light.white};
  border-radius: 100px;
`;

const Overlay = styled('div')`
  position: absolute;
  inset: 0;
  z-index: 3;
  background: rgba(0, 0, 0, 0.5);
`;

const Content = styled('div')`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 20px;
  gap: 12px;
  background: ${defaultTheme.colors.light.paleGrey};
`;

const CloseWrapper = styled('div')`
  display: flex;
  align-items: center;
  padding: 16px 20px;
  cursor: pointer;
`;
