import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Button } from '../Button';
import { SubHeading2 } from '../Typography';

export interface ModalProps {
  isOpen: boolean;
  title: string;
  titleIcon?: React.ReactNode;
  children: React.ReactNode;
  primaryButtonText: string;
  primaryButtonDisabled?: boolean;
  onPrimaryClick: () => void;
  type?: ModalType
  secondaryButtonText: string;
  onSecondaryClick?: () => void;
  onLeftClick?: () => void
  leftButtonText?: string
  className?: string;
}

export enum ModalType {
  Danger = 'danger',
  Primary = 'primary',
}

const modalTypeColors = {
  'danger': '#BF2E1F',
  'primary': '#849D29'
}


export const Modal: React.FC<ModalProps> = ({
  isOpen,
  title,
  titleIcon = (<></>),
  children,
  primaryButtonText,
  primaryButtonDisabled,
  secondaryButtonText,
  onPrimaryClick,
  onSecondaryClick,
  onLeftClick,
  leftButtonText,
  className,
  type = 'primary'
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

  if (!isOpen) return null;

  return (
    <>
      <Overlay>
        <ModalContainer className={className}>
          <Header>
            { titleIcon }
            <SubHeading2>{title}</SubHeading2>
          </Header>

          <Content>
            {children}
          </Content>

          <Footer>
            <div>
              { onLeftClick && (
                <Button  
                  text={leftButtonText}
                  type='primary'
                  color={modalTypeColors[ModalType.Danger]}
                  onClick={onLeftClick}
                />
              )}
            </div>
            <div>
              { onSecondaryClick && (
                <Button
                  text={secondaryButtonText}
                  type="outline"
                  onClick={onSecondaryClick}
                />
              )}
              <Button
                text={primaryButtonText}
                type="primary"
                disabled={primaryButtonDisabled}
                onClick={onPrimaryClick}
                color={modalTypeColors[type]}
              />
            </div>
          </Footer>
        </ModalContainer>
      </Overlay>
    </>
  );
};


const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${props => props.theme.colors.dark.overlay};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: ${props => props.theme.colors.light.white};
  border-radius: 16px;

  width: 480px;
  display: flex;
  flex-direction: column;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    width: 90%;
    min-width: unset;
    margin: 20px;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  column-gap: 12px;
  padding: 24px;
  padding-bottom: 0;
`;

const Content = styled.div`
  padding: 24px;
  overflow-y: auto;
  flex-grow: 1;
`;

const Footer = styled.div`
  padding: 24px;
  display: flex;
  justify-content: space-between;

  > div {
    display: flex;
    gap: 12px; 
  }
`;

export default Modal;