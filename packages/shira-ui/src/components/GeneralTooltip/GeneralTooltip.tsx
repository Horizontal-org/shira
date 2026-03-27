import { FunctionComponent, ReactNode } from "react";
import styled from 'styled-components'
import { Body4 } from "../Typography";
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useHover,
  useFocus,
  useDismiss,
  useInteractions,
  FloatingPortal,
} from "@floating-ui/react";

interface Props {
  children: ReactNode
  enabled: boolean
  show: boolean
  setShow: (value: boolean) => void
  label: string
}

export const GeneralTooltip:FunctionComponent<Props> = ({
  children,
  show,
  enabled,
  setShow,
  label
}) => {
  const { refs, floatingStyles, context } = useFloating({
    open: show,
    onOpenChange: (open) => {
      if (enabled) setShow(open);
    },
    placement: "bottom",
    middleware: [offset(6), flip(), shift()],
    whileElementsMounted: autoUpdate,
  });

  const hover = useHover(context, { enabled });
  const focus = useFocus(context, { enabled });
  const dismiss = useDismiss(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss,
  ]);

  return (
    <>
      <Wrapper
        ref={refs.setReference}
        $showHelpCursor={enabled}
        onClick={(e) => { e.stopPropagation(); }}
        tabIndex={enabled ? 0 : -1}
        {...getReferenceProps()}
      >
        { children }
      </Wrapper>

      {enabled && show && label && (
        <FloatingPortal>
          <Tooltip
            ref={refs.setFloating}
            style={floatingStyles}
            role="tooltip"
            {...getFloatingProps()}
          >
            <Body4>{label}</Body4>
          </Tooltip>
        </FloatingPortal>
      )}
    </>
  )
}

const Wrapper = styled.div<{ $showHelpCursor: boolean }>`
  position: relative;
  display: inline-flex;
  align-items: center;

  ${props => props.$showHelpCursor && `
    cursor: help;

    button:disabled {
      cursor: help !important;
    }
  `}
`;

const Tooltip = styled.div`
  padding: 4px 8px;
  background-color: ${(props) => props.theme.colors.dark.black};
  color: ${(props) => props.theme.colors.light.white};
  border-radius: 10px;
  width: max-content;
  max-width: 520px;
  white-space: nowrap;
  z-index: 10000;
`;
