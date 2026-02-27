import { FunctionComponent, ReactNode } from "react";
import styled from 'styled-components'

interface Props {
  children: ReactNode
  selected: boolean
}

export const NavigationButton:FunctionComponent<Props> = ({ children, selected }) => {
  return (
    <Wrapper $selected={selected}>
      <Content>
        { children }
      </Content>
    </Wrapper>
  )
}

const Wrapper = styled.div<{
  $selected: boolean
}>`  
  width: 69px;
  height: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;

  ${props => props.$selected && `    
    &:after {
      transition: width 0.5s;
      content: ' ';  
      border-radius: 4px;
      width: 38px;
      height: 2px;
      background: #0F6CBD;
    }
    
    &:hover {
      &:after {
        width: 69px;
      }
    }
  `}

  &:hover {
    background: #F0F0F0;  
  }
`

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 28px;

  > span {
    font-weight: 300;
    font-size: 14px;
  }

  &:hover {    
    > span {
     font-weight: 600;
    }
  }

`