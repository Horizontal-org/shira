import { FunctionComponent } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

interface Props {
  data: Element
}

const Message: FunctionComponent<Props> = ({ data }) => {
  const { t } = useTranslation('shira-ui')

  return (
    <Wrapper>
      <Content dangerouslySetInnerHTML={{ __html: data.outerHTML }}></Content>
      <span>{t('telegram.time')}</span>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  max-width: 70%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  box-sizing: border-box;

  > span {
    flex-shrink: 0;
    font-size: 13px;
    color: #8e8e93;
    font-weight: 400;
    line-height: 1.5;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    max-width: 80%;
    width: fit-content;
    flex-wrap: wrap;
    align-items: flex-end;
    gap: 0 8px;

    background: #fff;
    border-radius: 18px;
    padding: 6px 10px 6px 12px;

    > span {
      font-size: 12px;
      line-height: 1;
      color: #a0a0a5;
      margin-inline-start: auto;
      margin-bottom: 2px;
    }
  }
`

const Content = styled.div`
  overflow-wrap: break-word;
  word-break: break-word;
  position: relative;
  text-align: start;

  font-size: 16px;
  color: #000;
  line-height: 1.4;

  a {
    color: #2481cc;
  }

  h1, h2, h3, h4, h5 {
    font-size: 16px;
    margin: 0 0 10px;
  }

  p {
    margin: 0 0 12px;
  }

  p:last-child {
    margin-bottom: 0;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 17px;
    color: #000;
    line-height: 1.3;

    h1, h2, h3, h4, h5 {
      font-size: 17px;
      margin: 0 0 8px;
    }

    p {
      margin: 0 0 20px;
    }

    p:last-child, h1:last-child, h2:last-child, h3:last-child, h4:last-child, h5:last-child {
      margin-bottom: 0;
    }
  }
`

export default Message
