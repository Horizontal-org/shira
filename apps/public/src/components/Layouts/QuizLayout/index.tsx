import { FunctionComponent, useEffect, useState } from "react"
import { SceneWrapper } from "../../UI/SceneWrapper"
import { styled, Body1, Button, BetaBanner, H2, Link2 } from "@shira/ui"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import { ReactComponent as Hooked } from '../../../assets/HookedFish.svg';

import { useStore } from "../../../store"
import { shallow } from "zustand/shallow"
import { QuizSetupNameScene } from "../../../scenes/QuizSetupName"
import { CustomQuiz } from "./components/CustomQuiz"
import { CustomQuizCompletedScene } from "../../../scenes/CustomQuizCompleted"
import { CustomQuizNavbar } from "../../UI/CustomQuizNavbar"
import { InvalidQuiz } from "./components/InvalidQuiz"
import { useTranslation } from "react-i18next"
import { FiChevronRight } from "react-icons/fi"
import { LanguageSelect } from "../../UI/Select"
import { LANG_OPTIONS } from "./constants"

interface Props {}

export const QuizLayout: FunctionComponent<Props> = () => {
  const { t, i18n } = useTranslation()
  const { hash } = useParams()
  let navigate = useNavigate()

  const [quiz, handleQuiz] = useState(null)
  const [showUnavailable, handleShowUnavailable] = useState(false)

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
      handleQuiz(res.data)
    } catch (e) {
      handleShowUnavailable(true)
      console.log("🚀 ~ getQuiz ~ e:", e)
    }    
  }

  useEffect(() => {
    getQuiz(hash)

    return () => {
      resetAll()
    }
  }, [])

  if (showUnavailable) {
    return <InvalidQuiz />
  }

  if (!quiz) {
    return null
  }
  
  return (
    <>

      { scene === 'welcome' && (
        <SceneWrapper bg='white'>  
          
          <BetaBanner 
            url="https://shira.app/contact"
            label={t('beta.label')}
            message={t('beta.message')}
            clickHereText={t('beta.click_here')}
            feedbackText={t('beta.feedback_text')}
          />


          <CustomQuizNavbar color="#DBE3A3"/>
        
          <CenterWrapper>
            <GreenFishWrapper>
              <Hooked />
            </GreenFishWrapper>
            <StyledBox>
              <Heading>{quiz.title}</Heading>
              <Body1>
                {t('welcome.public_message')}
              </Body1>
              <Buttons>
                <LanguageSelect
                  onChange={(v) => {
                  i18n.changeLanguage(v)
                  localStorage.setItem('lang', v);
                  }}
                  autoselect
                  options={LANG_OPTIONS}
                />
                <Button 
                  text={t('welcome.start')}
                  rightIcon={<FiChevronRight size={18}/>}
                  onClick={() => { { 
                    changeScene('quiz-setup-name')} 
                  }}
                />
              </Buttons>
              <LinkWrapper>
                <Link2 href="https://shira.app" target="_blank">
                  {t('welcome.learn_more')}
                </Link2>
              </LinkWrapper>         
            </StyledBox>        
          </CenterWrapper>
        </SceneWrapper>
      )}

      { scene === 'quiz-setup-name' && (
        <QuizSetupNameScene nextSceneSlug="custom-quiz" />
      )}

      { scene === 'custom-quiz' && (
        <CustomQuiz 
          questions={quiz.quizQuestions.map((q) => q.question)}
          images={quiz.images}
        />
      )}

      { scene === 'completed' && (
        <CustomQuizCompletedScene
         quizNumber={quiz.quizQuestions.length}
         />
      )}
    </>
  )
  
}

const GreenFishWrapper = styled.div`
  display: flex;
  padding-right: 40px;
  
  > svg {
    width: 410px;
    height: 348px;  
  }

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    justify-content: flex-end;
    > svg {
      width: 280px;
      height: 275px;
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

const Heading = styled(H2)`
  color: ${props => props.theme.colors.green8}
`

const CenterWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: center;

  @media (max-width: 850px) {
    flex-grow: 0;
    flex-direction: column;
    align-items: center;

    text-align: center;
    padding: 16px;
  }
`

const StyledBox = styled.div`
  display: flex;
  flex-direction: column;
  border: none;
  gap: 24px;
`

const Buttons = styled.div`
  display: flex;
  gap: 16px;

  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    flex-grow: 0;
    flex-direction: column-reverse;
    padding: 0 32px;
  }
`

const LinkWrapper = styled.div`
  display: none;
  
  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    display: flex;
    justify-content: center;
    width: 100%;
    position: absolute;
    bottom: 20px;
    left: 0;
    right: 0;
    margin: 0 auto;
    padding: 0 16px;
    box-sizing: border-box;
    
    > * {
      color: ${props => props.theme.colors.green7};
    }
  }`