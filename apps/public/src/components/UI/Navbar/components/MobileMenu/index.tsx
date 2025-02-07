import { FunctionComponent } from "react";
import { styled, createGlobalStyle } from "@horizontal-org/shira-ui";
import { NavigateFunction } from "react-router-dom";


import CloseIcon from '../CloseIcon'
import HomeIcon from '../HomeIcon'
import AboutIcon from '../AboutIcon'
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
        onNavigate('/about')
      }}>
        <SvgWrapper>
          <AboutIcon />
        </SvgWrapper>
        <p>
        {t('navbar.about')}
        </p>
      </Nav>
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