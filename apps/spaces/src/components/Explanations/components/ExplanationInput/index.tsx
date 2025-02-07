import React, { FunctionComponent, useRef, useEffect, useState } from 'react'
import styled from 'styled-components'
import shallow from 'zustand/shallow';
import { useStore } from '../../../../store';

interface Props {
  onUpdate: (text: string) => void;
  text: string;
  unselect: () => void;
}

export const ExplanationInput: FunctionComponent<Props> = ({
  text,
  onUpdate,
  unselect
}) => {

  const textAreaRef = useRef(null);

  const resizeTextArea = () => {
    textAreaRef.current.style.height = "auto";
    textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
  };

  useEffect(resizeTextArea, [text]);

  useEffect(() => {
    textAreaRef.current.focus()
  }, [textAreaRef])

  return (
    <div>
      <StyledTextArea 
        ref={textAreaRef}
         placeholder="New explanation"
        rows={1}
        value={text}
        onChange={(e) => {
          onUpdate(e.target.value)
        }}
        onBlur={unselect}
      />
      {/* <button 
        onClick={onDelete}
      >
        delete
      </button> */}
    </div>
  )
}

const StyledTextArea = styled.textarea`
  min-height: 38px;
  resize: none;
  overflow-y: hidden;
  border: none;
  width: 100%;

  &:focus {
    border: none;
    outline: none;
  }
`