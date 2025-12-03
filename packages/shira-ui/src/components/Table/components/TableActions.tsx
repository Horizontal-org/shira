import { FunctionComponent, useRef, useState } from "react";
import { FiMoreVertical, FiShare } from "react-icons/fi";
import styled from "styled-components";
import { BaseFloatingMenu } from "../../FloatingMenu";
import { MdEmail } from "react-icons/md";
import { IoMdTrash } from "react-icons/io";

interface Props {
  onResend: () => void
  onDelete: () => void
}

export const TableActions:FunctionComponent<Props> = ({
  onResend,
  onDelete
}) => {
  const [isOpen, setIsOpen] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);
  

  return (
    <>
      <ActionButton 
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
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
            icon: <MdEmail color="#5F6368"/>
          },
          {
            text: 'Delete',
            onClick: onDelete,
            icon: <IoMdTrash color="#5F6368" />
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
  color: #5f6368;
  
  &:hover {
    color: #202124;
  }
`;