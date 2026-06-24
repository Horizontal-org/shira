import { FunctionComponent, useEffect, useRef, useState, useLayoutEffect, cloneElement, ReactElement } from 'react';
import { styled } from 'styled-components';
import { createPortal } from 'react-dom';

interface MenuElement {
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
  text: string
  icon?: ReactElement | undefined;
  size?: number;
}

export interface BaseFloatingMenuProps {
  isOpen: boolean;
  elements: Array<MenuElement>
  onClose: () => void;
  anchorEl: HTMLButtonElement | null;
  width?: number;
}

export const BaseFloatingMenu: FunctionComponent<BaseFloatingMenuProps> = ({
  isOpen,
  elements,
  onClose,
  anchorEl,
  width
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
        const menuWidth = width ?? menuRef.current?.offsetWidth ?? 0;

        let top = rect.bottom + window.scrollY + 8;
        let left = rect.left + window.scrollX;

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
  }, [isOpen, anchorEl, width]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent | Event) {
      if (menuRef.current && event.target instanceof Node &&
        !menuRef.current.contains(event.target) &&
        anchorEl && !anchorEl.contains(event.target)) {
        onClose();
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);

      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          mutation.addedNodes.forEach((node) => {
            if (node instanceof Element) {
              if (node.getAttribute('role') === 'dialog' ||
                node.querySelector('[role="dialog"]') ||
                node.classList.contains('modal') ||
                node.querySelector('.modal')) {
                onClose();
              }
            }
          });
        });
      });

      observer.observe(document.body, { childList: true, subtree: true });

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('keydown', handleKeyDown);
        observer.disconnect();
      };
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, anchorEl]);

  if (!isOpen || !portalContainer) return null;

  return createPortal(
    <MenuWrapper
      ref={menuRef}
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
        ...(width ? { width: `${width}px` } : {})
      }}
    >
      <MenuContent>
        {elements.map((e, i) => (
          <MenuButton
            onClick={e.onClick}
            key={i}
          >
            {e.icon && (
              <IconContainer>
                {cloneElement(e.icon, {
                  size: e.size ?? e.icon.props.size ?? 16,
                })}
              </IconContainer>
            )}
            <MenuLabel>{e.text}</MenuLabel>
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
  display: grid;
  grid-template-columns: 24px 1fr;
  align-items: center;
  gap: 8px;
  color: ${props => props.theme.colors.dark.darkGrey};
  font-size: 14px;
  font-weight: 400;

  &:hover {
    background: ${props => props.theme.colors.light.paleGrey};
  }
`;

const IconContainer = styled.span`
  width: 24px;
  min-width: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: inherit;
`;

const MenuLabel = styled.span`
  display: flex;
  align-items: center;
  color: inherit;
`;
