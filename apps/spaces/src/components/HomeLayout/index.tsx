import { FunctionComponent, useEffect } from "react";
import styled from 'styled-components'
import shallow from "zustand/shallow";
import { useStore } from "../../store";
import { Button } from "../Button";
import { useNavigate } from 'react-router-dom'
import { QuestionsList } from "../QuestionsList";
import { GlobalImportExport } from "../GlobalImportExport";

interface Props {}

export const HomeLayout: FunctionComponent<Props> = () => {
  const navigate = useNavigate()
  const {
    questions,
    fetchQuestions,
  } = useStore((state) => ({
    questions: state.questions,
    fetchQuestions: state.fetchQuestions,
  }), shallow)

  useEffect(() => {
    fetchQuestions()
  }, [])
  
  return (
    <Wrapper>
      <div>
        <Header>
          <h2>Shira - Admin</h2>
          <div>
            <Button text="Create question" onClick={() => {
              navigate('/question')
            }}/>          
            <div>              
              <GlobalImportExport />
            </div>
          </div>
        </Header>

        <QuestionsList 
          questions={questions}
        />
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: center;

  > div {
    width: 1024px;
  }
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`