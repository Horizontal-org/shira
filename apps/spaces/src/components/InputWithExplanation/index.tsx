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
  onChange?: (expl, value) => void
  required?: boolean;
  customRef?: React.MutableRefObject<HTMLInputElement>
  initialValue?: CustomElements
  initialExplanationValue?: string
  validation?: string,
  value?: string
  label?: string
  contentObject: QuestionTextInput
}

export const InputWithExplanation: FunctionComponent<Props> = ({
  placeholder,
  name,
  id,
  onChange,
  label,
  required,
  customRef,
  initialExplanationValue,
  validation,
  value,
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

  // useEffect(() => {
  //   if(initialExplanationValue && ref) {
  //     ref.current.setAttribute('data-explanation', initialExplanationValue)
  //   }
  // }, [initialExplanationValue, ref])

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
      
       {/* <ExplanationButton
        active={ref.current && selectedExplanationIndex + '' == ref.current.getAttribute('data-explanation')}
        onClick={() => {
          const hasExplanation = ref.current.getAttribute('data-explanation')
          if (hasExplanation) {
            changeSelected(parseInt(hasExplanation))
          } else {
            const index = explanationIndex + 1
            ref.current.setAttribute('data-explanation', index + '')
            addExplanation(index, label)
            onChange(
              index,
              ref.current.value,
            )
          }
        }}
      /> */}

      <ExplanationButton
        active={false}
        onClick={() => {
          const hasExplanation = contentObject.explanation
          if (hasExplanation) {
            changeSelected(parseInt(hasExplanation))
          } else {
            const index = explanationIndex + 1
            // ref.current.setAttribute('data-explanation', index + '')
            addExplanation(index, label)
            updateActiveQuestionInput(name, 'explanation', index + '')            
          }
        }}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`