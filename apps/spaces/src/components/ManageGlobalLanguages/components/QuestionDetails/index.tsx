import { FunctionComponent, useState } from "react";
import styled from 'styled-components'
import { Question } from "../../../../fetch/question";
import { Select } from "../../../Select";
import { ControlledSelect } from "../../../ControlledSelect";
import { SmallCloseButton } from "../../../SmallCloseButton";
import { QuestionComparison } from "../../../QuestionComparison";

export interface QuestionWithLanguages {
  id: string
  question: Question            
  langs: {
    lang: string
    questionElement: any
    explanationElement: any | null
  }[],
}

interface Props {
  fileQuestion: QuestionWithLanguages
  currentQuestion: any
  onClose: () => void;
  languages: any[]
}

export const QuestionDetails: FunctionComponent<Props> = ({ 
  fileQuestion,
  currentQuestion,
  onClose,
  languages
}) => {

  const [selectedLang, handleSelectedLang] = useState({
    value: 'en',
    label: 'English'
  })
  

  return (
    <Wrapper show={!!(fileQuestion)}>
      { !!(fileQuestion) && (
        <>
         <Header>
            <div>
              <h2>View translations</h2>
            </div>
            <SmallCloseButton onClose={onClose} />
          </Header>

          <BlockWrapperSelect>
            <ControlledSelect
              onChange={(v) => {
                handleSelectedLang(v)
              }}
              selected={selectedLang}
              options={languages.map((l) => {
                return {
                  value: l.code,
                  label: l.name,
                }
              })}
            />
          </BlockWrapperSelect>

          <div>
            <QuestionComparison
              currentQuestion={currentQuestion} 
              newQuestion={fileQuestion}
              currentLang={selectedLang.value}
            />
          </div>
        </>
      )}
     
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  background: white;
  display: ${props => props.show ? 'block' : 'none'};
  position: absolute;
  top: 0;
  padding: 10px;
  box-sizing: border-box;
`


const Header = styled.div`
  display: flex;
  justify-content: space-between;
`


const BlockWrapperSelect = styled.div`
  padding-left: 4px;
`