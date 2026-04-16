import { FunctionComponent } from 'react'
import { ExplanationIcon, styled } from '@shira/ui'
import ExplanationText from '../../../../icons/ExplanationText'

interface Props {
  onClick: () => void
  active: boolean
  showBorder?: boolean
  disabled?: boolean
  isText?: boolean
}

export const ExplanationButton: FunctionComponent<Props> = ({
  onClick,
  active,
  showBorder = false,
  disabled = false,
  isText = false
}) => {
  return (
    <SvgWrapper
      active={active}
      showBorder={showBorder}
      disabled={disabled}
      isText={isText}
      type="button"
      aria-pressed={active}
      onClick={onClick}
    >
      {isText ? <ExplanationText /> : <ExplanationIcon />}
    </SvgWrapper>
  )
}

interface StyledSvgWrapper {
  active: boolean
  showBorder: boolean
  disabled: boolean
  isText: boolean
}

const SvgWrapper = styled.button<StyledSvgWrapper>`
  appearance: none;
  border: none;
  border-radius: 0;
  background: transparent;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  margin-left: 12px;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${props => props.isText ? '48px' : '32px'};
  height: ${props => props.isText ? '48px' : '32px'};
  min-width: ${props => props.isText ? '48px' : '32px'};
  min-height: ${props => props.isText ? '48px' : '32px'};
  color: ${props => {
    if (props.disabled) return props.theme.colors.green2
    if (props.active) return props.theme.colors.green5
    return props.theme.colors.green4
  }};

  > svg {
    flex-shrink: 0;
  }

  ${props => props.active && props.isText && `
    color: ${props.theme.colors.green5};
    border: ${props.showBorder ? `2px solid ${props.theme.colors.green3}` : 'none'};
    background: transparent;
    box-shadow: none;
    border-radius: 0;
  `}

  ${props => props.active && !props.isText && `
    border: none;

    > svg {
      overflow: visible;
    }

    > svg path {
      stroke: ${props.theme.colors.green3};
      stroke-width: 2px;
      stroke-linejoin: round;
      paint-order: stroke fill;
    }
  `}

  ${props => props.disabled && `
    background: transparent;
    border: none;
    border-radius: 0;
    box-shadow: none;
    pointer-events: none;
    color: ${props.theme.colors.green5};
    opacity: 0.60;
  `}

  ${props => !props.disabled && `
    &:hover {
      color: ${props.theme.colors.green4};
      background: transparent;
      box-shadow: none;
      border-radius: 0;
    }

    &:focus-visible {
      outline: none;
      color: ${props.theme.colors.green5};
      border: ${props.isText ? 'none' : `2px solid ${props.theme.colors.green2}`};
      box-shadow: none;
      border-radius: 0;
    }
  `}
`;
