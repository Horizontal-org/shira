import { FunctionComponent, ReactNode } from 'react'
import { styled } from '@horizontal-org/shira-ui';

import { SectionWrapper, Wrapper } from '../SectionWrapper';
import { Subtitle } from '../Subtitle';
import { Title } from '../Title';

import QuizSetupFish from './assets/QuizSetupFish'
import QuizSetupHook from './assets/QuizSetupHook'

interface Props {
  title: string;
  subtitle?: string;
  children: ReactNode;
  size?: string;
}

export const Section: FunctionComponent<Props> = ({
  title,
  subtitle,
  children,
  size,
}) => {
  return (
    <StyledWrapper>
      

      <SectionWrapper size={size}>
        <div>
          <Title>{title}</Title>
          { subtitle && (
            <Subtitle>{subtitle}</Subtitle>
          )}
        </div>
        { children }
      </SectionWrapper>


      <SetupFish>
        <QuizSetupFish />
      </SetupFish>

      <SetupHook>
        <QuizSetupHook />
      </SetupHook>
    </StyledWrapper>
  )
}


const StyledWrapper = styled(Wrapper)`
`

const SetupHook = styled.div`
  position:fixed;
  top: 10px;
  left: 10px;

  @media(max-width: ${props => props.theme.breakpoints.md}) {
    > svg {
      width: 150px;
      height: 200px;
    }
  }

  @media(max-width: ${props => props.theme.breakpoints.xs}) {
    display: none;
  }
`

const SetupFish = styled.div`
  position:fixed;
  bottom: 10px;
  right: 0px;
  overflow: hidden;


  > svg {
    width: 500px;    
  }


  @media(max-width: ${props => props.theme.breakpoints.md}) {
    bottom: 40px;
    > svg {
      width: 300px;
      height: 200px;
    }
  }

  @media(max-width: ${props => props.theme.breakpoints.xs}) {
    display: none;
  }
`