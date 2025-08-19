import { FunctionComponent } from "react";
import styled from "styled-components";

interface Props {
  data: Element
}

export const MessagingImage:FunctionComponent<Props> = ({ data }) => {
  return (
    <Wrapper>
      <Content dangerouslySetInnerHTML={{__html: data.outerHTML}}></Content>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 8px;
  margin-top: 8px;
  width: 100%;
  display: flex;
`

const Content = styled.div`
  max-height: 200px;
  
  img {
    display: block;
    max-width: 100%;
    max-height: 200px;
    min-width: 50px;
    min-height: 30px;
    object-fit: contain;
    border-radius: 12px;
    height: 100%;

  }
`
