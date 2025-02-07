  import { FunctionComponent, useEffect, useState } from "react";
import styled from 'styled-components'
import { GlobalLanguage } from "../../../../store/slices/global_translations";
import shallow from "zustand/shallow";
import { useStore } from "../../../../store";
import { Button } from "../../../Button";
import { getQuestionsFromFiles } from "../../../../utils/translations";

interface Props {
  translations: GlobalLanguage[]
  onShowDetails: (q) => void
}

export const QuestionsWithTranslationsList: FunctionComponent<Props> = ({
  translations,
  onShowDetails
}) => {
  const { 
    questions,
  } = useStore((state) => ({
    questions: state.questions,
  }), shallow)

  const [questionsWithTranslations, handleQuestions] = useState({})

  useEffect(() => {
    const fileQs = getQuestionsFromFiles(translations, questions)    
    handleQuestions(fileQs)
  }, [])

  return (
    <Wrapper>
      { Object.keys(questionsWithTranslations).map((qId) => (
        <QuestionWrapper key={qId}>
          <Info>
            { `#${qId} • ${questionsWithTranslations[qId].question.name}` }
          </Info>
          <Right>
            { questionsWithTranslations[qId].langs.map((l, i) => (
              <LangPill key={i}>
                { l.lang }
              </LangPill>
            ))}
            <ButtonWrapper>
              <Button 
                text="View Translations"
                onClick={() => {
                  onShowDetails(questionsWithTranslations[qId])
                }}
              />
            </ButtonWrapper>
          </Right>
        </QuestionWrapper>
      ))}
    </Wrapper>
  )
}

const  Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const QuestionWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  background: #f9f9f9;
  border-radius: 4px;
  float: left;
  margin: 4px 0;
  `

const Info = styled.div`
  font-size: 20px;
  font-weight: 400;
`

const Right = styled.div`
  display: flex;
  align-items: flex-end;
`

const LangPill = styled.div`
  background: #50AFD8;
  border-radius: 4px;
  color:white;
  font-weight: 700;
  padding: 4px;
  margin: 4px;
`

const ButtonWrapper = styled.div`
  padding-left: 12px;
`