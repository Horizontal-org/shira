import { FunctionComponent, ReactNode, useState } from "react";
import { defaultTheme, styled } from "@horizontal-org/shira-ui";

type ActionButtonWithTooltipProps = {
  id: string;
  disabled?: boolean;
  tooltipText: string;
  ariaLabel?: string;
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

  const show = () => {
    if (!disabled) return;
    setShowTooltip(true);
  };

  const hide = () => {
    setShowTooltip(false);
  };

  return (
    <TooltipWrapper
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
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
  width: 24px;
  height: 24px;
  padding: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
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
  inset-inline-end: 0;
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
    inset-inline-end: 20px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent transparent ${defaultTheme.colors.dark.black} transparent;
  }
`;
