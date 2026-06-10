import { FunctionComponent, ReactElement, useEffect, useRef, useState } from "react";
import { FiCopy, FiMoreVertical, FiTrash2 } from "react-icons/fi";
import { BaseFloatingMenu, defaultTheme, styled } from "@horizontal-org/shira-ui";

interface Props {
  questionId: string;
  duplicateLabel: string;
  deleteLabel: string;
  disabled: boolean;
  onDuplicate: () => void;
  onDelete: () => void;
}

export const QuestionTableActionsMenu: FunctionComponent<Props> = ({
  questionId,
  duplicateLabel,
  deleteLabel,
  disabled,
  onDuplicate,
  onDelete,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (disabled) {
      setIsOpen(false);
    }
  }, [disabled]);

  const elements: Array<{
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    text: string;
    icon?: ReactElement;
  }> = [
    {
      text: duplicateLabel,
      onClick: (event) => {
        event.stopPropagation();
        setIsOpen(false);
        onDuplicate();
      },
      icon: <FiCopy color={defaultTheme.colors.dark.darkGrey} />,
    },
    {
      text: deleteLabel,
      onClick: (event) => {
        event.stopPropagation();
        setIsOpen(false);
        onDelete();
      },
      icon: <FiTrash2 color={defaultTheme.colors.dark.darkGrey} />,
    },
  ];

  return (
    <>
      <MenuButton
        id={`more-actions-button-${questionId}`}
        ref={buttonRef}
        type="button"
        aria-label="More actions"
        title="More actions"
        onClick={(event) => {
          event.stopPropagation();
          setIsOpen((current) => !current);
        }}
        disabled={disabled}
      >
        <FiMoreVertical size={20} color={defaultTheme.colors.dark.darkGrey} />
      </MenuButton>

      <BaseFloatingMenu
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        elements={elements}
        anchorEl={buttonRef.current}
        width={150}
      />
    </>
  );
};

const MenuButton = styled.button`
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: ${defaultTheme.colors.dark.darkGrey};

  &:disabled {
    cursor: not-allowed;
  }
`;
