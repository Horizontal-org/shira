import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useEscapeClose } from '../../hooks';

export interface FullScreenModalProps {
  id?: string;
  isOpen: boolean;
  children: React.ReactNode;
  onClose?: () => void;
  closeOnOverlayClick?: boolean;
  className?: string;
}

export const FullScreenModal: React.FC<FullScreenModalProps> = ({
  id,
  isOpen,
  children,
  onClose,
  closeOnOverlayClick = false,
  className,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEscapeClose({
    when: isOpen,
    onClose: onClose ?? (() => {}),
  });

  if (!isOpen) return null;

  return (
    <Overlay
      id={id}
      onClick={() => {
        if (closeOnOverlayClick) {
          onClose?.();
        }
      }}
    >
      <Dialog
        className={className}
        role="dialog"
        aria-modal="true"
        onClick={(event) => event.stopPropagation()}
      >
        {children}
      </Dialog>
    </Overlay>
  );
};

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: ${props => props.theme.colors.dark.overlay};
  display: grid;
  place-items: center;
  z-index: 1000;
`;

const Dialog = styled.div`
  width: 100%;
  height: 100%;
  max-width: 98vw;
  max-height: 98vh;
  max-height: 98dvh;
  margin: 0 10px;
  background: ${props => props.theme.colors.light.white};
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export default FullScreenModal;
