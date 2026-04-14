import { FunctionComponent, useMemo } from "react";
import { IconWrapper } from "../styles/MenuBarStyles";
import { isTableCellEmpty } from "../utils";
import { FiLink } from "react-icons/fi";

interface MenuLinkProps {
  editor: any
  setLink: (url?: string | null) => void
  isImageSelected?: boolean
  links: {
    getCurrentLink: () => string | null
  }
}

export const MenuLink: FunctionComponent<MenuLinkProps> = ({ 
  editor, 
  setLink, 
  links,
  isImageSelected, 
}) => {

  const selectionEmpty = editor.view.state.selection.empty
  const currentActive = editor.isActive('link')

  const isDisabled = useMemo(() => {  
    return !currentActive && (
      selectionEmpty || 
      isTableCellEmpty(editor)
    ) && !isImageSelected
  }, [editor, currentActive, selectionEmpty, isImageSelected])

  return (
    <IconWrapper
      active={!!(currentActive || (isImageSelected && links.getCurrentLink()))}
      disabled={isDisabled}
      onClick={() => {
        const selection = editor.view.state.selection
        
        const isCellSelection = selection.$anchorCell && selection.$headCell
        
        if (isImageSelected) {
          const currentLink = links.getCurrentLink()
          if (currentLink) {
            setLink(currentLink)
          } else {
            setLink()
          }
          return
        }
        
        // Check if should return early (disabled)
        if (!currentActive && 
            (selection.empty || (isCellSelection && isTableCellEmpty(editor)))) {
            console.log('link disabled')
            return 
        }
        
        if (currentActive) {
          setLink(editor.getAttributes('link').href || null)
        } else {
          setLink()
        }
      }}
    >
      <FiLink size={18} />
    </IconWrapper>
  )
}