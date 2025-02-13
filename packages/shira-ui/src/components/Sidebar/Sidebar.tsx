import React, { useState } from 'react';
import styled from 'styled-components';
import { Logo, MenuIcon } from '../Icons';
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export interface SidebarProps {
  menuItems: Array<{
    icon: React.ReactNode;
    label: string;
    onClick: () => void;
  }>;
  onClose?: () => void;
  onCollapse: (collapsed: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ menuItems, onClose, onCollapse }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
    onCollapse(!isCollapsed)
  };

  return (
    <>
      {/* Mobile Menu Icon */}
      <MobileMenuIcon onClick={onClose}>
        <MenuIcon />
      </MobileMenuIcon>

      {/* Sidebar */}
      <Wrapper>
        <SidebarContainer $isCollapsed={isCollapsed}>
          <LogoContainer>
            <Logo />
          </LogoContainer>

          <MenuContainer>
            <MainMenu>
              {menuItems.slice(0, -1).map((item, index) => (
                <MenuItem key={index} onClick={item.onClick}>
                  <IconContainer>{item.icon}</IconContainer>
                  {!isCollapsed && <Label>{item.label}</Label>}
                </MenuItem>
              ))}
            </MainMenu>
    
            <BottomMenu>
              <MenuItem onClick={menuItems[menuItems.length - 1].onClick}>
                <IconContainer>{menuItems[menuItems.length - 1].icon}</IconContainer>
                {!isCollapsed && <Label>{menuItems[menuItems.length - 1].label}</Label>}
              </MenuItem>
            </BottomMenu>
          </MenuContainer>
        </SidebarContainer>

        <CollapseContainer>
            <CollapseButton onClick={toggleCollapse}>
                {isCollapsed ? <FiChevronRight color='#333030' size={20}/> : <FiChevronLeft color='#333030' size={20} />}
            </CollapseButton>
        </CollapseContainer>
      </Wrapper>
    </>
  );
};

const MobileMenuIcon = styled.div`
  display: none;
  padding: 10px;
  cursor: pointer;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    display: flex;
    align-items: center;
    color: ${props => props.theme.secondary.veryDark};
  }
`;

const Wrapper = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    display: flex;
`

const SidebarContainer = styled.div<{ $isCollapsed: boolean }>`
  height: 100vh;
  width: ${props => props.$isCollapsed ? '80px' : '280px'};
  background: ${props => props.theme.colors.dark.black};
  transition: width 0.3s ease;
  color: ${props => props.theme.colors.light.white};

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    display: none;
  }

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    width: 80px;
  }
`;

const CollapseContainer = styled.div`
    background-color: ${props => props.theme.colors.green3};
    display: flex;
    align-items: center;
`

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const CollapseButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.light.white};
  cursor: pointer;
  padding: 8px;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    display: none;
  }
`;

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100% - 80px); // Subtract logo container height
`;

const MainMenu = styled.div`
  padding: 20px 0;
  flex-grow: 1;
`;

const BottomMenu = styled.div`
  padding: 20px 0;
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 20px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${props => props.theme.colors.dark.darkGrey};
  }
`;

const IconContainer = styled.div`
  width: 24px;
  height: 24px;
  margin-right: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Label = styled.span`
  font-size: 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    display: none;
  }
`;