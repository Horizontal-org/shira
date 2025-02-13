import { FunctionComponent, useEffect } from "react";
import { styled, Button } from '@shira/ui'
import { Navbar } from "../../components/UI/Navbar";
import { SceneWrapper } from "../../components/UI/SceneWrapper";
import { LanguageSelect } from "../../components/UI/Select";
import { FiChevronRight } from 'react-icons/fi'
import { useStore } from "../../store";
import { useTranslation } from "react-i18next";
import { Task } from "@divviup/dap";

import MailHook from '../../assets/Mailhook'
import MobileMailHook from '../../assets/MobileMailhook'
import GreenFish from '../../assets/GreenFish'

export const WelcomeScene: FunctionComponent = () => {  
  const changeScene = useStore((state) => state.changeScene)
  const { t, i18n } = useTranslation()

  useEffect(() => {
    const sendMetric = async() => {
      if (process.env.REACT_APP_ENABLE_ANALYTICS == 'yes') {
        const task = new Task({
          type: "count",
          id: "uRn1hMZ6ZmgiSY_2kalj-vMx7yh980B4yqnnwWQpTL0",
          leader: "https://dap-09-3.api.divviup.org/",
          helper: "https://helper-dap-09.shira.app/",
          timePrecisionSeconds: 300
        });
        await task.sendMeasurement(true); // your measurement here
        console.log('sent;')
      }
    }

    sendMetric()
  }, [])
  
  return (
    <SceneWrapper bg='white'>
      <Navbar />

      <MailHookWrapper>
        <MailHook />
      </MailHookWrapper>

      <CenterWrapper>
        <Content>
          <div>
            <Title>{t('welcome.title')}</Title>
            <Subtitle>{t('welcome.subtitle')}</Subtitle>

             <Buttons>
              <LanguageSelect 
                onChange={(v) => {
                  i18n.changeLanguage(v)
                  localStorage.setItem('lang', v);
                }}
                autoselect
                options={[
                  {
                    label: 'English',
                    labelEnglish: 'English',
                    value: 'en'
                  },
                  {
                    label: 'Español',
                    labelEnglish: 'Spanish',
                    value: 'es'
                  },
                  {
                    label: 'Français',
                    labelEnglish: 'French',
                    value: 'fr'
                  },
                  {
                    label: '普通话',
                    labelEnglish: 'Mandarin',
                    value: 'cn'
                  }
                ]}
              />
              <Button 
                onClick={() => { changeScene('quiz-setup-name')}} 
                text={t('welcome.start')}
                rightIcon={<FiChevronRight size={18}/>}
              />          
            </Buttons>
          </div>
          
          <GreenFishWrapper>
            <MobileMailHookWrapper>
              <MobileMailHook />
            </MobileMailHookWrapper>
            <GreenFish />
          </GreenFishWrapper>
        </Content>

      </CenterWrapper>
      <span></span>
    </SceneWrapper>
  )
}



const CenterWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: center;

`

const GreenFishWrapper = styled.div`
  display: flex;
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

const MobileMailHookWrapper = styled.div`
  display: none;

  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    display: block;

    > svg {
      width: 78px;
      height: 128px;
    }
  }
`

const MailHookWrapper = styled.div`
  position: absolute;
  top: 5vh;
  left: 50px;
  
  > svg {
    width: 200px;
    height: 330px;
  }

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    > svg {
      width: 142px;
      height: 235px;
    }
  }

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    > svg {
      width: 101px;
      height: 167px;
    }
  }

  @media(max-width: ${props => props.theme.breakpoints.lg}) and (min-width: ${props => props.theme.breakpoints.md}) {
    > svg {
      width: 101px;
      height: 167px;
    }
  }

  @media(min-width: ${props => props.theme.breakpoints.md}) and (max-height: 680px) {
    display: none;
  }


  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    > svg {
      width: 150px;
      height: 2w0px;
    }
  }

  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    display: none;
  }
`

const Content = styled.div`
  height: 500px;
  display: flex;

  @media(max-width: ${props => props.theme.breakpoints.lg}) and (min-width: ${props => props.theme.breakpoints.md}) {
    height: 480px;
  }
  @media (max-width: 850px) {
    flex-direction: column;
    align-items: center;
  }
`

const Buttons = styled.div`
  padding-top: 20px;
  display: flex;

  > button {
    margin-left: 20px;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    justify-content: center;
  }

  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    display: flex;
    flex-direction: column-reverse;
    padding: 20px 40px;

    > button {
      box-sizing: border-box;
      width: 100%;
      margin-left: 0;
      font-size: 16px;
      padding: 12px 20px;
      margin-bottom: 14px;
      > span {
        text-align: center;
        width: 100%;
      }
    }

    > div {
      width: 100%;
    }
  }
`

const Title = styled.div`
  font-size: 64px;
  font-weight: 700;
  width: 512px;
  color: ${props => props.theme.secondary.veryDark};
  box-sizing: border-box;


  @media (max-width: ${props => props.theme.breakpoints.md}) {
    width: 450px;
    text-align: left;
    font-size: 64px;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 64px;
    text-align: center;
    width: 100%;
  }

  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    width: 100%;
    padding: 0 50px;
    font-size: 40px;
    text-align: center;
  }
`

const Subtitle = styled.div`
  font-size: 24px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.8);
  padding: ${props => props.theme.spacing.md};

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: 21px;
  }

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: 18px;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 24px;
    text-align: center;
  }

  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    font-size: 16px;
    text-align: center;
  }
`