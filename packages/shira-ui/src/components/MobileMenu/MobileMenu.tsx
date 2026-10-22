import { FunctionComponent } from "react";
import { styled } from "styled-components"

import { AboutIcon, HomeIcon } from "../Icons"
import { CloseButton } from "../CloseButton";

export interface MobileMenuProps {
  onNavigate: (route: string) => void;
  onClose: () => void;
  showLogInButton?: boolean;
  translatedTexts: {
    home: string;
    about: string;
    logIn: string;
    createSpace: string;
  };
}

export const MobileMenu: FunctionComponent<MobileMenuProps> = ({
  onClose,
  onNavigate,
  showLogInButton = true,
  translatedTexts
}) => {

  return (
    <Wrapper>
      <Top>
        <CloseButton
          aria-label="Close menu"
          onClick={onClose}
          size={44}
          iconSize={16}
        />
      </Top>

      <Nav onClick={() => {
        onNavigate('/')
      }}>
        <SvgWrapper>
          <HomeIcon />
        </SvgWrapper>
        <p>
          {translatedTexts.home}
        </p>
      </Nav>
      <Nav onClick={() => {
        onNavigate('/about')
      }}>
        <SvgWrapper>
          <AboutIcon />
        </SvgWrapper>
        <p>
          {translatedTexts.about}
        </p>
      </Nav>

      {showLogInButton && (
        <Nav onClick={() => {
          onNavigate('/login')
        }}>
          <SvgWrapper>
            <AboutIcon />
          </SvgWrapper>
          <p>
            {translatedTexts.logIn}
          </p>
        </Nav>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  inset-inline-start: 0;
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
  margin-inline-end: 20px;

  > svg {
    width: 32px;
    height: 32px;
  }
`
