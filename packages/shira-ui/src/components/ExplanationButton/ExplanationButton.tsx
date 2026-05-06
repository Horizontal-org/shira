import { FunctionComponent } from 'react';
import { 
  FilledIconButton, 
  OutlineIconButton,
  TextFilledIconButton,
  TextOutlineIconButton 
} from './ExplanationButtonStyled';

import { 
  ExplanationOutlineIcon,
  ExplanationFilledIcon,
  ExplanationTextOutlineIcon,
  ExplanationTextFilledIcon
} from '../Icons';

interface Props {
  onClick: () => void
  active: boolean
  disabled?: boolean
  isText?: boolean
  hasExplanation?: boolean
}


export const ExplanationButton: FunctionComponent<Props> = ({
  onClick,
  active,
  disabled = false,
  isText = false,
  hasExplanation = false
}) => {

  if (isText) {
    return hasExplanation ? (
      <TextFilledIconButton
        type="button"
        onClick={onClick}
        disabled={disabled}
        aria-pressed={active}
        $active={active}
        $disabled={disabled}
      >
        <ExplanationTextFilledIcon />
      </TextFilledIconButton>
    ) : (
      <TextOutlineIconButton
        type="button"
        onClick={onClick}
        disabled={disabled}
        aria-pressed={active}
        $active={active}
        $disabled={disabled}
      >
        <ExplanationTextOutlineIcon />
      </TextOutlineIconButton>
    )
  }
 
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