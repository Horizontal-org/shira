import { FunctionComponent, ReactNode } from "react";
import styled from 'styled-components'

interface Props {
  children: ReactNode
  hide: 'first' | 'second' | 'never' | 'desktop';
}

export const Button:FunctionComponent<Props> = ({
  children,
  hide
}) => {
  return (
    <Wrapper hide={hide}>
      { children }
    </Wrapper>
  )
}

const Wrapper = styled.div<{
  hide: string
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 48px;
  cursor: pointer;
  gap: 12px;
  padding: 0 14px;

  > span {
    color: white;
    font-size: 14px;
    font-weight: 300; 
    padding-bottom: 1px;
  }

  &:hover {
    background: #0C3B5E;
  }

  ${props => props.hide === 'desktop' && `
    display: none;    
    @media (max-width: 915px) {
      display: flex;
    }
  `}




  ${props => props.hide === 'first' && `
    @media (max-width: 915px) {
      display: none;    
    }
  `}


  ${props => props.hide === 'second' && `
    @media (max-width: ${props.theme.breakpoints.sm}) {
      display: none;
    }
  `}
`