import { FunctionComponent, useState } from 'react'
import { styled, Button } from '@shira/ui'
import Logo  from '../Icons/Logo'
import { useNavigate } from 'react-router-dom'
import { MobileMenu } from './components/MobileMenu'
import MenuIcon from './components/MenuIcon'
import { useTranslation } from 'react-i18next'

interface Props {
  color?: string
}
export const Navbar: FunctionComponent<Props> = ({ color }) => {
  let navigate = useNavigate()
  const { t } = useTranslation()

  const [mobileMenu, handleMobileMenu] = useState(false)

  const handleExternalLink = (url: string) => {
    window.location.href = url
  }

  return (
    <NavbarWrapper color={color}>
      <div>     
        <LeftNavbar>
          <Logo />
          
          <Nav>
            <Link onClick={() => { navigate('/') }}>
              {t('navbar.home')}
            </Link>

            <Link onClick={() => { handleExternalLink('https://www.shira.app/features') }}>
              {t('navbar.features')}
            </Link>

            <Link onClick={() => { handleExternalLink('https://www.shira.app/pricing') }}>
              {t('navbar.pricing')}
            </Link>

            <Link onClick={() => { navigate('/') }}>
              {t('navbar.take_a_quiz')}
            </Link>

            <Link onClick={() => { handleExternalLink('https://www.shira.app/phishing') }}>
              {t('navbar.learn')}
            </Link>
            
            <Link onClick={() => { handleExternalLink('https://www.shira.app/about') }}>
              {t('navbar.about')}
            </Link>
          </Nav>
        </LeftNavbar>

        <DesktopRightNavbar>
          <Button
              text={t('navbar.get_started')}
              type="primary"
              color='#849D29'
              onClick={() => { handleExternalLink('https://www.shira.app/contact') }}
            />
        </DesktopRightNavbar>

        
        <RightNavbar onClick={() => {
          handleMobileMenu(true)
        }}>
          <span>
          {t('navbar.menu')}
          </span>
          <MenuIcon />
        </RightNavbar>

        { mobileMenu && (
          <MobileMenu 
            onNavigate={(r) => {
              navigate(r)
              handleMobileMenu(false)
            }}
            onClose={() => { handleMobileMenu(false) }}
          />
        )}
      </div>
    </NavbarWrapper>
  )
}

const NavbarWrapper = styled.div<{color?: string}>`
  display: flex;
  justify-content: center;
  z-index: 3;
  
  > div {
    width: 1300px;     

    display: flex;
    justify-content: space-between;
  }

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    width: 100%;
  }
`

const LeftNavbar = styled.div`
  display: flex;
  align-items: center;
  padding: ${props => props.theme.spacing.md};
  position: relative;
  background: ${props => props.color ? props.color : 'transparent'};
`

const DesktopRightNavbar = styled.div`
  display: flex;
  align-items: center;
  padding: ${props => props.theme.spacing.md};

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    display: none;
  }
`

const RightNavbar = styled.div`
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    display: flex;
    align-items: center;
  }  

  display: none;
  padding: ${props => props.theme.spacing.md};
  font-weight: 600;
  color: #3F6A3A;
  cursor: pointer;

  > span {
    padding-right: 10px;
  }

  > svg {
    width: 22px;
    height: 22px;
  }
  
`

const Nav = styled.nav`
  padding-left: 5px;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    display: none;
  }
`

const Link = styled.span`
  padding-left: 40px;
  color: #333030;
  cursor: pointer;
  font-weight: 600;
`