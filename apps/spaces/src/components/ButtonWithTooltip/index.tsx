import { forwardRef, useState } from 'react';
import styled from 'styled-components';
import { Button, ButtonProps } from '@shira/ui';

interface ButtonWithTooltipProps extends ButtonProps {
  tooltipText?: string;
  showTooltipWhenDisabled?: boolean;
}

export const ButtonWithTooltip = forwardRef<HTMLButtonElement, ButtonWithTooltipProps>(({
  tooltipText = "Required fields cannot be left blank.",
  showTooltipWhenDisabled = true,
  disabled,
  ...buttonProps
}, ref) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <TooltipContainer
      onMouseEnter={() => {
        if (disabled && showTooltipWhenDisabled) {
          setShowTooltip(true);
        }
      }}
      onMouseLeave={() => {
        setShowTooltip(false);
      }}
    >
      <StyledButton
        {...buttonProps}
        disabled={disabled}
        ref={ref}
        $showQuestionCursor={disabled && showTooltipWhenDisabled}
      />
      {showTooltip && disabled && showTooltipWhenDisabled && (
        <Tooltip>{tooltipText}</Tooltip>
      )}
    </TooltipContainer>
  );
});

const TooltipContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const StyledButton = styled(Button)<{ $showQuestionCursor?: boolean }>`
  ${({ $showQuestionCursor }) => $showQuestionCursor && `
    cursor: help !important;
  `}
`;

const Tooltip = styled.div`
  position: absolute;
  bottom: 100%;
  right: 0;
  margin-bottom: 8px;
  padding: 8px 12px;
  background-color: #333;
  color: white;
  border-radius: 4px;
  font-size: 14px;
  white-space: nowrap;
  z-index: 1000;

  &::after {
    content: '';
    position: absolute;
    top: 100%;
    right: 20px;
    border-width: 5px;
    border-style: solid;
    border-color: #333 transparent transparent transparent;
  }
`;