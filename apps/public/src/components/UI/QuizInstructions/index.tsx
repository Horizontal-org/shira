import { FunctionComponent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { styled, Button, Modal, H2, Body1, Body3, ModalType, Body1SemiBold } from '@horizontal-org/shira-ui'
import { FiChevronRight } from 'react-icons/fi'
import LegitimateIcon from '../Icons/ThumbUp'
import UnsureIcon from '../Icons/Unsure'
import PhisingIcon from '../Icons/Alert'
import { SceneWithFooter } from '../SceneWithFooter'
import { LegitimateButton, PhisingButton, Text, UnsureButton } from '../AnswerOptions'
import { Footer } from '../Footer'
import useGetWidth from '../../../hooks/useGetWidth'

interface Props {
  onNext: () => void
  hasResults?: boolean
  hasLearner?: boolean
  isCustom?: boolean
  count?: number
}

export const QuizInstructions: FunctionComponent<Props> = ({
  onNext,
  hasResults = false,
  hasLearner = false,
  isCustom = false,
  count
}) => {
  const { width } = useGetWidth()
  const { t } = useTranslation()
  const [isLearnMoreOpen, setIsLearnMoreOpen] = useState(false)

  return (
    <SceneWithFooter>
      <Wrapper>
        <InfoWrapper>
          <H2>{t('quiz.how_it_works.title')}</H2>
          <Body1>
            {count !== undefined
              ? t('quiz.how_it_works.question_count', { count })
              : t('quiz.how_it_works.explanation_1')} {t('quiz.how_it_works.explanation_2')}
          </Body1>

          <AnswerOptionsWrapper>
            <LegitimateButton>
              <LegitimateIcon />
              <Text isExpanded={true}>{t('quiz.answers.options.legitimate')}</Text>
            </LegitimateButton>
            <UnsureButton>
              <UnsureIcon />
              <Text isExpanded={true}>{t('quiz.answers.options.unsure')}</Text>
            </UnsureButton>
            <PhisingButton>
              <PhisingIcon />
              <Text isExpanded={true}>{t('quiz.answers.options.phising')}</Text>
            </PhisingButton>
          </AnswerOptionsWrapper>

          <div>
            {isCustom && (
              <Disclaimer>
                <i>{t('quiz.how_it_works.disclaimer')} <LearnMoreLink onClick={() => setIsLearnMoreOpen(true)}>{t('quiz.how_it_works.learn_more')}</LearnMoreLink></i>
              </Disclaimer>
            )}
          </div>
        </InfoWrapper>
      </Wrapper>
      <Footer
        title={t('quiz.how_it_works.footer_title')}
        action={(
          <Button
            text={t('quiz.how_it_works.next')}
            size={width > 490 ? 'sm' : 'lg'}
            onClick={() => onNext()}
            rightIcon={<FiChevronRight size={18} />}
          />
        )}
      />
      <Modal
        isOpen={isLearnMoreOpen}
        title={t('quiz.data_collection.title')}
        type={ModalType.Secondary}
        primaryButtonText={t('quiz.data_collection.understand')}
        onPrimaryClick={() => setIsLearnMoreOpen(false)}
        secondaryButtonText={t('quiz.data_collection.learn_more')}
        onSecondaryClick={() => {
          window.open("https://shira.app/privacy-policy/", "_blank", "noopener,noreferrer")
        }}
        onClose={() => setIsLearnMoreOpen(false)}
      >
        {hasResults ? (
          <>
            <Body1>{t('quiz.data_collection.intro')}</Body1>
            <ModalContent>
              <Body1SemiBold>{t('quiz.data_collection.1_date_time')}</Body1SemiBold>
              <Body1SemiBold>{t('quiz.data_collection.2_results')}</Body1SemiBold>
              <ResultItems>
                <Body1>{t('quiz.data_collection.total_quiz_score')}</Body1>
                <Body1>{t('quiz.data_collection.your_score')}</Body1>
                {hasLearner && (<Body1>{t('quiz.data_collection.percentage_of_learners')}</Body1>)}
              </ResultItems>
            </ModalContent>
          </>
        ) : (
          <Body1>{t('quiz.data_collection.only_datetime')}</Body1>
        )}

      </Modal>
    </SceneWithFooter>
  )
}


const ModalContent = styled.div`
  padding-top: 24px;
`

const ResultItems = styled.div`
  padding-left: 12px;
`

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
    box-sizing: border-box;
    background: ${props => props.theme.colors.light.white};
    width: 555px;
    height: 574px;
    border-radius: 24px;
    padding: 48px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
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


const Disclaimer = styled(Body3)`
  color: ${props => props.theme.colors.dark.darkGrey};
  @media(max-width: ${props => props.theme.breakpoints.xs}) {
    padding-top: 20px;
  }
`

const LearnMoreLink = styled.span`
  display: inline-block;
  text-decoration: underline;
  cursor: pointer;
  color: ${props => props.theme.colors.blue7};
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
