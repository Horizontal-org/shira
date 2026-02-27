import { FunctionComponent, ReactElement, useRef, useState, MouseEventHandler } from "react";
import { FiMoreVertical } from "react-icons/fi";
import styled from "styled-components";
import { BaseFloatingMenu } from "../../FloatingMenu";
import { MdEmail } from "react-icons/md";
import { IoMdTrash } from "react-icons/io";
import { defaultTheme } from "../../../theme";

interface Props {
  onResend?: () => void;
  onDelete?: () => void;
  showResend?: boolean;
  showDelete?: boolean;
}

export const TableActions: FunctionComponent<Props> = ({
  onResend,
  onDelete,
  showResend,
  showDelete
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  function preventClickBubbling(event: any): void {
    event.stopPropagation();
  }

  const elements: Array<{
    onClick: MouseEventHandler<HTMLButtonElement>;
    text: string;
    icon?: ReactElement;
  }> = [];

  if (showResend && onResend) {
    elements.push({
      text: 'Resend invitation',
      onClick: (event) => {
        preventClickBubbling(event);
        onResend();
      },
      icon: <MdEmail color={defaultTheme.colors.dark.darkGrey} />
    });
  }

  if (showDelete && onDelete) {
    elements.push({
      text: 'Delete',
      onClick: (event) => {
        preventClickBubbling(event);
        onDelete();
      },
      icon: <IoMdTrash color={defaultTheme.colors.dark.darkGrey} />
    });
  }

  if (elements.length === 0) {
    return null;
  }

  return (
    <>
      <ActionButton
        ref={buttonRef}
        onClick={(event) => {
          preventClickBubbling(event);
          setIsOpen(!isOpen)
        }}
      >
        <FiMoreVertical size={20} />
      </ActionButton>

      <BaseFloatingMenu
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        elements={elements}
        anchorEl={buttonRef.current}
      />
    </>
  )
}

const ActionButton = styled.button`
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: ${props => props.theme.colors.dark.darkGrey};
  
  &:hover {
    color: #202124;
  }
`;
