import { FunctionComponent } from "react";
import styled from 'styled-components'

interface Props {}

import ChevronDown from '../../../globalIcons/ChevronDown'
import MoreHorizontal from '../../../globalIcons/MoreHorizontal'

export const EmailTitle:FunctionComponent<Props> = () => {

  return (
    <Wrapper>
      <Content>
        <ChevronWrapper>
          <ChevronDown />
        </ChevronWrapper>
        <span>juandans01@hotmail.com</span>
        <MoreWrapper>
          <MoreHorizontal />
        </MoreWrapper>
      </Content>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-bottom: 6px;
`

const ChevronWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0 8px 0 4px;
  > svg {
    width: 14px;
    height: 14px; 
    fill: #424242;
  }

  &:hover {
    > svg {
      fill: #242424; 
    }
  }
`

const Content = styled.div`
  display: flex;
  align-items: center;
  width: 200px;
  
  > span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 14px;
    color: #242424;
    font-weight: 600;
  }
`

const MoreWrapper = styled.div`
  ${Content}:hover & {
    display: flex;
  }

  display: none;
  justify-content: center;
  border-radius: 4px;
  padding: 2px 0;
  width: 36px;
  &:hover {
    background: #ebebeb;
  }
`