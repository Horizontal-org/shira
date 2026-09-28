import { FunctionComponent } from "react";
import styled from "styled-components";

interface Props {
  data: Element
}

export const MessagingImage: FunctionComponent<Props> = ({ data }) => {
  return (
    <Wrapper>
      <Content dangerouslySetInnerHTML={{ __html: data.outerHTML }}></Content>
      <span>00:00</span>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  box-sizing: border-box;

  > span {
    flex-shrink: 0;
    font-size: 13px;
    color: #8e8e93;
    font-weight: 400;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    max-width: 80%;
    display: inline-block;

    background: #fff;
    border-radius: 18px;
    padding: 2px;

    > span {
      z-index: 3;
      position: absolute;
      bottom: 8px;
      inset-inline-end: 8px;
      padding: 2px 7px;
      border-radius: 10px;
      background: rgba(0, 0, 0, 0.35);
      font-size: 12px;
      line-height: 1.3;
      color: #fff;
    }
  }
`

const Content = styled.div`
  max-height: 400px;
  max-width: 60%;
  min-width: 0;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    max-width: none;
  }

  img {
    display: block;
    max-width: 100%;
    max-height: 400px;
    min-width: 50px;
    min-height: 30px;
    object-fit: contain;
    border-radius: 8px;
    height: 100%;

    @media (max-width: ${props => props.theme.breakpoints.sm}) {
      border-radius: 16px;
    }
  }
`

export default MessagingImage
