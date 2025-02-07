import { FunctionComponent } from 'react'
import { styled } from '@horizontal-org/shira-ui'


interface Props {
  data: Element
}

const Message:FunctionComponent<Props> = ({ data }) => {

  return (
    <Wrapper>
      <Content dangerouslySetInnerHTML={{__html: data.outerHTML}}></Content>
      <span>00:00</span>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 95%;
  display: flex;
  flex-grow: 1;
  position: relative;

  position:relative;
  display: flex;
  background: #fff;
  border-radius: 7.5px;
  padding: 6px 7px 8px 9px;
  box-shadow: 0 1px 0.5px rgba(11,20,26, .13);
  margin: 4px 0; 
  margin-right: 10px;

  > span {
    font-size: 9px;
    align-self: flex-end;
    color: #667781;
    padding-left: 22px;
    font-weight: 200;
    margin-bottom: -2px;
  }
`

const Content = styled.div`
  position: relative;
  display: inline;
  text-align: left;
  
  font-size: 14px;
  color: #111b21;
  h1, h2, h3, h4, h5 {
    font-size: 14px;
    margin: 0.8px;
  }

  p {
    margin: 0.8px;
  }
`

export default Message