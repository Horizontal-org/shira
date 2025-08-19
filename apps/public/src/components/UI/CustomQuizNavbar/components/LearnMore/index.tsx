import { FunctionComponent } from 'react'
import { Body2Regular, styled } from '@shira/ui'
import { useTranslation } from 'react-i18next'

interface Props {}

export const LearnMore:FunctionComponent<Props> = () => {
  const { t } = useTranslation()
  return (
    <StyledText onClick={() => {
      window.location.href = 'https://shira.app'
    }}>  
      {t('welcome.learn_more')}
    </StyledText>
  )
}

const StyledText = styled(Body2Regular)`
  color: #52752C; 
  text-decoration: underline #52752C;
  cursor: pointer;
  font-weight: 700;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) { 
    color: black;
    text-decoration: none;
  }

`