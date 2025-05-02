import { FunctionComponent, useEffect, useState } from "react"
import { SceneWrapper } from "../../UI/SceneWrapper"
import { styled, Body1, Box, Button, SubHeading1 } from "@shira/ui"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import { ReactComponent as Hooked } from '../../../assets/HookedFish.svg';
import { Navbar } from "../../UI/Navbar"

import { useStore } from "../../../store"
import { shallow } from "zustand/shallow"
import { QuizSetupNameScene } from "../../../scenes/QuizSetupName"
import { CustomQuiz } from "./components/CustomQuiz"
import { CompletedScene } from "../../../scenes/Completed"

interface Props {}

export const QuizLayout: FunctionComponent<Props> = () => {
  
  const { hash } = useParams()
  let navigate = useNavigate()

  const [quiz, handleQuiz] = useState(null)
  const [started, handleStarted] = useState(false)
  console.log("🚀 ~ started:", started)

  const {
    changeScene,
    scene,
    resetAll
  } = useStore(
    (state) => ({ 
      changeScene: state.changeScene,
      scene: state.scene,
      resetAll: state.resetAll
    }),
    shallow
  )
  

  const getQuiz = async(hash) => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/quiz/hash/${hash}`)
      handleQuiz(res.data.sort((a, b) => a.position - b.position))
    } catch (e) {
      console.log("🚀 ~ getQuiz ~ e:", e)
      navigate('/')
    }    
  }

  useEffect(() => {
    getQuiz(hash)

    return () => {
      resetAll()
    }
  }, [])

  if (!quiz) {
    return null
  }
  
  if (started) {
    return (
      <>
        { scene === 'quiz-setup-name' && (
          <QuizSetupNameScene nextSceneSlug="custom-quiz" />
        )}
  
        { scene === 'custom-quiz' && (
          <CustomQuiz 
            questions={quiz.map((q) => q.question)}
          />
        )}

        { scene === 'completed' && (
          <CompletedScene />
        )}
      </>
    )
  } else {
    return (
      <SceneWrapper bg='white'>  
        {/* using old navbar to hide space creation for now     */}
        <Navbar color="#DBE3A3"/>
      
        <CenterWrapper>
          <GreenFishWrapper>
            <Hooked />
          </GreenFishWrapper>
          <StyledBox>
            <SubHeading1>{quiz.title}</SubHeading1>
            <Body1>
              Welcome to your phishing quiz. Click on the button to get started. 
            </Body1>
            <div>
              <Button 
                text="Get started"
                color="#52752C"
                onClick={() => { { 
                  handleStarted(true)
                  changeScene('quiz-setup-name')} 
                }}
              />
            </div>         
          </StyledBox>        
        </CenterWrapper>
      </SceneWrapper>
    )
  }
  
}

const GreenFishWrapper = styled.div`
  display: flex;
  padding-right: 40px;

  @media (max-width: ${props => props.theme.breakpoints.xl}) {
    > svg {
      width: 410px;
      height: 348px;
    }
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    justify-content: flex-end;
    > svg {
      width: 432px;
      height: 366px;
    }
  }

  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    justify-content: space-evenly;
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
  
  > svg {
      width: 230px;
      height: 199px;
    }
  }
`

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