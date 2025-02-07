import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { deleteQuestion } from "../../fetch/question";
import { useStore } from "../../store";
import { Button } from "../Button";
import shallow from 'zustand/shallow';

export const QuestionsList = ({ questions }) => {
  const navigate = useNavigate()

  const {
    handleTranslationsScene,
    fetchQuestions,
  } = useStore((state) => ({
    handleTranslationsScene: state.handleTranslationsScene,
    fetchQuestions: state.fetchQuestions,
  }), shallow)

  return (
    <Wrapper>
      {questions.map((q) => (
        <QuestionWrapper key={q.id}>
          <Info>
            {`#${q.id} • ${q.name}`}
          </Info>
          <Right>
            <Phishing 
              is={q.isPhising}
            >{q.isPhising ? 'Phising' : 'Legitimate'}</Phishing>  
            <Button text="Edit"  onClick={() => navigate(`question/${q.id}`) } />
            <Separator>
              <Button 
                text="Delete" 
                onClick={async() => {
                  if(window.confirm('Sure you want to delete this question?')){
                    await deleteQuestion(q.id)
                    fetchQuestions()
                  }
                }}
              />
            </Separator>
            <Button 
              text="Manage Languages"  
              onClick={() => {
                handleTranslationsScene(q.id)
              }} 
            />
          </Right>
        </QuestionWrapper>
      ))}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding-top: 20px;
`

const QuestionWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 12px;
  background: #f9f9f9;
  border-radius: 4px;
  float: left;
  margin: 4px 0;
  justify-content: space-between;
  width: 100%;
  box-sizing: border-box;
`

const Info = styled.div`
  font-size: 20px;
  font-weight: 400;
  width: 300px;
`

const Phishing = styled.div`
  background: ${props => props.is ? '#F99C93' : '#9FB747'};
  border-radius: 4px;
  padding: 11px 16px;
  margin-right: 12px;
`

const Right = styled.div`
  display: flex; 
  justify-content: space-between;
  > div {
    width: 100px;
  }
`

const Separator = styled.div`
  padding: 0 8px;
`