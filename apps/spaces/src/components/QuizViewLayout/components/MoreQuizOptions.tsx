import { BaseFloatingMenu, DeleteIcon, IconButton, RenameIcon, styled } from "@horizontal-org/shira-ui";
import { FunctionComponent, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { FiDownload, FiMoreVertical } from "react-icons/fi";

interface Props {
  onRenameClick: () => void;
  onDeleteClick: () => void;
  onExportClick: () => void;
}


export const MoreQuizOptions: FunctionComponent<Props> = ({ onRenameClick, onDeleteClick, onExportClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const { t } = useTranslation();

  const menuItems = [
    {
      text: t('quiz.actions.rename'),
      icon: <RenameIcon />,
      onClick: () => { onRenameClick() },
      size: 16
    },
    {
      text: t('buttons.delete'),
      icon: <DeleteIcon />,
      onClick: () => { onDeleteClick() },
      size: 16
    },
    {
      text: t('modals.export.quiz.title'),
      icon: <FiDownload />,
      onClick: () => { onExportClick() },
      size: 16
    }
  ]

  return (
    <>
      <StyledIconButton
        ref={menuButtonRef}
        type="outline"
        icon={<FiMoreVertical />}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      />

      <BaseFloatingMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        anchorEl={menuButtonRef.current}
        elements={menuItems.map((item) => ({
          text: item.text,
          icon: item.icon,
          size: item.size,
          onClick: (event) => {
            event.stopPropagation();
            setIsMenuOpen(false);
            item.onClick();
          },
        }))}
      />
    </>
  )
}

const StyledIconButton = styled(IconButton)`
  padding: 12px 16px;
`