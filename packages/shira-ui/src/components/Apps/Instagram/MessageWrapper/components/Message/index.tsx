import { FunctionComponent } from 'react'
import styled from 'styled-components'

interface Props {
  data: Element
}

const Message: FunctionComponent<Props> = ({ data }) => {
  return (
    <Wrapper>
      <Content dangerouslySetInnerHTML={{ __html: data.outerHTML }}></Content>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  max-width: 85%;
  width: fit-content;
  background: #efefef;
  border-radius: 18px;
  padding: 8px 14px;
  box-sizing: border-box;
`

const Content = styled.div`
  overflow-wrap: break-word;
  word-break: break-word;
  position: relative;
  text-align: start;

  font-size: 14px;
  color: #000;
  line-height: 1.4;

  a {
    color: #3897f0;
  }

  h1, h2, h3, h4, h5 {
    font-size: 14px;
    margin: 0 0 8px;
  }

  p {
    margin: 0 0 8px;
  }

  p:last-child {
    margin-bottom: 0;
  }
`

export default Message
