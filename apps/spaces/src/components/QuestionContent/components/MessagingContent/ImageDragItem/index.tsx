import { FunctionComponent, useEffect, useRef } from "react";
import { Body2Regular, styled } from "@shira/ui";
import { MessageTipTapEditor } from "../../../../TipTapEditor/MessageTipTapEditor";
import { LoadingOverlay } from "../../../../LoadingOverlay/LoadingOverlay";
import { ImageObject } from "../interfaces/MessagingDragItem";
import { ExplanationButton } from "../../../../Explanations/components/ExplanationButton";
import { useStore } from "../../../../../store";
import { shallow } from "zustand/shallow";
import { subscribe, unsubscribe } from "../../../../../utils/customEvent";

interface Props {
  name: string
  value: ImageObject;
  onExplanationChange: (explId: number) => void
  explanationId?: number
}

export const ImageDragItem: FunctionComponent<Props> = ({
  name,
  value,
  onExplanationChange,
  explanationId
}) => {

  const {
      addExplanation,
      explanationIndex,      
      changeSelected
    } = useStore((state) => ({
      addExplanation: state.addExplanation,
      explanationIndex: state.explanationIndex,
      changeSelected: state.changeSelected
    }), shallow)
  
    const ref = useRef(null)
  
    const subscribeToDelete = (newExplId) => {
      subscribe('delete-explanation', (event) => {
        if (newExplId === event.detail.deleteIndex) {
          // ref.current.removeAttribute('data-explanation')
          onExplanationChange(null)
        }        
      })
    }

    useEffect(() => {      
      return () => {
        unsubscribe('delete-explanation')
      }
    }, [])

    useEffect(() => {
      if(explanationId && ref) {
        ref.current.setAttribute('data-explanation', explanationId)
        subscribeToDelete(explanationId)
      }
    }, [explanationId, ref])

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
            active={false}
            disabled={false}
             onClick={() => {
                const hasExplanation = ref.current.getAttribute('data-explanation')
                if (hasExplanation) {
                  changeSelected(parseInt(hasExplanation))
                } else {
                  const index = explanationIndex + 1
                  ref.current.setAttribute('data-explanation', index + '')
                  addExplanation(index, '')
                  onExplanationChange(index)
                  subscribeToDelete(index)
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