import { FunctionComponent, ReactElement, useEffect, useRef, useState } from "react";
import { FiCopy, FiDownload, FiMoreVertical, FiTrash2, FiUpload } from "react-icons/fi";
import { defaultTheme, EditIcon, styled } from "@horizontal-org/shira-ui";
import { useTranslation } from "react-i18next";

interface Props {
  editLabel: string;
  duplicateLabel: string;
  submitAsTemplateLabel: string;
  deleteLabel: string;
  exportLabel: string;
  disabled: boolean;
  onEdit: () => void;
  onDuplicate: () => void;
  onSubmitAsTemplate: () => void;
  onExport: () => void;
  onDelete: () => void;
}

export const QuestionTableActionsMenu: FunctionComponent<Props> = ({
  editLabel,
  duplicateLabel,
  submitAsTemplateLabel,
  deleteLabel,
  exportLabel,
  disabled,
  onEdit,
  onDuplicate,
  onSubmitAsTemplate,
  onExport,
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
        text: duplicateLabel,
        onClick: (event) => {
          event.stopPropagation();
          setIsOpen(false);
          onDuplicate();
        },
        icon: <FiCopy color={defaultTheme.colors.dark.darkGrey} />,
      },
      {
        text: submitAsTemplateLabel,
        onClick: (event) => {
          event.stopPropagation();
          setIsOpen(false);
          onSubmitAsTemplate();
        },
        icon: <FiUpload color={defaultTheme.colors.dark.darkGrey} />,
      },
      {
        text: exportLabel,
        onClick: (event) => {
          event.stopPropagation();
          setIsOpen(false);
          onExport();
        },
        icon: <FiDownload color={defaultTheme.colors.dark.darkGrey} />,
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
      <EditButton
        type="button"
        title={editLabel}
        aria-label={editLabel}
        onClick={(event) => {
          event.stopPropagation();
          onEdit();
        }}
        disabled={disabled}
      >
        <EditIcon />
      </EditButton>

      <ActionButton
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
      </ActionButton>

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
  align-items: center;
  gap: 12px;
  min-height: 20px;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  width: 32px;
  height: 32px;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 0;
  color: ${defaultTheme.colors.dark.darkGrey};
  border-radius: 999px;

  &:hover:not(:disabled) {
    background: ${defaultTheme.colors.light.paleGrey};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const EditButton = styled(ActionButton)`
  color: ${defaultTheme.colors.green7};
`;

const MenuPopup = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  inset-inline-end: 0;
  width: 200px;
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
  text-align: start;
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
