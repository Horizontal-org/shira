import React, { FunctionComponent, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import shallow from 'zustand/shallow'
import { useStore } from '../../store'
import { ExplanationButton } from '../Explanations/components/ExplanationButton'
import { Input } from '../Input'
import { CustomElements } from '../../fetch/question'

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
  validation?: string
}

export const InputWithExplanation: FunctionComponent<Props> = ({
  placeholder,
  name,
  id,
  onChange,
  required,
  customRef,
  initialValue,
  validation
}) => {

  const [value, setValue] = useState<string>('')

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

  const inputRef = useRef<HTMLInputElement>()
  const ref = customRef || inputRef

  useEffect(() => {
    if(initialValue?.textContent || initialValue?.explanationPosition) {
      setValue(initialValue?.textContent)

      if(initialValue?.explanationPosition) {
        ref.current.setAttribute('data-explanation', initialValue?.explanationPosition)
      }
      ref.current.value=initialValue?.textContent

      onChange(initialValue?.explanationPosition, initialValue?.textContent)
    }
  }, [initialValue, ref])

  return (
    <div>
      <Separator>
        <Input
          id={id}
          name={name}
          required={required}
          ref={ref}
          value={value}
          placeholder={placeholder}
          onChange={() => { 
            if(RE_VALIDATIONS[validation] && !RE_VALIDATIONS[validation]?.test(ref.current.value)) return
            setValue(ref.current.value)
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
              addExplanation(index)
              onChange(
                index,
                ref.current.value,
              )
            }
          }}
        />
      </Separator>
    </div>
  )
}

const Separator = styled.div`
  padding: 8px 0;
  display: flex;
  align-items: center;
`