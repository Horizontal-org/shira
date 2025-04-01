import React, { FunctionComponent, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import shallow from 'zustand/shallow'
import { useStore } from '../../store'
import { ExplanationButton } from '../Explanations/components/ExplanationButton'
import { Input } from '../Input'
import { CustomElements } from '../../fetch/question'
import { TextInput } from '@shira/ui'

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
  validation?: string,
  value?: string
  label?: string
}

export const InputWithExplanation: FunctionComponent<Props> = ({
  placeholder,
  name,
  id,
  onChange,
  label,
  required,
  customRef,
  // initialValue,
  validation,
  value
}) => {

  // const [value, setValue] = useState<string>('')

  const {
    addExplanation,
    explanationIndex,
    selectedExplanationIndex,
    changeSelected
  } = useStore((state) => ({
    addExplanation: state.addExplanation,
    explanationIndex: state.explanationIndex,
    selectedExplanationIndex: state.selectedExplanation,
    changeSelected: state.changeSelected
  }), shallow)

  const ref = useRef(null)
  // const ref = customRef || inputRef
  // const ref = inputRef
  console.log("🚀 ~ ref:", ref)

  // useEffect(() => {
  //   if(initialValue?.textContent || initialValue?.explanationPosition) {
  //     setValue(initialValue?.textContent)

  //     if(initialValue?.explanationPosition) {
  //       ref.current.setAttribute('data-explanation', initialValue?.explanationPosition)
  //     }
  //     ref.current.value=initialValue?.textContent

  //     onChange(initialValue?.explanationPosition, initialValue?.textContent)
  //   }
  // }, [initialValue, ref])

  // id={id}
  // name={name}

  return (
    <Wrapper>
        <TextInput
          name={name}
          id={id}
          required={required}
          ref={ref}
          label={label}
          value={value}
          placeholder={placeholder}
          onChange={() => { 
            if(RE_VALIDATIONS[validation] && !RE_VALIDATIONS[validation]?.test(ref.current.value)) return
            // setValue(ref.current.value)
            onChange(
              ref.current.getAttribute('data-explanation'),
              ref.current.value,
            )
          }}
          onBlur={(e) => {
            const hasExplanation = ref.current.getAttribute('data-explanation')
            if (hasExplanation) {
              changeSelected(null)
            }
          }}
          onFocus={() => {
            const hasExplanation = ref.current.getAttribute('data-explanation')
            if (hasExplanation) {
              changeSelected(parseInt(hasExplanation))
            }
          }}
        />
        
        <ExplanationButton
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
        />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`