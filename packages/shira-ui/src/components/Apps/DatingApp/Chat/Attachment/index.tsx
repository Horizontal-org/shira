import { FunctionComponent } from "react";
import styled from 'styled-components'
import Document from './assets/Document'
interface Props {
  name: string;
  explanationPosition: string | null;
}

export const Attachment: FunctionComponent<Props> = ({ name, explanationPosition }) => {

  return (
    <Wrapper>
      <Content>
        <SvgWrapper><Document /></SvgWrapper>
        <span data-explanation={explanationPosition}>
          { name }
        </span>
      </Content>
    </Wrapper>    
  )
}

const Wrapper = styled.div`
  display: flex;
  padding: 12px 16px;
`


const Content = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  max-width: 80%;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding: 8px 12px;
  background: #70BEDF;

  border-radius: 8px;
  font-size: 14px;
  color: #333;

  div:after {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    border-width: 10px;
    border-style: solid;
    border-color: transparent #70BEDF transparent transparent;
    bottom: 0px;
    left: -7px;
    rotate: 90deg
}
`

const SvgWrapper = styled.div`
  background: ${props => props.theme.secondary.dark};
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  
  > svg {
    height: 20px;
    width: 20px;
    fill: white;
  }

  span {
    position: relative;
  }
`