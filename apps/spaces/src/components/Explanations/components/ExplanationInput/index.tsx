import { FunctionComponent, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next';

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

  const { t } = useTranslation();

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
    <StyledTextArea 
      ref={textAreaRef}
        placeholder={t('create_question.tabs.content.explanation_content_placeholder')}
      rows={1}
      value={text}
      onChange={(e) => {
        onUpdate(e.target.value)
      }}
      onBlur={unselect}
    />
  )
}

const StyledTextArea = styled.textarea`
  resize: none;
  overflow-y: hidden;
  border: none;
  width: 100%;

  &:focus {
    border: none;
    outline: none;
  }
`