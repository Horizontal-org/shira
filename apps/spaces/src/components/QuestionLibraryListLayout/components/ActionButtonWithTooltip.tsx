import { FunctionComponent, ReactNode, useEffect, useRef, useState } from "react";
import { defaultTheme, styled } from "@shira/ui";

type ActionButtonWithTooltipProps = {
  id: string;
  disabled?: boolean;
  tooltipText: string;
  ariaLabel: string;
  title?: string;
  onClick?: () => void;
  children: ReactNode;
};

export const ActionButtonWithTooltip: FunctionComponent<ActionButtonWithTooltipProps> = ({
  id,
  disabled,
  tooltipText,
  ariaLabel,
  title,
  onClick,
  children,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTooltipTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const showTooltipNow = () => {
    if (!disabled) return;
    clearTooltipTimeout();
    setShowTooltip(true);
  };

  const hideTooltip = () => {
    clearTooltipTimeout();
    setShowTooltip(false);
  };

  useEffect(() => () => clearTooltipTimeout(), []);

  return (
    <TooltipWrapper
      onMouseEnter={showTooltipNow}
      onMouseLeave={hideTooltip}
      onFocus={showTooltipNow}
      onBlur={hideTooltip}
      tabIndex={disabled ? 0 : undefined}
      aria-disabled={disabled || undefined}
    >
      <ActionButton
        id={id}
        type="button"
        aria-label={ariaLabel}
        title={title}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </ActionButton>
      {showTooltip && disabled && (
        <Tooltip role="tooltip">{tooltipText}</Tooltip>
      )}
    </TooltipWrapper>
  );
};

const ActionButton = styled("button")`
  width: 32px;
  height: 32px;
  padding: 0;
  display: inline-flex;
  align-items: center;
  background: transparent;
  border: none;
  cursor: pointer;

  &:disabled {
    cursor: help;
    opacity: 0.6;
  }
`;

const TooltipWrapper = styled("span")`
  position: relative;
  display: inline-flex;
  align-items: center;
`;

const Tooltip = styled("div")`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 8px;
  padding: 8px 12px;
  background-color: ${defaultTheme.colors.dark.black};
  color: ${defaultTheme.colors.light.white};
  border-radius: 4px;
  font-size: 14px;
  line-height: 1.4;
  white-space: nowrap;
  z-index: 1000;

  &::after {
    content: '';
    position: absolute;
    bottom: 100%;
    right: 20px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent transparent ${defaultTheme.colors.dark.black} transparent;
  }
`;
