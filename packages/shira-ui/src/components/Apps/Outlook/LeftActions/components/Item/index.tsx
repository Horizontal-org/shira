import { FunctionComponent, ReactNode } from "react";
import styled from 'styled-components'

interface Props {
  text: string;
  icon: ReactNode;
  amount?: number;
  selected?: boolean
}

import MoreHorizontal from '../../../globalIcons/MoreHorizontal'

export const Item:FunctionComponent<Props> = ({
  text,
  icon,
  amount,
  selected = false
}) => {

  return (
    <Content $selected={selected}>
      <LeftContent $selected={selected}>
        {icon}
        <span>{text}</span>     
      </LeftContent>
      <MoreWrapper>
        <MoreHorizontal />
      </MoreWrapper>
      { amount && (
        <Amount $selected={selected}>{amount}</Amount>
      )}
    </Content>
  )
}

const Content = styled.div<{
  $selected: boolean
}>`
  height: 28px;
  width: 100%;
  border-radius: 4px;
  cursor: pointer;  
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;

  &:hover {
    background: #ebebeb;
  }

  ${props => props.$selected && `
    background: #cfe4fa;
  `}
`

const LeftContent = styled.div<{
  $selected: boolean
}>`
  padding-left: 20px;
  display: flex;
  align-items: center;

  > span {
    padding-left: 6px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 12px;
    color: #242424;
    font-weight: 400;
  }

  ${props => props.$selected && `
    > span {
      font-weight: 600;
    }
  `}
`

const Amount = styled.span<{
  $selected: boolean
}>`
  ${Content}:hover & {
    display: none;
  }

  color: #242424;
  font-size: 12px;
  padding-right: 8px;

  ${props => props.$selected && `
    color: #0f548c;
    font-weight: 600;
  `}
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