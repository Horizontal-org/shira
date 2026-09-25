import styled from 'styled-components';
import { Body4 } from '../Typography';

export interface CharacterCountProps {
  currentLength: number;
  maxLength?: number;
  disabled?: boolean;
}

export const CharacterCount = ({
  currentLength,
  maxLength,
  disabled = false
}: CharacterCountProps) => {
  const isOverLimit = maxLength ? currentLength > maxLength : false;

  return (
    <CountText
      $disabled={disabled}
      $isOverLimit={isOverLimit}
    >
      {typeof maxLength === 'number'
        ? `${currentLength}/${maxLength}`
        : `${currentLength} characters`}
    </CountText>
  );
};

const CountText = styled(Body4) <{ $disabled?: boolean; $isOverLimit?: boolean }>`
  padding-inline-end: 10px;
  align-self: flex-end;
  color: ${({ theme, $disabled, $isOverLimit }) => {
    if ($disabled) return theme.colors.dark.mediumGrey;
    if ($isOverLimit) return theme.colors.error7;
    return theme.colors.dark.darkGrey;
  }};
`;
