import { FunctionComponent, } from 'react'
import { useTranslation } from 'react-i18next'
import { styled, Button } from '@horizontal-org/shira-ui'
import { Footer } from '../../components/UI/Footer'
import { PhisingButton, UnsureButton, LegitimateButton, Text } from '../../components/UI/AnswerOptions'
import LegitimateIcon from '../../components/UI/Icons/ThumbUp'
import UnsureIcon from '../../components/UI/Icons/Unsure'
import PhisingIcon from '../../components/UI/Icons/Alert'
import { SceneWithFooter } from '../../components/UI/SceneWithFooter'
import { Heading } from '../../components/UI/Title'
import { FiChevronRight } from 'react-icons/fi'
import HowItWorks from '../../components/UI/Icons/HowItWorks'
import useGetWidth from '../../hooks/useGetWidth'
interface Props {
  onNext: () => void
}

export const QuizInstructions:FunctionComponent<Props> = ({
  onNext
}) => {
  const { width } = useGetWidth()
  const { t } = useTranslation()

  return (
    <SceneWithFooter>
      <Wrapper>
        <InfoWrapper>
          <Heading>{t('quiz.how_it_works.title')}</Heading>
            <p>{t('quiz.how_it_works.explanation_1')}</p>
            <p>{t('quiz.how_it_works.explanation_2')}</p>

            <AnswerOptionsWrapper>
              <LegitimateButton>
                <LegitimateIcon />
                <Text isExpanded={true}>{ t('quiz.answers.options.legitimate') }</Text>        
              </LegitimateButton>
              <UnsureButton>
                <UnsureIcon />
                <Text isExpanded={true}>{ t('quiz.answers.options.unsure') }</Text>     
              </UnsureButton>
              <PhisingButton>
                <PhisingIcon />
                <Text isExpanded={true}>{ t('quiz.answers.options.phising') }</Text>
              </PhisingButton>
            </AnswerOptionsWrapper>
        </InfoWrapper>
      </Wrapper>
      <Footer 
        title={t('quiz.how_it_works.footer_title')}
        action={(
          <Button 
            text={t('quiz.how_it_works.next')}
            size={width > 490 ? 'sm' : 'lg'}
            onClick={() => onNext()}
            rightIcon={<FiChevronRight size={18}/>}
          />
        )}
      />
    </SceneWithFooter>
  )
}

const Wrapper = styled.div`
  position: relative;
  @media(max-width: ${props => props.theme.breakpoints.xs}) {
    text-align: center;
    margin: 25px;
  }
  @media(min-width: ${props => props.theme.breakpoints.xs}) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 80vw;
    height: 90vh;
    margin: 0 auto;
  }

  @media(min-width: ${props => props.theme.breakpoints.md}) and (max-height: 680px) {
    height: 85vh;
  }
`

const InfoWrapper = styled.div`
  @media(max-width: ${props => props.theme.breakpoints.xs}) {
    margin-top: 50px;
  }
  @media(min-width: ${props => props.theme.breakpoints.xs}) {
    background: ${props => props.theme.colors.light.white};
    min-width: 507px;
    height: 556px;
    border-radius: 24px;
    padding: 48px;
    margin: 0 auto;

    > p {
      font-family: 'Open Sans';
      font-style: normal;
      font-weight: 300;
      font-size: 21px;
      line-height: 29px;
    }
  }

  @media(min-width: ${props => props.theme.breakpoints.md}) and (max-height: 680px) {
    height: 400px;
    > h2 {
      line-height: 32px;
    }

    > p {
      font-size: 18px;
      line-height: 21px;
    }
  }
`

const AnswerOptionsWrapper = styled.div`
  border: 2px solid #F3F3F3;
  border-radius: 40px;
  
  >button {
    margin: 16px auto;
    padding: 16px;
  }

  @media(max-width: ${props => props.theme.breakpoints.xs}) {
    margin-top: 50px;
    >button {
      width: 70%;
      border-radius: 50px;
      >svg {
        margin-right: 10px;
      }
    }
  }
  @media(min-width: ${props => props.theme.breakpoints.xs}) {
    margin: 0 auto;
    width: 330px;
  
    padding: 16px;
    >button {
      width: 218px;
    }
  }

`