import { FunctionComponent, ReactNode } from "react";
import { styled } from "@shira/ui";

interface ActionTooltipProps {
  content: string;
  children: ReactNode;
  delayMs?: number;
}

export const ActionTooltip: FunctionComponent<ActionTooltipProps> = ({
  content,
  children,
  delayMs = 500,
}) => {
  return (
    <Container delayMs={delayMs}>
      {children}
      <Tooltip data-action-tooltip="content" role="tooltip">
        {content}
      </Tooltip>
    </Container>
  );
};

const Container = styled.div<{ delayMs: number }>`
  position: relative;
  display: flex;
  align-items: center;

  &:hover [data-action-tooltip='content'],
  &:focus-within [data-action-tooltip='content'] {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
    transition-delay: ${({ delayMs }) => delayMs}ms;
  }
`;

const Tooltip = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  padding: 8px 12px;
  border-radius: 4px;
  background: ${props => props.theme.colors.dark.black};
  color: ${props => props.theme.colors.light.white};
  font-size: 12px;
  line-height: 1.4;
  white-space: nowrap;
  pointer-events: none;
  z-index: 1000;
  opacity: 0;
  visibility: hidden;
  transform: translateY(4px);
  transition: opacity 0.15s ease, transform 0.15s ease, visibility 0s linear;
  transition-delay: 0ms;

  &::before {
    position: absolute;
    bottom: 100%;
    right: 12px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent transparent ${props => props.theme.colors.dark.black} transparent;
  }
`;

