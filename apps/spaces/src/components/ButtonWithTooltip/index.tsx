import { ComponentPropsWithoutRef, forwardRef, useState } from 'react';
import styled from 'styled-components';
import { Button } from '@horizontal-org/shira-ui';

interface ButtonWithTooltipProps extends ComponentPropsWithoutRef<typeof Button> {
  tooltipText?: string;
  showTooltipWhenDisabled?: boolean;
}

export const ButtonWithTooltip = forwardRef<HTMLButtonElement, ButtonWithTooltipProps>(({
  tooltipText = "",
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
  background-color: ${(props) => props.theme.colors.dark.black};
  color: ${(props) => props.theme.colors.light.white};
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
    border-color: ${(props) => props.theme.colors.dark.black} transparent transparent transparent;
  }
`;