import { FunctionComponent } from 'react'
import { Body2Regular, styled } from '@shira/ui'

interface Props {}

export const LearnMore:FunctionComponent<Props> = () => {
  return (
    <StyledText onClick={() => {
      window.location.href = 'https://shira.app'
    }}>  
      Learn more about Shira
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