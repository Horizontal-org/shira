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
  padding: 36px;
  box-sizing: border-box;
  border-radius: 16px;
  background: white;
  max-width: 800px;
  width: 100%;
  
  p {
    margin: 0 0 16px 0;
  }

  img {
    display: block;
    margin: 0 auto;
  }
`

const Background = styled.div`
  position: relative;
  width: 100%;
  padding: 48px 0; 
  background: ${props => props.theme.colors.light.paleGreen};
  min-height: 800px;
  border-radius: 16px;

  display: flex;
  justify-content: center;
`

const LogoWrapper = styled.div`
  position: absolute;
  left: 24px;
  top: 24px;

  > svg {
   width: 64px;
   height: 64px;
  }
`