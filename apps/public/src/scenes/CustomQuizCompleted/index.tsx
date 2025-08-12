import { FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'
import { Navbar } from '../../components/UI/Navbar'
import { FiHome } from 'react-icons/fi'
import { HiOutlineRefresh } from 'react-icons/hi'
import { styled, Button, Body1, Body2SemiBold, Body3, Body2Regular, Body3Bold } from '@shira/ui'
import shallow from 'zustand/shallow'
import CompletedIcon from './assets/CompletedIcon'

import { Heading } from '../../components/UI/Title'
import { useStore } from '../../store'
import { CustomQuizNavbar } from '../../components/UI/CustomQuizNavbar'


interface Props {
 quizNumber: Number
}


export const CustomQuizCompletedScene: FunctionComponent<Props> = ({quizNumber}) => {

  const { t } = useTranslation()
const {
    correctQuestions
  } = useStore((state) => ({
    correctQuestions: state.correctedQuestions,
  }), shallow)
  return (
    <Wrapper>
      <CustomQuizNavbar />
      <StyledSectionWrapper>
        <StyledSection>
          <MobileIconWrapper>
             <CompletedIcon /> 
          </MobileIconWrapper>
          <Heading>{ t('completed.title') } </Heading>
        <HeavySubtitle>
         { t('completed.heavy_subtitle_1')}
         <strong>
            { t('completed.heavy_subtitle_2', 
              {correctQuestions: correctQuestions.length, questions: quizNumber}) 
            }
         </strong>
           {t('completed.heavy_subtitle_3')}
         </HeavySubtitle>
        <InfoSubtitle>
          {t('completed.greeting_title')}
        </InfoSubtitle>
        </StyledSection>
      </StyledSectionWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
`

const HeavySubtitle = styled.p`
  font-weight: 300;
  color: ${props => props.theme.colors.dark.black};
  font-size: 18px;
  line-height: 29px;
  display: block;
  
  @media(max-width: ${props => props.theme.breakpoints.sm}) {
    font-weight: 400;
    font-size: 16px;
  }

   @media(max-width: ${props => props.theme.breakpoints.md}) {
    font-weight: 400;
    font-size: 17px;
  }
`
const InfoSubtitle = styled(HeavySubtitle)` 
  @media(max-width: ${props => props.theme.breakpoints.xs}) { 
    font-weight: 400; 
    font-size: 16px; 
    line-height: 21.79px; 
  } 
  `

const StyledSection = styled.div`
  max-width: 688px;
 display: flex;
 flex-direction: column;
 align-items: center;

 @media(max-width: ${props => props.theme.breakpoints.sm}) { 
   align-items: flex-start;
 }
`

const StyledSectionWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  align-items: center;

  @media(min-width: ${props => props.theme.breakpoints.sm}) {
    margin: 0 auto;
    width: 80vw;
    padding-top: 24px;

    h2 {
      margin-bottom: 0;
    }
  }

  @media(max-width: ${props => props.theme.breakpoints.xs}) {
    display: block;
    padding: 16px;
    padding-bottom: 0;
    box-sizing: border-box;
  }
`

const MobileIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  width:100%;

  > svg {
    width: 348px;
  }

    @media(max-width: ${props => props.theme.breakpoints.sm}) {
    > svg {
    width: 239px;
   }
    @media(max-width: ${props => props.theme.breakpoints.md}) {
    > svg {
    width: 290px;
   } 
  }
`
