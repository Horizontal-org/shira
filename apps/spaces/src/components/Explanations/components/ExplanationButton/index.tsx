import { FunctionComponent } from 'react';
import { ExplanationIcon, styled } from '@horizontal-org/shira-ui';
import ExplanationText from '../../../../icons/ExplanationText';

interface Props {
  onClick: () => void
  active: boolean
  disabled?: boolean
  isText?: boolean
  hasExplanation?: boolean
}

interface BaseProps {
  $active: boolean
  $disabled: boolean
  $hasExplanation: boolean
}

export const ExplanationButton: FunctionComponent<Props> = ({
  onClick,
  active,
  disabled = false,
  isText = false,
  hasExplanation = false
}) => {
  const icon = isText ? <ExplanationText /> : <ExplanationIcon />

  if (isText) {
    return (
      <TextButton
        type="button"
        onClick={onClick}
        disabled={disabled}
        aria-pressed={active}
        $active={active}
        $hasExplanation={hasExplanation}
        $disabled={disabled}
      >
        {icon}
      </TextButton>
    )
  }

  return (
    <IconButton
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={active}
      $active={active}
      $hasExplanation={hasExplanation}
      $disabled={disabled}
    >
      {icon}
    </IconButton>
  )
}

const BaseButton = styled.button<BaseProps>`
  appearance: none;
  border: none;
  background: transparent;
  margin-inline-start: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  line-height: 0;
  cursor: pointer;
  color: ${props => props.theme.colors.green5};
  transition: color 0.2s ease, border-color 0.2s ease, opacity 0.2s ease;

  > svg {
    display: block;
    overflow: visible;
  }

  > svg .bubble-border,
  > svg .bubble-fill,
  > svg .bubble-outline,
  > svg .bubble-label {
    transition: fill 0.2s ease, opacity 0.2s ease;
  }

  > svg .bubble-border {
    fill: transparent;
  }

  > svg .bubble-fill {
    fill: transparent;
  }

  > svg .bubble-outline,
  > svg .bubble-label {
    fill: currentColor;
  }

  &:hover:not(:disabled) {
    color: ${props => props.theme.colors.green4};
  }

  &:focus-visible {
    outline: none;
    color: ${props => props.theme.colors.green5};
  }

  &:disabled {
    cursor: not-allowed;
    box-shadow: none;
    filter: none;
  }
`

const IconButton = styled(BaseButton) <BaseProps>`
  padding: 4px;

  > svg {
    width: 22px;
    height: 22px;
  }

  ${props => !props.$hasExplanation && `
    > svg .bubble-fill {
      fill: transparent;
    }

    > svg .bubble-outline {
      fill: currentColor;
    }
  `}

  ${props => props.$hasExplanation && `
    color: ${props.theme.colors.green3};

    > svg .bubble-fill {
      fill: currentColor;
    }

    > svg .bubble-outline {
      fill: transparent;
    }

    ${props.$active && `
      > svg .bubble-outline {
        fill: ${props.theme.colors.green2};
      }
    `}

    ${props.$disabled && `
      > svg .bubble-fill {
        fill: ${props.theme.colors.green2};
      }

      > svg .bubble-outline {
        fill: transparent;
      }

      > svg .bubble-label {
        fill: ${props.theme.colors.green2};
      }
    `}
  `}

  &:disabled {
    color: ${props => props.theme.colors.green2};
  }
`

const TextButton = styled(BaseButton) <BaseProps>`
  min-width: 40px;
  min-height: 40px;
  padding: 2px;
  border: 2px solid transparent;
  border-radius: 0;
  box-sizing: border-box;

  ${props => props.$hasExplanation && `
    color: ${props.theme.colors.green5};

    > svg .bubble-fill {
      fill: currentColor;
    }

    > svg .bubble-outline {
      fill: transparent;
    }

    ${props.$disabled && `
      color: ${props.theme.colors.green5};

      > svg .bubble-label {
        fill: currentColor;
      }
    `}
  `}

  ${props => props.$active && props.$hasExplanation && !props.$disabled && `
    color: ${props.theme.colors.green5};
    border: 2px solid ${props.theme.colors.green3};
    border-radius: 0;
  `}

  &:disabled {
    color: ${props => props.theme.colors.green2};
    border-color: transparent;
  }
`
