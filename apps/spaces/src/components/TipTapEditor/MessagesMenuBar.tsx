import { FiBold, FiItalic } from 'react-icons/fi'
import { 
  TbStrikethrough, 
} from 'react-icons/tb'
import {
  MenuWrapper,
  IconWrapper,
} from './styles/MessagesMenuBarStyles'
import { MenuLink } from './components/MenuLink'
import { useLink } from './hooks/useLink'

interface MessagesMenuBarProps {
  editor: any
  setLink: (url?: string | null) => void
}

export const MessagesMenuBar = ({ 
  editor,
  setLink,
}: MessagesMenuBarProps) => {

  const links = useLink(editor)

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

      <MenuLink 
        editor={editor}
        setLink={setLink}
        links={links}
        isImageSelected={false}
      />

    </MenuWrapper>
  )
}