import { FunctionComponent } from "react";
import { styled, createGlobalStyle } from "@shira/ui";


import CloseIcon from '../CloseIcon'
import HomeIcon from '../HomeIcon'
import AboutIcon from '../AboutIcon'
import Learn from '../Learn'
import Pricing from '../Pricing'
import TakeQuiz from '../TakeQuiz'
import Features from '../Features'

import { useTranslation } from "react-i18next";

interface Props {
  onNavigate: (route: string) => void;
  onClose: () => void;
}

export const MobileMenu: FunctionComponent<Props> = ({
  onClose,
  onNavigate
}) => {
  const { t } = useTranslation()

  const handleExternalLink = (url: string) => {
    window.open(url)
  }

  return (
    <Wrapper>
      <GlobalStyle />
      <Top>
        <CloseButton onClick={onClose}>
          <CloseIcon />
        </CloseButton>              
      </Top>

      <Nav onClick={() => {
        onNavigate('/')
      }}>
        <SvgWrapper>
          <HomeIcon />
        </SvgWrapper>
        <p>
        {t('navbar.home')}
        </p>
      </Nav>

      <Nav onClick={() => {
        handleExternalLink('https://www.shira.app/features')
      }}>
        <SvgWrapper>
          <Features />
        </SvgWrapper>
        <p>
          {t('navbar.features')}
        </p>
      </Nav>

      <Nav onClick={() => {
        handleExternalLink('https://www.shira.app/pricing')
      }}>
        <SvgWrapper>
          <Pricing />
        </SvgWrapper>
        <p>
          {t('navbar.pricing')}
        </p>
      </Nav>

      <Nav onClick={() => {
        onNavigate('/')
      }}>
        <SvgWrapper>
          <TakeQuiz />
        </SvgWrapper>
        <p>
          {t('navbar.take_a_quiz')}
        </p>
      </Nav>

      <Nav onClick={() => {
        handleExternalLink('https://www.shira.app/phishing')
      }}>
        <SvgWrapper>
          <Learn />
        </SvgWrapper>
        <p>
          {t('navbar.learn')} 
        </p>
      </Nav>

      <Nav onClick={() => { handleExternalLink('https://www.shira.app/about') }}>
        <SvgWrapper>
          <AboutIcon />
        </SvgWrapper>
        <p>
        {t('navbar.about')}
        </p>
      </Nav>

      <GetStartedButton onClick={() => {
        handleExternalLink('https://www.shira.app/contact')
      }}>
        {t('navbar.get_started')}
      </GetStartedButton>
    </Wrapper>
  )
}


const GlobalStyle = createGlobalStyle`
  body {
    overflow: hidden;
  }
`

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  z-index:3;
  box-sizing: border-box;

  height: 100vh;
  width: 100vw;
  background: #52752C;
  padding: 20px;
`

const Top = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 10px;
`

const CloseButton = styled.div`
  cursor: pointer;
  background: white;
  padding: 10px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 24px;
  width: 24px;
`

const Nav = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  > p {
    font-weight: 700;
    font-size: 24px;
    color: white;
  }
`

const SvgWrapper = styled.div`
  margin-right: 20px;

  > svg {
    width: 32px;
    height: 32px;
  }
`
const GetStartedButton = styled.button`
  position: fixed;
  bottom: 40px;
  left: 20px;
  right: 20px;
  
  background: white;
  color: #333030;
  border: none;
  border-radius: 24px;
  padding: 16px 24px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

  &:hover {
    background: #f8f8f8;
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
`