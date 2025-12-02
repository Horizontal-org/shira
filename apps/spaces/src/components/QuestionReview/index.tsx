import { FunctionComponent, useEffect, useState } from "react"
import { Button, styled, Body1 } from "@shira/ui"
import { getContentProps } from "./utils"
import { AppSelector } from "./components/AppSelector"

import '../../fonts/GoogleSans/style.css'
import '../../fonts/Segoe/style.css'
import { useStore } from "../../store"
import { shallow } from "zustand/shallow"
import { MdBlock } from 'react-icons/md'
import { ActiveQuestion } from "../../store/types/active_question"
import { useTranslation } from "react-i18next"

interface Props {
  question?: ActiveQuestion
}

export const QuestionReview: FunctionComponent<Props> = ({ }) => {
  const {
    activeQuestion,
    explanations
  } = useStore((state) => ({
    explanations: state.explanations,
    activeQuestion: state.activeQuestion
  }), shallow)

  const { t } = useTranslation();

  const [elementProps, handleElementProps] = useState(null)
  const [explanationNumber, setExplanationNumber] = useState<number>(0)
  const [explanationsOrder, handleExplanationsOrder] = useState<Array<number>>([])
  const [showExplanations, handleShowExplanations] = useState<boolean>(false)

  useEffect(() => {
    const order = explanations
      .sort((a, b) => a.position - b.position)
      .map(e => e.index)

    handleExplanationsOrder(order)

    if (activeQuestion && activeQuestion.app) {
      const contentProps = getContentProps(activeQuestion.app.name, activeQuestion)
      console.log("🚀 ~ QuestionReview ~ contentProps:", contentProps)

      handleElementProps({
        ...contentProps
      })
    }
  }, [])

  if (!activeQuestion || !elementProps) {
    return
  }
  return (
    <>
      <ExplanationHeader id="explanation-header">
        {explanations.length === 0 ? (
          <IsNoExplanationWrapper>
            <Content>
              <MdBlock size={18} color="red" />
              <Body1 id="no-explanations-message">{t("preview.no_explanations")}</Body1>
            </Content>
          </IsNoExplanationWrapper>
        ) : (
          <Button
            id="toggle-explanations-button"
            type="outline"
            onClick={() => {
              if (showExplanations) {
                setExplanationNumber(0)
              }
              handleShowExplanations(!showExplanations)
            }}
            text={showExplanations ? t("preview.hide_explanations") : t("preview.show_explanations")}
          />
        )}

        {showExplanations && (
          <ExplanationButtonWrapper id="explanation-button-wrapper">
            {explanationNumber >= 1 && (
              <Button
                id="previous-explanation-button"
                onClick={() => {
                  setExplanationNumber(explanationNumber - 1)
                }}
                text={t("preview.previous_explanation")}
              />
            )}
            {explanationNumber < explanations.length - 1 && (
              <Button
                id="next-explanation-button"
                onClick={() => {
                  setExplanationNumber(explanationNumber + 1)
                }}
                text={t("preview.next_explanation")}
              />
            )}
          </ExplanationButtonWrapper>
        )}
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

const ExplanationHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin: 12px 0 20px 0;
`

const StyledBox = styled.div`
  position: relative;
  z-index: 1;
  background: white;
  padding: 24px;
  width: 100%;
  height: 800px;
  box-sizing: border-box;
`

const ExplanationButtonWrapper = styled.div`
  display: flex;
  gap: 12px;
  margin-left: 12px;
`

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
  height: 800px;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
`

const IsNoExplanationWrapper = styled.div`
  width: fit-content;
  margin: 12px 0;
  padding: 16px 20px;
  background: #fff;
  border-radius: 20px;
`

const Content = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`
