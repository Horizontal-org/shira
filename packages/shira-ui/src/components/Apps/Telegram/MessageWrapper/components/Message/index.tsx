import { FunctionComponent } from 'react'
import styled from 'styled-components'

interface Props {
  data: Element
}

const Message: FunctionComponent<Props> = ({ data }) => {
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
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  box-sizing: border-box;

  > span {
    flex-shrink: 0;
    font-size: 12px;
    color: #8e8e93;
    font-weight: 400;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    max-width: 85%;
    width: fit-content;

    background: #fff;
    border-radius: 12px;
    border-top-inline-start-radius: 4px;
    padding-top: 6px;
    padding-inline-end: 7px;
    padding-bottom: 8px;
    padding-inline-start: 9px;
    box-shadow: 0 1px 0.5px rgba(11,20,26, .13);

    > span {
      font-size: 9px;
      align-self: flex-end;
      padding-inline-start: 22px;
      margin-bottom: -2px;
    }
  }
`

const Content = styled.div`
  overflow-wrap: break-word;
  word-break: break-word;
  position: relative;
  text-align: start;

  font-size: 14px;
  color: #111b21;
  line-height: 1.5;

  a {
    color: #039BE5;
  }

  h1, h2, h3, h4, h5 {
    font-size: 14px;
    margin: 0 0 10px;
  }

  p {
    margin: 0 0 12px;
  }

  p:last-child {
    margin-bottom: 0;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    display: inline;

    h1, h2, h3, h4, h5, p {
      margin: 0.8px;
    }
  }
`

export default Message
