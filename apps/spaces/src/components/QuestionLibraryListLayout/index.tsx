import styled from 'styled-components'
import { Button } from "../Button";

export const QuestionLibraryListLayout = ({ questions }) => {
  return (
    <Wrapper>
      {questions.map((q) => (
        <QuestionWrapper key={q.id}>
          <Info>
            {`#${q.id} • ${q.name}`}
          </Info>
          <Right>
            <Button text="Edit"/>
            <Separator>
            </Separator>
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