import { FunctionComponent, useEffect, useState } from "react"
import styled from 'styled-components'
import { SceneWrapper } from "../../UI/SceneWrapper"
import { Body1, Box, Button, SubHeading1 } from "@shira/ui"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"

interface Props {}

export const QuizLayout: FunctionComponent<Props> = () => {
  
  const { hash } = useParams()
  let navigate = useNavigate()

  const [quiz, handleQuiz] = useState(null)
  const [soon, handleSoon] = useState(null)

  const getQuiz = async(hash) => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/quiz/hash/${hash}`)
      handleQuiz(res.data)
    } catch (e) {
      console.log("🚀 ~ getQuiz ~ e:", e)
      navigate('/')
    }
    
  }

  useEffect(() => {
    getQuiz(hash)
  }, [])

  return quiz && (
    <SceneWrapper bg='white'>
      <CenterWrapper>
        <StyledBox>
          <SubHeading1>{quiz.title}</SubHeading1>
          <Body1>
            Welcome to your phishing quiz. Click on the button to get started. 
          </Body1>
          <div>
            <Button 
              text="Get started"
              color="#52752C"
              onClick={() => { handleSoon('Coming soon...') }}
            />
          </div>
          { soon && (
            <p>
              {soon}
            </p>
          )}
        </StyledBox>        
      </CenterWrapper>
    </SceneWrapper>
  )
}


const CenterWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: center;

`

const StyledBox = styled(Box)`
  text-align: center;
  background: #F3F5E4;
  border: none;
  align-items: center;
`