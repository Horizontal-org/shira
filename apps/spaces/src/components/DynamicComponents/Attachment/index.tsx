import { FunctionComponent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { renderToString } from 'react-dom/server'
import styled from 'styled-components'
import shallow from "zustand/shallow";
import { useStore } from "../../../store";
import { ExplanationButton } from "../../Explanations/components/ExplanationButton";
import { Input } from "../../Input";
import { InputWithExplanation } from "../../InputWithExplanation";
import useParseHTML from "../../../hooks/useParseHtml";

interface Props {
  componentId?: string;
  componentPosition?: string;
  initialContent?: string
}

export const Attachment: FunctionComponent<Props> = ({ componentId, componentPosition, initialContent }) => {
  const {
    setContent
  } = useStore((state) => ({
    setContent: state.setContent
  }), shallow)
    
  useEffect(() => {
    parseHtml()
  }, [componentPosition])

  const inputRef = useRef<HTMLInputElement>()
  const componentFinalId = `component-attachment-${componentId}`
  const { parseCustomElement } = useParseHTML(initialContent)
  const parseHtml = () => {
    const attachmentExplanation = inputRef.current.getAttribute('data-explanation')
    const explanation = attachmentExplanation ? ` data-explanation='${attachmentExplanation}' ` : ''  
    const position = ` data-position=${componentPosition} `
    setContent(componentFinalId, `<span ${explanation}${position}id='${componentFinalId}'>${inputRef.current.value}</span>`)
  }

  // here use input with explanation 

  return (
    <Wrapper>
      <Separator>
        <InputWrapper>
        
          <InputWithExplanation 
            id={componentFinalId} 
            name='sender-name'
            customRef={inputRef}
            placeholder={'Attachment name'}
            initialValue={parseCustomElement(`component-attachment-${componentId}`)}
            required={true}
            onChange={(expl, value) => {
              parseHtml()
            }}
          />
        </InputWrapper>
      </Separator>
    </Wrapper>
  )
}

const Wrapper = styled.div`
`

const Separator = styled.div`
  padding: 0 ;
  display: flex;
  align-items: center;
`

const InputWrapper = styled.div`
  border-radius: 4px;
  padding: 6px;
  background: #eee;
  display: inline-block;

  > div {
    background: white;
    border-radius: 4px;
    padding: 4px 8px;
  }
`