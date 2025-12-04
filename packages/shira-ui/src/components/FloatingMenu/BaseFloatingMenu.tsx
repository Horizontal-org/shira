import { FunctionComponent, useEffect, useRef, useState, useLayoutEffect, cloneElement, ReactElement } from 'react';
import { styled } from 'styled-components';
import { createPortal } from 'react-dom';

interface MenuElement {
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
  text: string
  icon?: ReactElement | undefined;
}

export interface BaseFloatingMenuProps {
  isOpen: boolean;
  elements: Array<MenuElement>  
  onClose: () => void;
  anchorEl: HTMLButtonElement | null;
}

export const BaseFloatingMenu: FunctionComponent<BaseFloatingMenuProps> = ({
  isOpen,
  elements,
  onClose,
  anchorEl
}) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!document.getElementById('floating-menu-portal')) {
      const container = document.createElement('div');
      container.id = 'floating-menu-portal';
      document.body.appendChild(container);
      setPortalContainer(container);
    } else {
      setPortalContainer(document.getElementById('floating-menu-portal'));
    }

    return () => {
      const container = document.getElementById('floating-menu-portal');
      if (container && container.childNodes.length === 0) {
        document.body.removeChild(container);
      }
    };
  }, []);

  useLayoutEffect(() => {
    if (isOpen && anchorEl) {
      const updatePosition = () => {
        const rect = anchorEl.getBoundingClientRect();
        
        let top = rect.bottom + window.scrollY + 8;
        let left = rect.left + window.scrollX;
        
        const menuWidth = 120; 
        if (left + menuWidth > window.innerWidth) {
          left = rect.right - menuWidth + window.scrollX;
        }
        
        setPosition({ top, left });
      };
      
      updatePosition();
      
      window.addEventListener('scroll', updatePosition, true);
      window.addEventListener('resize', updatePosition);
      
      return () => {
        window.removeEventListener('scroll', updatePosition, true);
        window.removeEventListener('resize', updatePosition);
      };
    }
  }, [isOpen, anchorEl]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent | Event) {
      if (menuRef.current && event.target instanceof Node &&
          !menuRef.current.contains(event.target) &&
          anchorEl && !anchorEl.contains(event.target)) {
        onClose();
      }
    }
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose, anchorEl]);

  if (!isOpen || !portalContainer) return null;

  return createPortal(
    <MenuWrapper 
      ref={menuRef} 
      style={{ 
        top: `${position.top}px`, 
        left: `${position.left}px` 
      }}
    >
      <MenuContent>
        { elements.map((e, i) => (
          <MenuButton     
            onClick={e.onClick}
            key={i}
          >
            { e.icon && cloneElement(e.icon, { size: 16 })}
            { e.text }
          </MenuButton>
        ))}
      </MenuContent>
    </MenuWrapper>,
    portalContainer
  );
};

const MenuWrapper = styled.div`
  position: absolute;
  z-index: 999999;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
`;

const MenuContent = styled.div`
  border-radius: 8px;
  overflow: hidden;
`;

const MenuButton = styled.button`
  width: 100%;
  margin: 0;
  padding: 8px 16px;
  text-align: left;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${props => props.theme.colors.dark.darkGrey};
  font-size: 14px;
  font-weight: 400;

  &:hover {
    background: ${props => props.theme.colors.light.paleGrey};
    color: ${props => props.theme.colors.dark.black};
  }
`;
