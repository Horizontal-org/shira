import { FunctionComponent, useRef, useEffect } from 'react';
import { styled, Button } from '@horizontal-org/shira-ui';
import { useTranslation } from 'react-i18next';

interface Props {
  title?: string;
  description?: string;
  action?: () => void;
  actionDescription?: string;
  isOpen?: boolean;
  setIsOpen?: (isOpen: boolean) => void;
}

export const Dialog: FunctionComponent<Props> = ({ 
  title,
  description,
  action,
  actionDescription,
  isOpen,
  setIsOpen,
}) => {
  const { t } = useTranslation();
  const dialogRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dialogRef.current && !dialogRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  }

  const handleActionClick = () => {
    setIsOpen(false);
    if (action) {
      action();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [])

  return (
    <>
      {isOpen && (
        <Overlay>
          <Modal ref={dialogRef}>
            <Title>{title}</Title>
            <Description>{description}</Description>
            <ButtonContainer>
              <Button
                onClick={() => setIsOpen(false)}
                type='outline'
                text={t('quiz.exit.cancel')}
              />
              <Button
                onClick={handleActionClick}
                text={actionDescription}
              />
            </ButtonContainer>
          </Modal>
        </Overlay>
      )}
    </>
  )
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 4;
`

const Modal = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  width: 480px;

  box-shadow: 0px -3px 8px 1px rgba(0, 0, 0, 0.05), 0px -4px 8px 0px rgba(0, 0, 0, 0.03);
  border-radius: 20px;

  @media (max-width:  ${props => props.theme.breakpoints.md}) {
    width: 400px;
  }

  @media (max-width:  ${props => props.theme.breakpoints.sm}) {
    width: 360px;
  }
`

const Title = styled.h2`
  font-size: 20px;
  margin-bottom: 10px;

  @media (min-width:  ${props => props.theme.breakpoints.md}) {
    font-size: 18px;
  }
  @media (min-width:  ${props => props.theme.breakpoints.lg}) {
    font-size: 24px;
  }
`

const Description = styled.p`
  margin-bottom: 20px;
  font-weight: 400;

  @media (min-width:  ${props => props.theme.breakpoints.md}) {
    font-size: 18px;
    font-weight: 300;
  }

  @media (min-width:  ${props => props.theme.breakpoints.lg}) {
    font-size: 21px;
    font-weight: 300;
  }
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;

  > button {
    margin-left: 8px;
  }
`