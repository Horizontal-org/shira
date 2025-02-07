import React, { useEffect } from 'react'
import { useStore } from '../../../../../store'
import shallow from 'zustand/shallow'
import styled from 'styled-components'

import { FiBold, FiItalic, FiCode, FiList, FiLink } from 'react-icons/fi'
import { TbStrikethrough } from 'react-icons/tb'
import { HiOutlineChatBubbleBottomCenter } from 'react-icons/hi2'
import { MdClear } from 'react-icons/md'

export const MenuBar = ({ editor, setLink }) => {
  const {
    deleteExplanation,
    addExplanation,
    explanationIndex
  } = useStore((state) => ({
    addExplanation: state.addExplanation,
    deleteExplanation: state.deleteExplanation,
    explanations: state.explanations,
    explanationIndex: state.explanationIndex
  }), shallow)

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
   
      <IconWrapper 
        active={!!(editor.isActive('code'))}
        onClick={() => editor.chain().focus().toggleCode().run()}
      >
        <FiCode size={19} />
      </IconWrapper>

      {/* <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
        clear marks
      </button>
      <button onClick={() => editor.chain().focus().clearNodes().run()}>
        clear nodes
      </button> */}
      {/* <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={editor.isActive('paragraph') ? 'is-active' : ''}
      >
        paragraph
      </button> */}

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
      
      <IconWrapper 
        active={!!(editor.isActive('bulletList'))}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        <FiList size={18} />
      </IconWrapper>

      <Separate />
      {/* <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
        horizontal rule
      </button>
      <button onClick={() => editor.chain().focus().setHardBreak().run()}>
        hard break
      </button> */}

      <IconWrapper 
        active={false}
        onClick={() => {
          const newIndex = explanationIndex + 1
          editor.chain().focus().setExplanation({
            'data-explanation': newIndex,
          }).run()
          addExplanation(newIndex)
        }}
        disabled={editor.isActive('explanation')}
      >
        <HiOutlineChatBubbleBottomCenter size={18} />
      </IconWrapper>

      { editor.isActive('explanation') && (
        <RemoveExplanation
          onClick={() => {
            editor.chain().focus().run()
            const deleteIndex = editor.getAttributes('explanation')              
            deleteExplanation(deleteIndex['data-explanation'])
            editor.chain().focus().unsetExplanation().run()
          }}
        >
          <HiOutlineChatBubbleBottomCenter color='#3F6A3A' size={18}/>          
          <MdClear color='#e91e63' size={18}/>
        </RemoveExplanation>
      )}      
    </MenuWrapper>
  )
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

interface StyledIconWrapper {
  active: boolean
}

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
      stroke: #FCC934;
    }

    &:hover {
      > svg {
        stroke: #FCC934;
      }
    }
  `}
`

const RemoveExplanation = styled.div`
  margin-right: 8px;
  padding: 4px;
  cursor: pointer;
  transition: 0.2s all;
  border-radius: 4px;
  height: 20px;
  display: flex;
  align-items: center;

  &:hover {
    background: #eee;
  }

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
    color: #FCC934;

    &:hover {
      color: #FCC934;
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