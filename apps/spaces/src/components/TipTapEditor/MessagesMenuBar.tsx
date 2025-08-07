import { ChangeEvent } from 'react'
import { ExplanationIcon } from '@shira/ui'

import { FiBold, FiItalic, FiCode, FiList, FiLink, FiUnderline, FiImage } from 'react-icons/fi'
import { 
  TbStrikethrough, 
} from 'react-icons/tb'
import {
  MenuWrapper,
  IconWrapper,
} from './styles/MessagesMenuBarStyles'

interface MessagesMenuBarProps {
  editor: any
  onAddTextExplanation?: () => void
  onRemoveTextExplanation?: () => void
  canAddTextExplanation?: boolean
  isTextExplanationActive?: boolean
}

export const MessagesMenuBar = ({ 
  editor, 
  onAddTextExplanation,
  onRemoveTextExplanation,
  canAddTextExplanation = false,
  isTextExplanationActive = false,
}: MessagesMenuBarProps) => {

  if (!editor) {
    return null
  }

  return (
    <MenuWrapper>
      <IconWrapper 
        active={!!(editor.isActive('bold'))}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <FiBold size={18} />
      </IconWrapper>

      <IconWrapper 
        active={!!(editor.isActive('italic'))}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <FiItalic size={18} />
      </IconWrapper>

      <IconWrapper 
        active={!!(editor.isActive('strike'))}
        onClick={() => editor.chain().focus().toggleStrike().run()}
      >
        <TbStrikethrough size={19} />
      </IconWrapper>

      {/* pending decision */}
      {/* <ExplanationIconWrapper
        onClick={onAddTextExplanation}
        disabled={!canAddTextExplanation}
        title="Add text explanation"
      >
        <ExplanationIcon />
      </ExplanationIconWrapper>


      {isTextExplanationActive && (
        <ExplanationIconWrapper
          onClick={onRemoveTextExplanation}
          title="Remove text explanation"
        >
          <ExplanationIcon/>          
          <MdClear color='#e91e63' size={18}/>
        </ExplanationIconWrapper>
      )}  */}

    </MenuWrapper>
  )
}