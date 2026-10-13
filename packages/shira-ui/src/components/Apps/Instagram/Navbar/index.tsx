import { FunctionComponent } from 'react'
import styled from 'styled-components'
import {
  LuInstagram,
  LuHouse,
  LuSquarePlay,
  LuSend,
  LuSearch,
  LuHeart,
  LuPlus,
  LuMenu,
  LuLayoutGrid
} from 'react-icons/lu'
import ProfilePicture from '../../Whatsapp/ProfilePicture'

const Navbar: FunctionComponent = () => {
  return (
    <Wrapper>
      <Logo>
        <LuInstagram />
      </Logo>

      <Items>
        <Item><LuHouse /></Item>
        <Item><LuSquarePlay /></Item>
        <Item active><LuSend /></Item>
        <Item><LuSearch /></Item>
        <Item><LuHeart /></Item>
        <Item><LuPlus /></Item>
        <Item><ProfilePicture imageSize="26px" /></Item>
      </Items>

      <Items>
        <Item><LuMenu /></Item>
        <Item><LuLayoutGrid /></Item>
      </Items>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  flex-shrink: 0;
  width: 72px;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 28px 0 20px;
  border-inline-end: 1px solid #dbdbdb;
  background: #fff;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    display: none;
  }
`

const Logo = styled.div`
  display: flex;
  padding: 12px;
  margin-bottom: auto;

  > svg {
    width: 26px;
    height: 26px;
    color: #000;
  }
`

const Items = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;

  &:last-child {
    margin-top: auto;
  }
`

const Item = styled.div<{ active?: boolean }>`
  display: flex;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background: #f2f2f2;
  }

  > svg {
    width: 26px;
    height: 26px;
    color: #000;
    fill: ${props => props.active ? '#000' : 'none'};
  }
`

export default Navbar
