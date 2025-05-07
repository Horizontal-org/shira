import { FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'
import { Navbar } from '../../components/UI/Navbar'
import { FiHome } from 'react-icons/fi'
import { HiOutlineRefresh } from 'react-icons/hi'
import { styled, Button } from '@shira/ui'

import CompletedIcon from './assets/CompletedIcon'

import { Heading } from '../../components/UI/Title'
import { useStore } from '../../store'
import useGetWidth from '../../hooks/useGetWidth'
import { CustomQuizNavbar } from '../../components/UI/CustomQuizNavbar'

interface Props {}


export const CustomQuizCompletedScene: FunctionComponent<Props> = () => {

  const { t } = useTranslation()
  const { width } = useGetWidth()

  return (
    <Wrapper>
      <CustomQuizNavbar />
      <StyledSectionWrapper>
        <StyledSection>
          <Heading>{ t('completed.title') }</Heading>          
          {width < 800 && (
            <MobileIconWrapper>
              <CompletedIcon />
            </MobileIconWrapper>
          )}
          <InfoSubtitle>Thanks for using shira!</InfoSubtitle>

        </StyledSection>

        {width > 800 && (
          <div>
            <CompletedIcon />
          </div>
        )}
      </StyledSectionWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
`

const HeavySubtitle = styled.p`
  font-weight: 300;
  color: ${props => props.theme.colors.dark.black};
  font-size: 21px;
  line-height: 29px;

  @media(max-width: ${props => props.theme.breakpoints.xs}) {
    font-weight: 400;
    font-size: 24px;
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
`

const StyledSectionWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  @media(min-width: ${props => props.theme.breakpoints.sm}) {
    margin: 0 auto;
    width: 80vw;
    padding-top: 128px;

    h2 {
      margin-bottom: 0;
    }
  }

  @media(max-width: ${props => props.theme.breakpoints.xs}) {
    display: block;
    padding: 16px;
    padding-bottom: 0;
  }
`

const MobileIconWrapper = styled.div`
  display: flex;
  justify-content: center;

  > svg {
    width: 300px;
  }
`