import { ChangeEvent } from 'react'
import { ExplanationIcon, styled } from '@shira/ui'

import { FiBold, FiItalic, FiCode, FiList, FiLink, FiUnderline, FiImage } from 'react-icons/fi'
import { TbStrikethrough } from 'react-icons/tb'
import { MdClear, MdHorizontalRule, MdFormatColorText } from 'react-icons/md'
import { BsBlockquoteRight } from "react-icons/bs";
import { GoListOrdered } from "react-icons/go";
import { GrBlockQuote } from "react-icons/gr";

interface MenuBarProps {
  editor: any
  setLink: () => void
  onImageUpload?: () => void
  isImageSelected?: boolean
  selectedImageHasExplanation?: boolean
  onAddTextExplanation?: () => void
  onRemoveTextExplanation?: () => void
  canAddTextExplanation?: boolean
  isTextExplanationActive?: boolean
  onAddImageExplanation?: () => void
  onRemoveImageExplanation?: () => void
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
}: MenuBarProps) => {

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
        active={!!(editor.isActive('link'))}
        onClick={() => editor.isActive('link') ? editor.chain().focus().unsetLink().run() :setLink()}
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

      <IconWrapper 
          onClick={onImageUpload}
          title="Upload Image"
        >
          <FiImage size={18} />
        </IconWrapper>

        <Separate />

      <Separate />

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
    </MenuWrapper>
  )
}


interface StyledIconWrapper {
  active?: boolean
  disabled?: boolean
}

const MenuWrapper = styled.div`
  padding: 8px;
  background: white;
  border-radius: 6px;
  margin-top: 4px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`


const IconWrapper = styled.div<StyledIconWrapper>`
  margin-right: 8px;
  padding: 4px;
  cursor: pointer;
  transition: 0.2s all;
  border-radius: 4px;
  height: 20px;
  width: 20px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background: #eee;
    > svg {
      stroke: #424242;
    }
  }

  > svg {
    stroke: #aaa;
  }

  ${props => props.active && `
    > svg {
      stroke: ${props.theme.secondary.dark};
    }

    &:hover {
      > svg {
        stroke: ${props.theme.secondary.dark};
      }
    }
  `}
`

const FillIconWrapper = styled(IconWrapper)<StyledIconWrapper>`

  &:hover {
    background: #eee;
    > svg {
      fill: #424242;
    }
  }

  > svg {
    fill: #aaa;
  }

  ${props => props.active && `
    > svg {
      fill: ${props.theme.secondary.dark};
    }

    &:hover {
      > svg {
        fill: ${props.theme.secondary.dark};
      }
    }
  `}
`

const InputColorWrapper = styled.div`
  display: flex;
  align-items: center;
`

const InputColor = styled.input`
  margin: 0 8px;
  display: inline-flex;
  vertical-align: bottom;
  border: none;
  border-radius: 50%;
  padding: 0; 
  height: 20px;
  width: 20px;
  cursor: pointer;

  ::-webkit-color-swatch {
    border: 0;
    border-radius: 50%;
  }

  ::-moz-color-swatch {
    border: 0;
    border-radius: 50%;
  }

`
const ExplanationIconWrapper = styled.div<StyledIconWrapper>`
  margin-right: 8px;
  padding: 4px;
  cursor: pointer;
  transition: 0.2s all;
  border-radius: 4px;
  height: 20px;
  display: flex;
  align-items: center;

  &:hover {
    background: ${props => props.disabled ? 'transparent' : '#eee'};
  }

  ${props => props.disabled && `
    cursor: not-allowed;
  `}

`

const Heading = styled.div<StyledIconWrapper>`
  margin-right: 8px;
  font-size: 12;
  padding: 4px;
  cursor: pointer;
  transition: 0.2s all;
  border-radius: 4px;
  height: 20px;
  width: 20px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background: #eee;
    color: #424242;
  }

  color: #aaa;

  ${props => props.active && `
    color: ${props.theme.secondary.dark};

    &:hover {
      color: ${props.theme.secondary.dark};
    }
  `}
`

const Separate = styled.div`
  margin-right: 8px;
  width: 2px;
  height: 16px;
  border-radius: 2px;
  background: #ccc;
`

const StyledBsBlockquoteRight = styled(BsBlockquoteRight)<StyledIconWrapper>`
  fill: #aaa;
  
   ${props => props.active && `
    > svg {
      fill: ${props.theme.secondary.dark};
    }

    &:hover {
      > svg {
        fill: ${props.theme.secondary.dark};
      }
    }
  `}
`