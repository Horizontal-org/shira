import { FunctionComponent, ReactNode } from "react";
import styled from 'styled-components'

import ChevronDown from '../../globalIcons/ChevronDown'

interface Props {
  children: ReactNode;
  chevron: boolean;
  icon: ReactNode;
  hide?: string
}

export const ActionButton:FunctionComponent<Props> = ({
  children,
  chevron,
  icon,
  hide
}) => {
  return (
    <Wrapper hide={hide}>
      <Content hide={hide} hasChevron={chevron}>
        <SvgWrapper>{ icon }</SvgWrapper>
        <span>{ children }</span>
      </Content>
      { chevron && (
        <ChevronWrapper>
          <ChevronDown />
        </ChevronWrapper>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div<{ hide?: string }>`
  height: 32px;
  display: flex;
  
  border: 1px solid transparent;
  border-radius: 4px;
  box-sizing: border-box;

  &:hover {
    border-color: #e5e5e5;
  }
`

const Content = styled.div<{
  hasChevron: boolean
  hide?: string
}>`
  box-sizing: border-box;
  border-inline-end: 1px solid transparent;
  padding: 1px 9px;
  height: 100%;
  display: flex;
  align-items: center;
  border-radius: 4px;

  > span {
    color: #242424;
    margin-inline-start: 6px;
    font-size: 14px;
    font-weight: 300;
    padding-bottom: 1px; 
  }

  &:hover {
    background-color: #fafafa;
  }

  ${props => props.hasChevron && `
    border-start-start-radius: 4px;
    border-start-end-radius: 0;
    border-end-end-radius: 0;
    border-end-start-radius: 4px;
    padding-top: 1px;
    padding-inline-end: 6px;
    padding-bottom: 1px;
    padding-inline-start: 9px;

    &:hover {
      border-color: #e5e5e5;  
    }
  `}

  @media(max-width: ${props => props.theme.breakpoints.lg}) {
    ${props => props.hide === 'first' && `
      > span {
        display: none; 
      }
    `}
  }

  @media(max-width: ${props => props.theme.breakpoints.md}) {
    ${props => props.hide === 'second' && `
      > span {
        display: none; 
      }
    `}
  }
  
`

const SvgWrapper = styled.div`
  width: 20px;
  height: 20px;
  
  > svg {
    width: 20px;
    height: 20px;
  }
`

const ChevronWrapper = styled.div`
  box-sizing: border-box;
  border-start-start-radius: 0;
  border-start-end-radius: 4px;
  border-end-end-radius: 4px;
  border-end-start-radius: 0;
  border: 1px solid transparent;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 2px;

  > svg {
    width: 12px;
    height: 12px;
    fill: #242424;
  }

  &:hover {
    background-color: #f0f0f0;  
  }
`