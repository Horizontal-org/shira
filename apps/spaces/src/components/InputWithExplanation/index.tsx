import { FunctionComponent, useRef } from 'react'
import styled from 'styled-components'
import { shallow } from 'zustand/shallow'
import { useStore } from '../../store'
import { ExplanationButton, TextInput } from '@shira/ui'
import { QuestionTextInput } from '../../store/types/active_question'

interface Props {
  placeholder?: string;
  name: string;
  id: string;
  required?: boolean;
  validation?: string,
  label?: string,
  maxLength?: number,
  characterLimitErrorText?: string,
  showCharacterCount?: boolean,
  contentObject: QuestionTextInput
}

export const InputWithExplanation: FunctionComponent<Props> = ({
  placeholder,
  name,
  id,
  label,
  required,
  maxLength,
  characterLimitErrorText,
  contentObject,
  showCharacterCount
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
  const hasValue = contentObject.value != null && contentObject.value.trim() !== "";

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
          updateActiveQuestionInput(name, 'value', e.target.value)
        }}
        onBlur={() => {
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
        showCharacterCount={showCharacterCount}
        maxLength={maxLength}
        characterLimitErrorText={characterLimitErrorText}
      />

      <ExplanationButtonWrapper $hasFloatingLabel={hasValue}>
        <ExplanationButton
          disabled={!hasValue}
          hasExplanation={contentObject.explanation != null && contentObject.explanation?.length > 0}
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
  align-items: flex-start;
`

const ExplanationButtonWrapper = styled.div<{ $hasFloatingLabel: boolean }>`
  padding-top: ${({ $hasFloatingLabel }) => $hasFloatingLabel ? '28px' : '0'};
`
