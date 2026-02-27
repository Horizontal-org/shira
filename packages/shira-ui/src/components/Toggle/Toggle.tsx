import { FunctionComponent } from 'react';
import styled from 'styled-components';
import { Body4 } from '../Typography';

export interface ToggleProps {
  isEnabled: boolean;
  onToggle: () => void;
  rightLabel?: string;
  leftLabel?: string;
  className?: string;
  disabled?: boolean;
  size?: 'medium' | 'big'
}

export const Toggle: FunctionComponent<ToggleProps> = ({
  isEnabled,
  onToggle,
  rightLabel,
  leftLabel,
  className,
  disabled = false,
  size = 'medium'
}) => {
  return (
    <ToggleWrapper className={className}>
      {leftLabel && <ToggleText>{leftLabel}</ToggleText>}
      <ToggleSwitch
        role="switch"
        aria-checked={isEnabled}
        $size={size}
        $isEnabled={isEnabled}
        onClick={(e) => {
          e.stopPropagation()
          onToggle()
        }}
        disabled={disabled}
        type="button"
      >
        <ToggleSlider 
          $isEnabled={isEnabled} 
          $size={size}
        />
      </ToggleSwitch>
      {rightLabel && <ToggleText>{rightLabel}</ToggleText>}
    </ToggleWrapper>
  );
};

const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ToggleText = styled(Body4)`
  color: ${props => props.theme.colors.dark.black};
`;

interface StyledToggleProps {
  $isEnabled: boolean;
  $size: string;
}

const ToggleSwitch = styled.button<StyledToggleProps>`
  position: relative;
  width: 50px;
  height: 24px;
  background: ${props => props.$isEnabled ? props.theme.secondary.dark : props.theme.colors.dark.mediumGrey};
  border-radius: 12px;
  padding: 2px;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  ${props => props.$size === 'big' && `
    width: 70px;
    height: 32px;
    border-radius: 18px;
  `}
`;

const ToggleSlider = styled.span<StyledToggleProps>`
  position: absolute;
  left: ${props => props.$isEnabled ? '28px' : '2px'};
  width: 20px;
  height: 20px;
  background: white;
  border-radius: 50%;
  transition: left 0.2s;
  top: 2px;
  

  ${props => props.$size === 'big' && `
    top: 4px;
    width: 24px;
    height: 24px;
    left: ${props.$isEnabled ? '42px' : '4px'};
    box-shadow: 0px -0.97px 2.92px 0.97px #00000026;
    box-shadow: 0px -0.97px 1.95px 0px #0000004D;

  `}
`;

export default Toggle;