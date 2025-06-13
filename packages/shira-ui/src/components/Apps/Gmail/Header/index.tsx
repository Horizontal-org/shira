import { FunctionComponent } from 'react'
import styled from 'styled-components'

import Search from './components/Search'
import IconWrapper from './components/IconWrapper'
import HamburgerIcon from './components/Hamburger'
import HelpIcon from './components/HelpIcon'
import SettingsIcon from './components/SettingsIcon'
import OptionsIcon from './components/OptionsIcon'
import Avatar from './components/Avatar'

interface Props {}

const Header: FunctionComponent<Props> = () => {

  return (
    <Wrapper>
      <Left>
        <SidebarWrapper>
          <HamburgerButton>
            <HamburgerIcon />
          </HamburgerButton>

          <div>
            <GmailLogo 
              src='https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x_r2.png'
              alt='gmail-logo'
            />
          </div>
        </SidebarWrapper>
        
        <SearchWrapper>
          <Search />
        </SearchWrapper>
      </Left>

      <Right>
        <IconWrapper>
          <HelpIcon />
        </IconWrapper>
        <IconWrapper>
          <SettingsIcon />
        </IconWrapper>
        <IconWrapper>
          <OptionsIcon />
        </IconWrapper>
        <AvatarWrapper>
          <Avatar />
        </AvatarWrapper>
      </Right>

    </Wrapper>
  )
}


const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    display: none;
  }
`

const HamburgerButton = styled.div`
  padding: 12px;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  cursor: pointer;
  margin: 0 4px;

  > svg {
    width: 24px;
    height: 24px;
  }

  &:hover {
    background: rgba(60,64,67,.1);
  }
`

const GmailLogo = styled.img`
  width: 109px;
  height: 40px;

`

const SidebarWrapper = styled.div`
  display: flex;
  align-items: center;
  min-width: 238px;
`

const SearchWrapper = styled.div`
  flex-grow: 1;
  flex-shrink: 0;
`

const Right = styled.div`
  display: flex;
  align-items: center;
`

const Left = styled.div`
  display: flex;
  flex: 2;
  padding-right: 40px;
`

const AvatarWrapper = styled.div`
  cursor: pointer;
  margin-left: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 40px;
  border-radius: 50%;


  > svg {
    width: 32px;
    height: 32px;
  }

  &:hover {
    background-color: rgba(60,64,67,.08);
  }
`
export default Header