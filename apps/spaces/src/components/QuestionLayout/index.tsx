import { FunctionComponent } from 'react'
import styled from 'styled-components'
import { Question } from '../Question'

interface Props {}

export const QuestionLayout: FunctionComponent<Props> = () => {

  return (
    <Wrapper>      
      <Question />
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
