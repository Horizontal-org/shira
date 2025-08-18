import { FunctionComponent, useEffect, useRef } from "react";
import { Body2Regular, styled } from "@shira/ui";
import { MessageTipTapEditor } from "../../../../TipTapEditor/MessageTipTapEditor";
import { LoadingOverlay } from "../../../../LoadingOverlay/LoadingOverlay";
import { ExplanationButton } from "../../../../Explanations/components/ExplanationButton";
import { useStore } from "../../../../../store";
import { shallow } from "zustand/shallow";
import { subscribe, unsubscribe } from "../../../../../utils/customEvent";
import { ImageObject } from "../../../../../store/types/active_question";

interface Props {
  value: ImageObject;
  index: number
  explanationId?: string
}

export const ImageDragItem: FunctionComponent<Props> = ({
  value,
  explanationId,
  index
}) => {

  const {
      addExplanation,
      explanationIndex,      
      changeSelected,
      selectedExplanation,
      updateActiveQuestionDraggableItem
    } = useStore((state) => ({
      addExplanation: state.addExplanation,
      explanationIndex: state.explanationIndex,
      changeSelected: state.changeSelected,
      selectedExplanation: state.selectedExplanation,
      updateActiveQuestionDraggableItem: state.updateActiveQuestionDraggableItem
    }), shallow)
  
    const ref = useRef(null)

  return (
    <Wrapper>
      { value ? (
        <ImageWrapper>
          <ImageElement 
            ref={ref}
            src={value.url}
            alt={value.originalFilename}
          />          
          <ExplanationButton
            active={selectedExplanation && selectedExplanation + '' == explanationId}
            disabled={false}
             onClick={() => {
                const hasExplanation = explanationId
                if (hasExplanation) {
                  changeSelected(parseInt(hasExplanation))
                } else {
                  const newExplanationIndex = explanationIndex + 1
                  addExplanation(newExplanationIndex, '')
                  updateActiveQuestionDraggableItem(index, 'explanation', newExplanationIndex + '')
                }
            }}
          />
        </ImageWrapper>
      ) : (
        <LoadingOverlay/>
      )}

    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding-bottom: 30px;
  padding-left: 20px;
`

const ImageWrapper = styled.div`
  display: flex;
  align-items: center;
`

const ImageElement = styled.img`
  border-radius: 4px;      
  max-width: 500px;
  max-height: 400px;
  min-width: 50px;
  min-height: 30px;
  cursor: pointer;
  object-fit: contain;
  border: 2px solid #F3F3F3 !important;

  &.has-explanation {
    border: 2px solid #F3F9CF !important;
  }
    
  &.mark-active {
    border: 2px solid #FCC934 !important;
  }
  
  &:hover {
    opacity: 0.9;
  }
`