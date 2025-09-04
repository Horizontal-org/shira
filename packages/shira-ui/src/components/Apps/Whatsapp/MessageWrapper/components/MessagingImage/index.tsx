import { FunctionComponent } from "react";
import styled from "styled-components";

interface Props {
  data: Element
}

export const MessagingImage:FunctionComponent<Props> = ({ data }) => {
  return (
    <Wrapper>
      <Content dangerouslySetInnerHTML={{__html: data.outerHTML}}></Content>
      <span>00:00</span>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  max-width: 85%;

  position:relative;
  display: inline-block;
  
  background: #fff;
  border-radius: 7.5px;
  padding: 3px;
  box-shadow: 0 1px 0.5px rgba(11,20,26, .13);
  margin: 4px 0; 
  box-sizing: border-box;

  > span {
    z-index: 3;
    position: absolute;
    bottom: 6px;
    right: 8px;
    font-size: 9px;
    color: white;
    font-weight: 200;
  }
`

const Content = styled.div`
  max-height: 400px;
  
  img {
    display: block;
    max-width: 100%;
    max-height: 400px;
    min-width: 50px;
    min-height: 30px;
    object-fit: contain;
    border-radius: 7.5px;
    height: 100%;

  }
`
