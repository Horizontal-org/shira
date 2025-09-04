import { FunctionComponent } from "react";
import styled from 'styled-components'

import Dots from './components/Dots'
import { Search } from "./components/Search";
import { Right } from "./components/Right";

interface Props {}

export const BlueHeader:FunctionComponent<Props> = ({}) => {
  return (
    <Wrapper>
      <Left>
        <LeftIcon>
          <Dots />
        </LeftIcon>
        <Title>
          Outlook
        </Title>
      </Left>
      <Search />
      <Right />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  background: #0F6CBD;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media(max-width: ${props => props.theme.breakpoints.xs}) {
    display: none;
  }
`

const Left = styled.div`
  display: flex;
  align-items: center;
`

const LeftIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 48px;
  width: 48px;
  cursor: pointer;

  &:hover {
    background: #0C3B5E;
  }
`

const Title = styled.div`
  font-weight: 600;
  color: white;
  font-size: 16px;
  line-height: 48px;
  padding: 0 12px 0 8px;
`