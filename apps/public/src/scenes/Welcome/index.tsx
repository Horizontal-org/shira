import { FunctionComponent, useEffect } from "react";
import { styled, Button, H2, Body1 } from '@shira/ui'
import { Navbar } from "../../components/UI/Navbar";
import { SceneWrapper } from "../../components/UI/SceneWrapper";
import { LanguageSelect } from "../../components/UI/Select";
import { FiChevronRight } from 'react-icons/fi'
import { useStore } from "../../store";
import { useTranslation } from "react-i18next";
import { Task } from "@divviup/dap";
import { ReactComponent as Hooked } from '../../assets/HookedFish.svg';


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

      <CenterWrapper>
        <GreenFishWrapper>
          <Hooked />
        </GreenFishWrapper>
        <StyledBox>
          <Heading>{t('welcome.title')}</Heading>
          <Description>{t('welcome.subtitle')}</Description>
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
        </StyledBox>
      </CenterWrapper>
      <span></span>
    </SceneWrapper>
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
  color: ${props => props.theme.secondary.veryDark};
`

const Description = styled(Body1)`
  max-width: 700px;
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