import { FunctionComponent } from 'react'
import styled from 'styled-components'

interface Props {
  data: Element
}

export const Message:FunctionComponent<Props> = ({ data }) => {
  return (
    <Wrapper >
      <Content dangerouslySetInnerHTML={{__html: data.outerHTML}}>
      </Content>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  padding: 4px 16px;
  position: relative;
`

const Content = styled.div`
  width: fit-content;
  max-width: 80%;
  text-align: left;
  background: #70BEDF;
  border-radius: 8px;
  font-size: 14px;
  color: #1F1F20;
  padding: 8px 12px;

  h1, h2, h3, h4, h5 {
    font-size: 14px;
    margin: 2px;
  }

  p {
    margin: 2px;
  }

  a{
    word-wrap: break-word;
  }

  div:after {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    border-width: 10px;
    border-style: solid;
    border-color: transparent #70BEDF transparent transparent;
    bottom: 4px;
    left: 7px;
    rotate: 90deg
}
`