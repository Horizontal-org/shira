import { FunctionComponent } from 'react'
import { ExplanationIcon, styled } from '@shira/ui'
import ExplanationText from '../../../../icons/ExplanationText'

interface Props {
  onClick: () => void
  active: boolean
  filled?: boolean
  disabled?: boolean
  isText?: boolean
}

type Variant = 'icon-only' | 'icon-with-text';

export const ExplanationButton: FunctionComponent<Props> = ({
  onClick,
  active,
  filled = false,
  disabled = false,
  isText = false
}) => {
  const variant: Variant = isText ? 'icon-with-text' : 'icon-only';

  return (
    <StyledButton
      type="button"
      disabled={disabled}
      onClick={onClick}
      aria-pressed={active}
      $active={active}
      $filled={filled}
      $variant={variant}
    >
      {isText ? <ExplanationText /> : <ExplanationIcon />}
    </StyledButton>
  )
}

interface StyledButtonProps {
  $active: boolean
  $filled: boolean
  $variant: Variant
}

const StyledButton = styled.button<StyledButtonProps>`
  appearance: none;
  border: none;
  background: transparent;
  padding: 0;
  margin-left: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  line-height: 0;
  cursor: pointer;

  color: ${props => props.theme.colors.green5};
  transition: color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease;

  > svg {
    display: block;
  }

  > svg .bubble-fill,
  > svg .bubble-outline,
  > svg .bubble-label {
    transition: fill 0.2s ease, opacity 0.2s ease;
  }

  > svg .bubble-fill {
    fill: transparent;
  }

  > svg .bubble-outline,
  > svg .bubble-label {
    fill: currentColor;
  }

  ${props => props.$filled && props.$variant === 'icon-only' && `
    > svg .bubble-fill {
      fill: ${props.theme.colors.green2};
    }

    > svg .bubble-outline {
      fill: transparent;
    }
  `}

  ${props => props.$variant === 'icon-only' && `
    padding: 4px;
    border-radius: 4px;

    > svg {
      width: 22px;
      height: 22px;
    }

    &:hover {
      color: ${props.theme.colors.green4};
    }

    &:focus-visible {
      outline: none;
      color: ${props.theme.colors.green5};
    }
  `}

  ${props => props.$variant === 'icon-with-text' && `
    min-width: 40px;
    min-height: 40px;
    padding: 2px;
    border: 2px solid transparent;

    &:hover {
      color: ${props.theme.colors.green4};
    }

    &:focus-visible {
      outline: none;
      color: ${props.theme.colors.green5};
    }
  `}

  ${props => props.$filled && props.$variant === 'icon-with-text' && `
    > svg .bubble-fill {
      fill: currentColor;
    }

    > svg .bubble-outline {
      fill: transparent;
    }
  `}

  ${props => props.$filled && !props.$active && props.$variant === 'icon-only' && `
    &:hover {
      > svg .bubble-fill {
        fill: ${props.theme.colors.green4};
      }

      > svg .bubble-outline {
        fill: transparent;
      }
    }
  `}

  ${props => props.$active && props.$variant === 'icon-only' && `
    color: ${props.theme.colors.green5};

    > svg .bubble-fill {
      fill: ${props.theme.colors.green3};
    }

    > svg .bubble-outline {
      fill: ${props.theme.colors.green5};
    }
  `}

  ${props => props.$active && props.$variant === 'icon-with-text' && `
    color: ${props.theme.colors.green5};
    border-color: ${props.theme.colors.green2};
    border-radius: 0px;
  `}

  &:disabled {
    cursor: not-allowed;
    color: ${props => props.theme.colors.green2};
    filter: none;
    box-shadow: none;
    border-color: transparent;
  }

  ${props => props.disabled && props.$filled && props.$variant === 'icon-only' && `
    > svg .bubble-fill {
      fill: ${props.theme.colors.green1};
    }

    > svg .bubble-outline {
      fill: transparent;
    }

    > svg .bubble-label {
      fill: ${props.theme.colors.green2};
    }
  `}

  ${props => props.disabled && props.$filled && props.$variant === 'icon-with-text' && `
    color: ${props.theme.colors.green5};
    border-color: transparent;

    > svg .bubble-fill {
      fill: currentColor;
    }

    > svg .bubble-outline {
      fill: transparent;
    }

    > svg .bubble-label {
      fill: currentColor;
    }
  `}
`;
