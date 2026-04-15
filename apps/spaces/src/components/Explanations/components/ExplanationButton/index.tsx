import { FunctionComponent } from 'react'
import { ExplanationIcon, styled } from '@shira/ui'
import ExplanationText from '../../../../icons/ExplanationText'

interface Props {
  onClick: () => void
  active: boolean
  disabled?: boolean
  isText?: boolean
}

export const ExplanationButton: FunctionComponent<Props> = ({
  onClick,
  active,
  disabled = false,
  isText = false
}) => {
  return (
    <SvgWrapper
      active={active}
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
  disabled: boolean
  isText: boolean
}

const SvgWrapper = styled.button<StyledSvgWrapper>`
  appearance: none;
  border: 1px solid transparent;
  background: transparent;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  margin-left: 12px;
  border-radius: 6px;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${props => props.isText ? '48px' : '28px'};
  height: ${props => props.isText ? '48px' : '28px'};
  min-width: ${props => props.isText ? '48px' : '28px'};
  min-height: ${props => props.isText ? '48px' : '28px'};
  color: ${props => {
    if (props.disabled) return props.theme.colors.green2
    if (props.active) return props.theme.colors.green4
    return props.theme.colors.green5
  }};
  transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;

  > svg {
    flex-shrink: 0;
  }

  ${props => props.active && `
    color: ${props.theme.colors.green4};
    border-color: ${props.theme.colors.green3};
    background: ${props.isText ? 'transparent' : props.theme.secondary.base};
  `}

  ${props => props.disabled && `
    background: transparent;
    border-color: transparent;
    box-shadow: none;
    pointer-events: none;
  `}

  ${props => !props.disabled && `
    &:hover {
      color: ${props.active ? props.theme.colors.green4 : props.theme.secondary.dark};
      border-color: ${props.active ? props.theme.colors.green3 : 'transparent'};
      background: ${props.active
        ? (props.isText ? 'transparent' : props.theme.colors.green4)
        : 'transparent'};
    }

    &:focus-visible {
      outline: none;
      color: ${props.theme.colors.green5};
      background: ${props.active ? (props.isText ? 'transparent' : props.theme.secondary.base) : 'transparent'};
      border-color: ${props.theme.secondary.base};
      box-shadow: 0 0 0 3px ${props.theme.secondary.light};
    }
  `}
`
