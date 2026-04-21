import { FunctionComponent } from 'react';
import { ExplanationIcon, styled } from '@shira/ui';
import ExplanationText from '../../../../icons/ExplanationText';

interface Props {
  onClick: () => void
  active: boolean
  filled?: boolean
  disabled?: boolean
  isText?: boolean
}

interface BaseProps {
  $active: boolean
  $filled: boolean
}

export const ExplanationButton: FunctionComponent<Props> = ({
  onClick,
  active,
  filled = false,
  disabled = false,
  isText = false,
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
        $filled={filled}
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
      $filled={filled}
    >
      {icon}
    </IconButton>
  )
}

const BaseButton = styled.button<BaseProps>`
  appearance: none;
  border: none;
  background: transparent;
  margin-left: 12px;
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
  border-radius: 4px;

  > svg {
    width: 22px;
    height: 22px;
  }

  ${props => props.$filled && `
    > svg .bubble-fill {
      fill: ${props.theme.colors.green2};
    }

    > svg .bubble-outline {
      fill: transparent;
    }
  `}

  ${props => props.$active && `
    color: ${props.theme.colors.green5};

    > svg .bubble-fill {
      fill: ${props.theme.colors.green3};
    }

    > svg .bubble-outline {
      fill: ${props.theme.colors.green5};
    }
  `}

  ${props => props.$filled && !props.$active && `
    &:hover:not(:disabled) {
      > svg .bubble-fill {
        fill: ${props.theme.colors.green4};
      }

      > svg .bubble-outline {
        fill: transparent;
      }
    }
  `}

  &:disabled {
    color: ${props => props.theme.colors.green2};
  }

  ${props => props.disabled && props.$filled && `
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
`

const TextButton = styled(BaseButton) <BaseProps>`
  min-width: 40px;
  min-height: 40px;
  padding: 2px;
  border: 2px solid transparent;

  ${props => props.$filled && `
    > svg .bubble-fill {
      fill: currentColor;
    }

    > svg .bubble-outline {
      fill: transparent;
    }
  `}

  ${props => props.$active && `
    color: ${props.theme.colors.green5};
    border-color: ${props.theme.colors.green2};
    border-radius: 0;
  `}

  &:disabled {
    color: ${props => props.theme.colors.green2};
    border-color: transparent;
  }

  ${props => props.disabled && props.$filled && `
    color: ${props.theme.colors.green5};

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
`