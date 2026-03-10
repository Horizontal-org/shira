import React, { useState } from 'react';
import styled from 'styled-components';
import { Logo, MenuIcon } from '../Icons';
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const bottomMenuLabels = ['Settings', 'Support', 'Log out'];

export interface SidebarProps {
  menuItems: Array<{
    icon: React.ReactNode;
    label: string;
    onClick: () => void;
  }>;
  selectedItemLabel?: string;
  onClose?: () => void;
  onCollapse: (collapsed: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ menuItems, onClose, onCollapse, selectedItemLabel }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const topMenuItems = menuItems
    .filter(item => !bottomMenuLabels.includes(item.label));

  const bottomMenuItems = bottomMenuLabels
    .map(label => menuItems.find(item => item.label === label));

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
              {topMenuItems.map((item, index) => (
                <MenuItem
                  key={index}
                  onClick={item.onClick}
                  isSelected={selectedItemLabel === item.label}
                >
                  <IconContainer>{item.icon}</IconContainer>
                  {!isCollapsed && <Label>{item.label}</Label>}
                </MenuItem>
              ))}
            </MainMenu>

            <BottomMenu>
              {bottomMenuItems.map((item, index) => (
                <MenuItem
                  key={index}
                  onClick={item.onClick}
                  isSelected={selectedItemLabel === item.label}
                >
                  <IconContainer>{item.icon}</IconContainer>
                  {!isCollapsed && <Label>{item.label}</Label>}
                </MenuItem>
              ))}
            </BottomMenu>
          </MenuContainer>
        </SidebarContainer>

        <CollapseContainer onClick={toggleCollapse}>
          <CollapseButton>
            {isCollapsed ? <FiChevronRight color='#333030' size={20} /> : <FiChevronLeft color='#333030' size={20} />}
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
  width: ${props => props.$isCollapsed ? '80px' : '228px'};
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
    cursor: pointer;
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

const MenuItem = styled.div<{ isSelected?: boolean }>`
  display: flex;
  align-items: center;
  padding: 12px 26px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${props => props.theme.colors.dark.darkGrey};
  }

  ${props => props.isSelected && `
    background: ${props.theme.colors.green3};
    color: ${props.theme.colors.dark.black};

    > div {
        color: ${props.theme.colors.dark.black};

      > svg {
        color: inherit;
      }
    }

    &:hover {
      background-color: ${props => props.theme.colors.dark.darkGrey};
      color: white;

      > div {
        color: white;

        > svg {
          color: inherit;
        }
      }
    }
  `}
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
