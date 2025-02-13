import { FunctionComponent, ReactNode, useState } from "react";
import { styled } from '@shira/ui'
import { VscClose } from 'react-icons/vsc'
import { FiChevronUp, FiChevronDown } from "react-icons/fi";
import { useStore } from "../../../store";
import { Dialog } from "../Dialog";
import { useTranslation } from "react-i18next";

interface Props {
  title?: string;
  hideCloseButton?: boolean;
  action?: ReactNode;
  handleIsExpanded?: (isExpanded: boolean) => void;
  isExpanded?: boolean;
  showExplanations?: boolean;
}

export const FooterMobile: FunctionComponent<Props> = ({
  title,
  action,
  hideCloseButton,
  isExpanded,
  handleIsExpanded,
  showExplanations
}) => {
  const { t } = useTranslation()  
  const changeScene = useStore((state) => state.changeScene)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const toggleDropdown = () => {
    handleIsExpanded(!isExpanded)
  }

  console.log("------footer mobile----")
  return (
    <Container>
      <Wrapper isExpanded={isExpanded} hideCloseButton={hideCloseButton} showExplanations={showExplanations}>
        {!hideCloseButton && (
          <LeftContent>
            <CloseButton onClick={() => setIsDialogOpen(!isDialogOpen)}>
              <VscClose size={24} color='#111' />
            </CloseButton>
          </LeftContent>
        )}

        {hideCloseButton && (
          <ExpandedDropdown isExpanded={isExpanded}>
            {isExpanded && (
              <LeftContent>
                <CloseButton isExpanded={isExpanded} onClick={() => setIsDialogOpen(!isDialogOpen) }>
                  <VscClose size={24} color='#A51D0F' />
                </CloseButton>
                <ExitText>{t('quiz.exit.action_description')}</ExitText>
              </LeftContent>
            )}
            <DropdownOpen onClick={toggleDropdown}>
              {isExpanded ? (
                <FiChevronDown size={24} color='#111' />
              ) : (
                <FiChevronUp size={24} color='#111' />
              )}
            </DropdownOpen>
          </ExpandedDropdown>
        )}
        {action}
        {(isExpanded && hideCloseButton) && (
          <Title>{title}</Title>
        )}
      </Wrapper>

      <Dialog
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen} 
        title={t('quiz.exit.title')}
        description={t('quiz.exit.description')}
        action={() => { changeScene('welcome') }}
        actionDescription={t('quiz.exit.action_description')}
      />
    </Container>
  )
}

interface WrapperProps {
  isExpanded: boolean;
  hideCloseButton?: boolean;
  showExplanations?: boolean;
}

const Container = styled.div`
  position: relative;
  z-index: 99999;`

const Wrapper = styled.div<WrapperProps>`
  background: #fff;
  box-sizing: border-box;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  transition: bottom 0.3s ease;

  display: ${({ isExpanded }) => (isExpanded) ? 'block' : 'flex'};
  ${({ hideCloseButton }) => hideCloseButton && `flex-direction: row-reverse;`}
  justify-content: space-between;
  align-items: center;
  height: auto;
  min-height: 86px;
  padding: ${({ isExpanded }) => isExpanded ? '8px 20px' : '8px'};

  box-shadow: 0px -6px 10px 4px rgba(0, 0, 0, 0.15), 0px -2px 3px rgba(0, 0, 0, 0.3);
  border-radius: 20px 20px 0px 0px;

  @media (max-width:  ${props => props.theme.breakpoints.sm}) {
    padding: 8px;
  }

  ${props => props.showExplanations && `display: flex;`}
`

const LeftContent = styled.div`
  display: flex;
  align-items: center;
`

const CloseButton = styled.div<{isExpanded?: boolean}>`
  width: 48px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: $fff;
  border-right: 1px solid ${props => props.isExpanded ? 'none' : props.theme.colors.dark.mediumGrey};
  margin-right: ${props => props.isExpanded ? '0px' : '16px'};
`

const Title = styled.div`
  padding: 16px;
  color: #5F6368;
  font-weight: 400;
  font-size: 14px;
  text-align: center;
`

// padding: ${props => props.isExpanded ? '8px 0' : '0'};

const ExpandedDropdown = styled.div<{ isExpanded?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;

  ${props => !props.isExpanded && `
    position: absolute;
    padding: 0;
    height: 100%;
    top: 0;
  `}
`
const DropdownOpen = styled.div`
  margin-right: 32px;
  cursor: pointer;
`

const ExitText = styled.div`
  color: ${props => props.theme.colors.error8};
  font-weight: 600;
`

FooterMobile.defaultProps = {
  title: '',
  action: <></>
}