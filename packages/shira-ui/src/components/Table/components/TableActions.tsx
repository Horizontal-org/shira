import { FunctionComponent, useRef, useState } from "react";
import { FiMoreVertical } from "react-icons/fi";
import styled from "styled-components";
import { BaseFloatingMenu } from "../../FloatingMenu";
import { MdEmail } from "react-icons/md";
import { IoMdTrash } from "react-icons/io";
import { defaultTheme } from "../../../theme";

interface Props {
  onResend: () => void;
  onDelete: () => void;
}

export const TableActions: FunctionComponent<Props> = ({
  onResend,
  onDelete
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  function preventClickBubbling(event: any): void {
    event.stopPropagation();
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
        elements={[
          {
            text: 'Resend invitation',
            onClick: onResend,
            icon: <MdEmail color={defaultTheme.colors.dark.darkGrey} />
          },
          {
            text: 'Delete',
            onClick: onDelete,
            icon: <IoMdTrash color={defaultTheme.colors.dark.darkGrey} />
          }
        ]}
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
