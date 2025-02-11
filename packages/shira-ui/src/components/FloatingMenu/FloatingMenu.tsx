import { FunctionComponent, useEffect, useRef, useState } from 'react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { styled } from 'styled-components'

export interface FloatingMenuProps {
  isOpen: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onClose: () => void;
  anchorEl: HTMLButtonElement | null
}

export const FloatingMenu: FunctionComponent<FloatingMenuProps> = ({
  isOpen,
  onEdit,
  onDelete,
  onClose,
  anchorEl
}) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, right: "-100px" });

  useEffect(() => {
    if (isOpen && anchorEl) {
      const rect = anchorEl.getBoundingClientRect();
      setPosition({
        top: rect.bottom + 8,
        right: `-${120 - (window.innerWidth - rect.right)}px`
      });
    }
  }, [isOpen, anchorEl]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent | Event) {
        if (menuRef.current && event.target instanceof Node && !menuRef.current.contains(event.target)) {
            onClose();
        }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <MenuWrapper ref={menuRef} style={{ ...position }}>
      <MenuContent>
        <MenuButton 
          onClick={onEdit}
        >
          <FiEdit2 size={16} />
          Edit
        </MenuButton>
        <MenuButton 
          onClick={onDelete}
        >
          <FiTrash2 size={16} />
          Delete
        </MenuButton>
      </MenuContent>
    </MenuWrapper>
  );
}

const MenuWrapper = styled.div`
  position: absolute;
  z-index: 50;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  border: 1px solid ${props => props.theme.colors.dark.mediumGrey};
`;

const MenuContent = styled.div`
  width: 120px;
  padding: 4px 0;
`;

const MenuButton = styled.button`
  width: 100%;
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

  &:hover {
    background: ${props => props.theme.colors.light.paleGrey};
    color: ${props => props.theme.colors.dark.black};
  }
`;