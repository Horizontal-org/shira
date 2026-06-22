import { FunctionComponent } from "react";
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

import Navigation from './components/Navigation'
import { NavigationButton } from "./components/NavigationButton";

interface Props {}

export const TopSectionBar:FunctionComponent<Props> = () => {
  const { t } = useTranslation('shira-ui')

  return (
    <Wrapper>
      <NavigationIcon>
        <Navigation />        
      </NavigationIcon>
      <NavigationButton selected={true}>
        <span>{t('outlook.home')}</span>
      </NavigationButton>
      <NavigationButton selected={false}>
        <span>{t('outlook.view')}</span>
      </NavigationButton>
      <NavigationButton selected={false}>
        <span>{t('outlook.help')}</span>
      </NavigationButton>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  height: 34px;
  
  display: flex;
  align-items: center;

  @media(max-width: ${props => props.theme.breakpoints.xs}) {
    display: none;
  }
`

const NavigationIcon = styled.div`
  margin-left: 4px;
  cursor: pointer;
  height: 34px;
  width: 36px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #F0F0F0
  }
`