import { FunctionComponent } from "react";
import styled from "styled-components";
import { Logo } from "../Icons";

interface Props {
  content: HTMLElement
}

export const Note: FunctionComponent<Props> = ({ content }) => {

  return (
    <Background>
      <LogoWrapper><Logo /></LogoWrapper>
      <NoteBox dangerouslySetInnerHTML={{ __html: content.outerHTML }} />
    </Background>
  )
}

export const NoteBox = styled.div`
  min-height: 320px;
  padding: 36px;
  box-sizing: border-box;
  border-radius: 16px;
  background: white;
  max-width: 800px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  p {
    margin: 0 0 16px 0;
  }

  img {
    display: block;
    margin: 0 auto;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    img {
      width: 100%;
    }
  }
`

const Background = styled.div`
  position: relative;
  width: 100%;
  padding: 48px 0; 
  background: ${props => props.theme.colors.light.paleGreen};
  min-height: 400px;
  border-radius: 16px;

  display: flex;
  justify-content: center;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    padding: 0;
    border: none;
    min-height: calc(100vh - 86px);
  }
`

const LogoWrapper = styled.div`
  position: absolute;
  inset-inline-start: 24px;
  top: 24px;

  > svg {
   width: 40px;
   height: 40px;
  }


  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    display: none;
  }
`