import { ChangeEvent } from 'react'
import { ExplanationIcon } from '@shira/ui'
import { useLink } from './hooks/useLink'
import { FiBold, FiItalic, FiCode, FiList, FiLink, FiUnderline, FiImage } from 'react-icons/fi'
import { 
  TbStrikethrough, 
  TbTablePlus, 
  TbTableMinus,
  TbColumnInsertLeft,
  TbColumnInsertRight,
  TbColumnRemove 
} from 'react-icons/tb'
import { MdClear, MdHorizontalRule, MdFormatColorText } from 'react-icons/md'
import { GoListOrdered } from "react-icons/go";
import { GrBlockQuote } from "react-icons/gr";
import { 
  AiOutlineInsertRowAbove, 
  AiOutlineInsertRowBelow, 
  AiOutlineDeleteRow,
} from "react-icons/ai";
import {
  MenuWrapper,
  IconWrapper,
  FillIconWrapper,
  Heading,
  Separate,
  InputColorWrapper,
  InputColor,
  ExplanationIconWrapper
} from './styles/MenuBarStyles'
import {  isTableCellEmpty } from './utils'

interface MenuBarProps {
  editor: any
  setLink: (url?: string | null) => void
  onImageUpload?: () => void
  isImageSelected?: boolean
  selectedImageHasExplanation?: boolean
  onAddTextExplanation?: () => void
  onRemoveTextExplanation?: () => void
  canAddTextExplanation?: boolean
  isTextExplanationActive?: boolean
  onAddImageExplanation?: () => void
  onRemoveImageExplanation?: () => void

  isInTable?: boolean
  isTableCellSelected?: boolean
  selectedTableCellHasExplanation?: boolean
  onInsertTable?: (rows?: number, cols?: number, withHeaderRow?: boolean) => void
  onAddTableCellExplanation?: () => void
  onRemoveTableCellExplanation?: () => void
  onAddRowAbove?: () => void
  onAddRowBelow?: () => void
  onDeleteRow?: () => void
  onAddColumnLeft?: () => void
  onAddColumnRight?: () => void
  onDeleteColumn?: () => void
  onDeleteTable?: () => void

  enableImage?: boolean
  enableTables?: boolean

}

