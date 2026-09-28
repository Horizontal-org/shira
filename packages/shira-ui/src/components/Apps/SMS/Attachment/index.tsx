import { FunctionComponent } from "react";
import styled from 'styled-components'
import { Pic } from "../Pic";
import Document from './assets/Document'
interface Props {
  name: string;
  explanationPosition: string | null;
}

export const Attachment: FunctionComponent<Props> = ({ name, explanationPosition }) => {

  return (
    <Wrapper>
      <Pic />
      <Content data-explanation={explanationPosition}>
        <SvgWrapper><Document /></SvgWrapper>
        <Filename>
          {name}
        </Filename>
      </Content>
    </Wrapper>
  )
}

const Filename = styled.span`
  text-overflow: ellipsis;
  max-width: calc(100% - 45px);
  white-space: nowrap;
  overflow: hidden;
`
const Wrapper = styled.div`
  display: flex;
  padding: 12px 8px;
`


const Content = styled.div`
  display: flex;
  align-items: center;
  width: 50%;
  padding: 8px 12px;
  background: ${props => props.theme.colors.light.white};

  border: 1px solid #eee;
  border-radius: 12px;
  font-size: 14px;
  color: #333;
`

const SvgWrapper = styled.div`
  background: ${props => props.theme.secondary.dark};
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-inline-end: 12px;
  
  > svg {
    height: 20px;
    width: 20px;
    fill: white;
  }

  span {
    position: relative;
  }
`
