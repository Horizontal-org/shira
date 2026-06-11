import { FunctionComponent, ReactElement, useEffect, useRef, useState } from "react";
import { FiCopy, FiMoreVertical, FiTrash2 } from "react-icons/fi";
import { defaultTheme, EditIcon, styled } from "@horizontal-org/shira-ui";
import { useTranslation } from "react-i18next";

interface Props {
  editLabel: string;
  duplicateLabel: string;
  deleteLabel: string;
  disabled: boolean;
  onEdit: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
}

export const QuestionTableActionsMenu: FunctionComponent<Props> = ({
  editLabel,
  duplicateLabel,
  deleteLabel,
  disabled,
  onEdit,
  onDuplicate,
  onDelete,
}) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (disabled) {
      setIsOpen(false);
    }
  }, [disabled]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !event.composedPath().includes(wrapperRef.current)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const elements: Array<{
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    text: string;
    icon?: ReactElement;
  }> = [
    {
      text: editLabel,
      onClick: (event) => {
        event.stopPropagation();
        setIsOpen(false);
        onEdit();
      },
      icon: <EditIcon />,
    },
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
    <MenuWrapper ref={wrapperRef}>
      <MenuButton
        type="button"
        title={t("questions_tab.action_tooltips.more_actions")}
        aria-label={t("questions_tab.action_tooltips.more_actions")}
        onClick={(event) => {
          event.stopPropagation();
          setIsOpen((current) => !current);
        }}
        disabled={disabled}
      >
        <FiMoreVertical size={20} color={defaultTheme.colors.dark.darkGrey} />
      </MenuButton>

      {isOpen && (
        <MenuPopup>
          {elements.map((element) => (
            <MenuItem
              key={element.text}
              onClick={element.onClick}
              type="button"
            >
              {element.icon}
              {element.text}
            </MenuItem>
          ))}
        </MenuPopup>
      )}
    </MenuWrapper>
  );
};

const MenuWrapper = styled.div`
  position: relative;
  display: inline-flex;
`;

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

const MenuPopup = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  width: 150px;
  z-index: 20;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  overflow: hidden;
`;

const MenuItem = styled.button`
  width: 100%;
  margin: 0;
  padding: 8px 16px;
  text-align: left;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${props => props.theme.colors.dark.darkGrey};
  font-size: 14px;
  font-weight: 400;

  &:hover {
    background: ${props => props.theme.colors.light.paleGrey};
    color: ${props => props.theme.colors.dark.black};
  }
`;
