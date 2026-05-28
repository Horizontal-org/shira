import { FunctionComponent } from "react";
import { styled } from "styled-components"

import { AboutIcon, HomeIcon} from "../Icons"
import { CloseButton } from "../CloseButton";

export interface MobileMenuProps {
  onNavigate: (route: string) => void;
  onClose: () => void;
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

      {/* <Nav onClick={() => {
        onNavigate('/create-space')
      }}>
        <SvgWrapper>
          <AboutIcon />
        </SvgWrapper>
        <p>
            {translatedTexts.createSpace}
        </p>
      </Nav> */}
    </Wrapper>
  )
}

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
