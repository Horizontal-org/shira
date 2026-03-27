import { FunctionComponent, ReactNode } from "react";
import styled from 'styled-components'
import { Body4 } from "../Typography";

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
  return (
    <>
      <Wrapper
        $showHelpCursor={enabled}
        onMouseEnter={() => {
          if (enabled) {
            setShow(true);
          }
        }}
        onMouseLeave={() => { setShow(false); }}
        onFocus={() => {
          if (enabled) {
            setShow(true);
          }
        }}
        onBlur={() => { setShow(false); }}
        onClick={(e) => { e.stopPropagation(); }}
        tabIndex={enabled ? 0 : -1}
      >

        { children }

        {enabled && show && label && (
          <Tooltip role="tooltip">
            <Body4>{label}</Body4>
          </Tooltip>
        )}
      </Wrapper>
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
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 6px;
  padding: 4px 8px;
  background-color: ${(props) => props.theme.colors.dark.black};
  color: ${(props) => props.theme.colors.light.white};
  border-radius: 10px;
  width: max-content;
  max-width: 520px;
  white-space: nowrap;
  z-index: 1000;
`;
