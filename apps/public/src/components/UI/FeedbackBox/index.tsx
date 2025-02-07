import { FunctionComponent } from 'react'
import { styled } from '@horizontal-org/shira-ui'
import { Pill } from '../Pill'

import { TextAreaInput } from '../TextArea'
import { useTranslation } from 'react-i18next'

interface Props {
  easyness: string;
  recommend: string;
  improve: string;
  onEasyness: (e: string) => void
  onRecommend: (r: string) => void
  onImprove: (i: string) => void 
}

const icons = {
  sad: '🙁',
  unsure: '😕',
  easy: '🙂',
  veryEasy: '😀'
}

export const FeedbackBox: FunctionComponent<Props> = ({
  easyness,
  onEasyness,
  recommend,
  onRecommend,
  improve,
  onImprove
}) => {
  const { t } = useTranslation()

  return (
    <Wrapper>
      <Item>
        <p>{ t('feedback.box.question_1.title') }</p>
        <PillWrapper>
          <Pill 
            onClick={() => { onEasyness('very-complicated')}}
            label={ t('feedback.box.question_1.very_complicated') }
            icon={icons.sad}
            selected={easyness === 'very-complicated'}
          />
          <Pill 
            onClick={() => { onEasyness('complicated')}}
            label={ t('feedback.box.question_1.complicated') }
            icon={icons.unsure}
            selected={easyness === 'complicated'}
          />
          <Pill 
            onClick={() => { onEasyness('easy')}}
            label={ t('feedback.box.question_1.easy') }
            icon={icons.easy}
            selected={easyness === 'easy'}
          />
          <Pill 
            onClick={() => { onEasyness('very-easy')}}
            label={ t('feedback.box.question_1.very_easy') }
            icon={icons.veryEasy}
            selected={easyness === 'very-easy'}
          />
        </PillWrapper>
      </Item>
      <Item>
        <p>{ t('feedback.box.question_2.title') }</p>
        <PillWrapper>
          <Pill 
            onClick={() => { onRecommend('not-likely')}}
            label={ t('feedback.box.question_2.not_likely') }
            icon={icons.sad}
            selected={recommend === 'not-likely'}
          />
          <Pill 
            onClick={() => { onRecommend('somewhat-likely')}}
            label={ t('feedback.box.question_2.somewhat_likely') }
            icon={icons.unsure}
            selected={recommend === 'somewhat-likely'}
          />
          <Pill 
            onClick={() => { onRecommend('likely')}}
            label={ t('feedback.box.question_2.likely') }
            icon={icons.easy}
            selected={recommend === 'likely'}
          />
          <Pill 
            onClick={() => { onRecommend('very-likely')}}
            label={ t('feedback.box.question_2.very_likely') }
            icon={icons.veryEasy}
            selected={recommend === 'very-likely'}
          />
        </PillWrapper>
      </Item>
      <Item>
        <p>{t('feedback.box.question_3.title')}</p>
        <TextAreaInput 
          onChange={(e) => { onImprove(e.target.value)}}
          placeholder={t('feedback.box.question_3.input_placeholder')}
          value={improve}
        />
      </Item>
      <Item>
        <BottomText>
          <i>{t('feedback.box.bottom_text')}</i>
        </BottomText>
      </Item>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 600px;
  padding: 16px 32px;
  flex-grow: 2;
  flex-shrink: 0;
  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    margin-top: 32px;
    padding: 0;
    width: 100%;
    border-top: 1px solid ${props => props.theme.secondary.dark};
  }

  @media(max-width: ${props => props.theme.breakpoints.md} ) {
    width: 100%;
    padding: 0;
  }

  @media(min-width: ${props => props.theme.breakpoints.md}) {
    border: none;
    margin: 0 auto;
    width: 90%;
  }

  @media (min-width: ${props => props.theme.breakpoints.xs}) and (max-width: 1200px) {
    padding-top: 0px;
  }
`

const PillWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    display: block;
  }
`

const Item = styled.div`
  padding-top: 16px;

  @media (min-width: ${props => props.theme.breakpoints.xs}) and (max-width: 1200px) {
    padding-top: 8px;
  }

  @media(min-width: ${props => props.theme.breakpoints.md}) and (max-height: 680px) {
    padding-top: 2px;
  }

  p {
    color: ${ props => props.theme.colors.dark.black};
  }
`

const BottomText = styled.p`
  text-align: center;
`