export const MenuBar = ({ 
  editor, 
  setLink,
  onImageUpload,
  isImageSelected = false,
  selectedImageHasExplanation = false,
  onAddTextExplanation,
  onRemoveTextExplanation,
  canAddTextExplanation = false,
  isTextExplanationActive = false,
  onAddImageExplanation,
  onRemoveImageExplanation,

  isInTable = false,
  isTableCellSelected = false,
  selectedTableCellHasExplanation = false,
  onInsertTable,
  onAddTableCellExplanation,
  onRemoveTableCellExplanation,
  onAddRowAbove,
  onAddRowBelow,
  onDeleteRow,
  onAddColumnLeft,
  onAddColumnRight,
  onDeleteColumn,
  onDeleteTable,

  enableImage = true,
  enableTables = true
}: MenuBarProps) => {
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
        active={!!(editor.isActive('underline'))}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
      >
        <FiUnderline size={18} />
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
   
      <IconWrapper 
        active={!!(editor.isActive('code'))}
        onClick={() => editor.chain().focus().toggleCode().run()}
      >
        <FiCode size={19} />
      </IconWrapper>

      <FillIconWrapper 
        active={!!(editor.isActive('blockquote'))}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
      >
        <GrBlockQuote 
          size={19} 
        />
      </FillIconWrapper>

      <IconWrapper 
        active={!!(editor.isActive('horizontalRule'))}
        onClick={() => editor.chain().focus().setHorizontalRule().run()}

      >
        <MdHorizontalRule 
          size={19} 
          color='#aaa'
        />
      </IconWrapper>

      <FillIconWrapper 
        active={!!(editor.isActive('orderedList'))}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <GoListOrdered size={19} />
      </FillIconWrapper>
      
      <IconWrapper 
        active={!!(editor.isActive('bulletList'))}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        <FiList size={18} />
      </IconWrapper>

      <Heading
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        active={editor.isActive('heading', { level: 1 })}
      >
        h1
      </Heading>
      
      <Heading
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        active={editor.isActive('heading', { level: 2 })}
      >
        h2
      </Heading>

      <Heading
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        active={editor.isActive('heading', { level: 3 })}
      >
        h3
      </Heading>

      <Heading
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        active={editor.isActive('heading', { level: 4 })}
      >
        h4
      </Heading>

      <Heading
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        active={editor.isActive('heading', { level: 5 })}
      >
        h5
      </Heading>

      <IconWrapper 
        active={!!(editor.isActive('link') || (isImageSelected && links.getCurrentLink()))}
        disabled={!!(
        !editor.isActive('link') && 
        (
          editor.view.state.selection.empty || 
          isTableCellEmpty(editor)
        ) &&
        !isImageSelected
      )}
        onClick={() => {
          const selection = editor.view.state.selection
          
          const isCellSelection = selection.constructor.name === '_CellSelection'
          const isCellEmpty = isCellSelection && isTableCellEmpty(editor)
          
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
          if (!editor.isActive('link') && 
              (selection.empty || (isCellSelection && isTableCellEmpty(editor)))) {
            return 
          }
          
          const isActive = editor.isActive('link')
          if (isActive) {
            setLink(editor.getAttributes('link').href || null)
          } else {
            setLink()
          }
        }}
      >
        <FiLink size={18} />
      </IconWrapper>


      <Separate />

      <InputColorWrapper>
        <MdFormatColorText size={19} color={editor.getAttributes('textStyle').color}/>
        <InputColor
          type="color"
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            editor.chain().focus().setColor(event.target.value).run()
          }}
          value={editor.getAttributes('textStyle').color}
          data-testid="setColor"
        />
      </InputColorWrapper>

      {enableImage && (
        <IconWrapper 
          onClick={onImageUpload}
          title="Upload Image"
        >
          <FiImage size={18} />
        </IconWrapper>
      )}

      <Separate />

      {enableTables && !isInTable && (
        <IconWrapper 
          onClick={() => onInsertTable?.(3, 3, true)}
          title="Insert Table"
        >
          <TbTablePlus size={18} />
        </IconWrapper>
      )}

      {enableTables && isInTable && (
        <>
          <IconWrapper 
            onClick={onAddRowAbove}
            title="Add Row Above"
          >
            <AiOutlineInsertRowAbove size={18} />
          </IconWrapper>

          <IconWrapper 
            onClick={onAddRowBelow}
            title="Add Row Below"
          >
            <AiOutlineInsertRowBelow size={18} />
          </IconWrapper>

          <IconWrapper 
            onClick={onDeleteRow}
            title="Delete Row"
          >
            <AiOutlineDeleteRow size={18} />
          </IconWrapper>

          <IconWrapper 
            onClick={onAddColumnLeft}
            title="Add Column Left"
          >
            <TbColumnInsertLeft size={18} />
          </IconWrapper>

          <IconWrapper 
            onClick={onAddColumnRight}
            title="Add Column Right"
          >
            <TbColumnInsertRight size={18} />
          </IconWrapper>

          <IconWrapper 
            onClick={onDeleteColumn}
            title="Delete Column"
          >
            <TbColumnRemove size={18} />
          </IconWrapper>

          <IconWrapper 
            onClick={onDeleteTable}
            title="Delete Table"
          >
            <TbTableMinus size={18} />
          </IconWrapper>
        </>
      )}

      <ExplanationIconWrapper
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
      )} 

      {isImageSelected && (
        <>
          <Separate />
          
          {!selectedImageHasExplanation ? (
            <ExplanationIconWrapper
              onClick={onAddImageExplanation}
              title="Add image explanation"
            >
              <ExplanationIcon />
              <span style={{ fontSize: '10px', marginLeft: '2px' }}>IMG</span>
            </ExplanationIconWrapper>
          ) : (
            <ExplanationIconWrapper
              onClick={onRemoveImageExplanation}
              title="Remove image explanation"
            >
              <ExplanationIcon />
              <MdClear color='#e91e63' size={14}/>
            </ExplanationIconWrapper>
          )}
        </>
      )}

      {isTableCellSelected && (
        <>
          <Separate />
          
          {!selectedTableCellHasExplanation ? (
            <ExplanationIconWrapper
              onClick={onAddTableCellExplanation}
              title="Add table cell explanation"
            >
              <ExplanationIcon />
              <span style={{ fontSize: '10px', marginLeft: '2px' }}>TBL</span>
            </ExplanationIconWrapper>
          ) : (
            <ExplanationIconWrapper
              onClick={onRemoveTableCellExplanation}
              title="Remove table cell explanation"
            >
              <ExplanationIcon />
              <MdClear color='#e91e63' size={14}/>
            </ExplanationIconWrapper>
          )}
        </>
      )}

    </MenuWrapper>
  )
}