import React, { useState } from "react";
import { styled } from "styled-components";
import { Button } from "../Button";
import { Logo, MenuIcon } from "../Icons";
import { MobileMenu } from "../MobileMenu";

export interface NavbarProps {
  color?: string;
  onNavigate: (route: string) => void;
  translatedTexts: {
    home: string;
    about: string;
    menu: string;
    logIn: string;
    createSpace: string;
  };
}

export const Navbar: React.FC<NavbarProps> = ({
  color,
  onNavigate,
  translatedTexts,
}) => {
  const [mobileMenu, handleMobileMenu] = useState(false);

  return (
    <NavbarWrapper color={color}>
      <div>
        <LeftNavbar>
          <Logo />

          <Nav>
            <Link onClick={() => onNavigate("/")}>{translatedTexts.home}</Link>
            <Link onClick={() => onNavigate("/about")}>
              {translatedTexts.about}
            </Link>
          </Nav>
        </LeftNavbar>

        <RightSection>
          <DesktopButtons>
            <Button
              type="outline"
              onClick={() => onNavigate("/login")}
              text={translatedTexts.logIn}
            />
            <Button
              type="primary"
              onClick={() => onNavigate("/create-space")}
              text={translatedTexts.createSpace}
            />
          </DesktopButtons>

          <RightNavbar onClick={() => handleMobileMenu(true)}>
            <span>{translatedTexts.menu}</span>
            <MenuIcon />
          </RightNavbar>
        </RightSection>

        {mobileMenu && (
          <MobileMenu
            onNavigate={(r) => {
              onNavigate(r);
              handleMobileMenu(false);
            }}
            onClose={() => handleMobileMenu(false)}
            translatedTexts={translatedTexts}
          />
        )}
      </div>
    </NavbarWrapper>
  );
};

const NavbarWrapper = styled.div<{ color?: string }>`
  margin-top: 8px;
  display: flex;
  justify-content: center;
  z-index: 3;

  > div {
    width: 1300px;
    display: flex;
    justify-content: space-between;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.lg}) {
    width: 100%;
  }
`;

const LeftNavbar = styled.div`
  display: flex;
  align-items: center;
  padding: ${(props) => props.theme.spacing.md};
  position: relative;
  background: ${(props) => (props.color ? props.color : "transparent")};
`;

const RightNavbar = styled.div`
  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    display: flex;
    align-items: center;
  }

  display: none;
  padding: ${(props) => props.theme.spacing.md};
  font-weight: 600;
  color: #3f6a3a;
  cursor: pointer;

  > span {
    padding-right: 10px;
  }

  > svg {
    width: 22px;
    height: 22px;
  }
`;

const Nav = styled.nav`
  padding-left: 5px;

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    display: none;
  }
`;

const Link = styled.span`
  padding-left: 40px;
  color: #333030;
  cursor: pointer;
  font-weight: 600;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
`;

const DesktopButtons = styled.div`
  display: flex;
  gap: 16px;
  margin-right: 16px;

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    display: none;
  }
`;
