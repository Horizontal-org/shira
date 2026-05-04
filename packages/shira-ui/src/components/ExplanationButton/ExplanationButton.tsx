import { FunctionComponent } from 'react';
import { ExplanationOutlineIcon } from '../Icons'
import styled from 'styled-components'
import ExplanationFilledIcon from '../Icons/ExplanationFilledIcon';
// import ExplanationText from '../../../../icons/ExplanationText';

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
  // $hasExplanation: boolean
}

export const ExplanationButton: FunctionComponent<Props> = ({
  onClick,
  active,
  disabled = false,
  isText = false,
  hasExplanation = false
}) => {
              // active={selectedExplanation && selectedExplanation + '' == explanationId}
  console.log('ACTIVE', active, 'DISABLED', disabled, 'HAS EXPLANATION', hasExplanation)
  // const icon = isText ? <ExplanationText /> : <ExplanationIcon />
  // const icon = <ExplanationInputIcon />

  // if (isText) {
  //   return (
  //     <TextButton
  //       type="button"
  //       onClick={onClick}
  //       disabled={disabled}
  //       aria-pressed={active}
  //       $active={active}
  //       $hasExplanation={hasExplanation}
  //       $disabled={disabled}
  //     >
  //       {icon}
  //     </TextButton>
  //   )
  // }

  return hasExplanation ? (
    <FilledIconButton
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={active}
      $active={active}
      $disabled={disabled}
    >
      <ExplanationFilledIcon />
    </FilledIconButton>
  ) : (
    <OutlineIconButton
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={active}
      $active={active}
      $disabled={disabled}
    >
      <ExplanationOutlineIcon />
    </OutlineIconButton>
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
  transition: color 0.2s ease, border-color 0.2s ease, opacity 0.2s ease;

  &:disabled {
    cursor: not-allowed;
    box-shadow: none;
    filter: none;
  }

  &:focus-visible {
     outline: none;
     color: ${props => props.theme.colors.green5};
  }

`
  // > svg {
  //   display: block;
  //   overflow: visible;
  // }

  // > svg .bubble-border,
  // > svg .bubble-fill,
  // > svg .bubble-outline,
  // > svg .bubble-label {
  //   transition: fill 0.2s ease, opacity 0.2s ease;
  // }

  // > svg .bubble-border {
  //   fill: transparent;
  // }

  // > svg .bubble-fill {
  //   fill: transparent;
  // }

  // > svg .bubble-outline,
  // > svg .bubble-label {
  //   fill: currentColor;
  // }

  // &:hover:not(:disabled) {
  //   color: ${props => props.theme.colors.green4};
  // }

 

const OutlineIconButton = styled(BaseButton) <BaseProps>`
  padding: 4px;
  color: ${props => props.theme.colors.green5};

  > svg {
    width: 40px;
    height: 40px;
    stroke: white;
  }

  &:hover {
    color: ${props => props.theme.colors.green4};
  }
   
  &:disabled {
    color: ${props => props.theme.colors.green2};
  }

  &:focus {
    color: ${props => props.theme.colors.green5};
  }

  &:focus > svg {
    stroke: ${props => props.theme.colors.green2};
  }
`



const FilledIconButton = styled(BaseButton) <BaseProps>`
  padding: 4px;
  color: ${props => props.theme.colors.green3};

  > svg {
    width: 40px;
    height: 40px;
    stroke: white;
  }

  &:hover {
    color: ${props => props.theme.colors.green4};
  }
   
  &:disabled {
    color: ${props => props.theme.colors.green2};
  }

  &:focus {
    color: ${props => props.theme.colors.green3};
  }

  &:focus > svg {
    stroke: ${props => props.theme.colors.green5};
  }
`
  // ${props => !props.$hasExplanation && `
  //   > svg .bubble-fill {
  //     fill: transparent;
  //   }

  //   > svg .bubble-outline {
  //     fill: currentColor;
  //   }
  // `}

  // ${props => props.$hasExplanation && `
  //   color: ${props.theme.colors.green3};

  //   > svg .bubble-fill {
  //     fill: currentColor;
  //   }

  //   > svg .bubble-outline {
  //     fill: transparent;
  //   }

  //   ${props.$active && `
  //     > svg .bubble-outline {
  //       fill: ${props.theme.colors.green2};
  //     }
  //   `}

  //   ${props.$disabled && `
  //     > svg .bubble-fill {
  //       fill: ${props.theme.colors.green2};
  //     }

  //     > svg .bubble-outline {
  //       fill: transparent;
  //     }

  //     > svg .bubble-label {
  //       fill: ${props.theme.colors.green2};
  //     }
  //   `}
  // `}

  

// const TextButton = styled(BaseButton) <BaseProps>`
//   min-width: 40px;
//   min-height: 40px;
//   padding: 2px;
//   border: 2px solid transparent;
//   border-radius: 0;
//   box-sizing: border-box;

//   ${props => props.$hasExplanation && `
//     color: ${props.theme.colors.green5};

//     > svg .bubble-fill {
//       fill: currentColor;
//     }

//     > svg .bubble-outline {
//       fill: transparent;
//     }

//     ${props.$disabled && `
//       color: ${props.theme.colors.green5};

//       > svg .bubble-label {
//         fill: currentColor;
//       }
//     `}
//   `}

//   ${props => props.$active && props.$hasExplanation && !props.$disabled && `
//     color: ${props.theme.colors.green5};
//     border: 2px solid ${props.theme.colors.green3};
//     border-radius: 0;
//   `}

//   &:disabled {
//     color: ${props => props.theme.colors.green2};
//     border-color: transparent;
//   }
// `
