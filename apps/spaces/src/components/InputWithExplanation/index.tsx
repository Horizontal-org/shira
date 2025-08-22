import React, { FunctionComponent, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { shallow } from 'zustand/shallow'
import { useStore } from '../../store'
import { ExplanationButton } from '../Explanations/components/ExplanationButton'
import { CustomElements } from '../../fetch/question'
import { TextInput } from '@shira/ui'
import { QuestionTextInput } from '../../store/types/active_question'

const RE_VALIDATIONS = {
  phone:  /^[0-9\W]*$/
}

interface Props {
  placeholder?: string;
  name: string;
  id: string;
  required?: boolean;
  validation?: string,
  label?: string
  contentObject: QuestionTextInput
}

export const InputWithExplanation: FunctionComponent<Props> = ({
  placeholder,
  name,
  id,
  label,
  required,
  contentObject
}) => {

  const {
    addExplanation,
    explanationIndex,
    selectedExplanationIndex,
    changeSelected,
    updateActiveQuestionInput
  } = useStore((state) => ({
    addExplanation: state.addExplanation,
    explanationIndex: state.explanationIndex,
    selectedExplanationIndex: state.selectedExplanation,
    changeSelected: state.changeSelected,
    updateActiveQuestionInput: state.updateActiveQuestionInput
  }), shallow)

  const ref = useRef(null)

  return (
    <Wrapper>
      <TextInput
        name={name}
        id={id}
        required={required}
        ref={ref}
        label={label}
        value={contentObject.value}
        placeholder={placeholder}
        onChange={(e) => { 
          // if(RE_VALIDATIONS[validation] && !RE_VALIDATIONS[validation]?.test(ref.current.value)) return
          // setValue(ref.current.value)
          // onChange(
          //   ref.current.getAttribute('data-explanation'),
          //   ref.current.value,
          // )

          updateActiveQuestionInput(name, 'value', e.target.value)
        }}
        onBlur={(e) => {
          const hasExplanation = contentObject.explanation
          if (hasExplanation) {
            changeSelected(null)
          }
        }}
        onFocus={() => {
          const hasExplanation = contentObject.explanation
          if (hasExplanation) {
            changeSelected(parseInt(hasExplanation))
          }
        }}
      />
      
      <ExplanationButtonWrapper>
        <ExplanationButton
          active={selectedExplanationIndex && selectedExplanationIndex + '' === contentObject.explanation}
          onClick={() => {
            const hasExplanation = contentObject.explanation
            if (hasExplanation) {
              changeSelected(parseInt(hasExplanation))
            } else {
              const index = explanationIndex + 1
              addExplanation(index, label)
              updateActiveQuestionInput(name, 'explanation', index + '')            
            }
          }}
        />
      </ExplanationButtonWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  align-items: flex-end;
`

const ExplanationButtonWrapper = styled.div`
  padding-bottom: 8px;
`