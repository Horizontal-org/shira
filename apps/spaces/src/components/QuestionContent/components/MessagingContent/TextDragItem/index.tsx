import { FunctionComponent } from "react";
import { Body2Regular, styled } from "@shira/ui";
import { MessageTipTapEditor } from "../../../../TipTapEditor/MessageTipTapEditor";
import { ExplanationButton } from "../../../../Explanations/components/ExplanationButton";
import { useStore } from "../../../../../store";
import { shallow } from "zustand/shallow";

interface Props {
  name: string
  index: number
  initialValue: string | null
}

export const TextDragItem: FunctionComponent<Props> = ({
  name,
  initialValue,
  index
}) => {

  const {
    updateActiveQuestionDraggableItem,
  } = useStore((state) => ({
    updateActiveQuestionDraggableItem: state.updateActiveQuestionDraggableItem,
  }), shallow)
    
  return (
    <Wrapper>
      <MessageTipTapEditor 
        editorId={name}
        onChange={(editorText) => {
          updateActiveQuestionDraggableItem(index, 'value', editorText)
        }}
        initialContent={initialValue}  
      />      
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 90%;
  max-width: 90%;
  padding-bottom: 40px;
`