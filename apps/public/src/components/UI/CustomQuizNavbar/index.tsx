import { FunctionComponent, useState } from 'react'
import { styled } from '@shira/ui'
import BigLogo  from '../Icons/BigLogo'
import { useNavigate } from 'react-router-dom'
import { MobileMenu } from './components/MobileMenu'
import MenuIcon from './components/MenuIcon'
import { useTranslation } from 'react-i18next'
import { LearnMore } from './components/LearnMore'

interface Props {
  color?: string
}
export const CustomQuizNavbar: FunctionComponent<Props> = ({ color }) => {

  let navigate = useNavigate()
  const { t } = useTranslation()

  const [mobileMenu, handleMobileMenu] = useState(false)

  return (
    <NavbarWrapper color={color}>
      <div>     
        <LeftNavbar>
          <BigLogo />          
        </LeftNavbar>
        
        <MobileRightNavbar onClick={() => {
          handleMobileMenu(true)
        }}>
          <span>
          {t('navbar.menu')}
          </span>
          <MenuIcon />
        </MobileRightNavbar>

        <RightNavbar>
          <LearnMore/>
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

const MobileRightNavbar = styled.div`
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

const RightNavbar = styled.div`

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    display: none;    
  }  

  padding: 24px;

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