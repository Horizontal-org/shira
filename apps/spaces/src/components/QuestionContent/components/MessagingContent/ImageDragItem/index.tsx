import { FunctionComponent, useRef } from "react";
import { ExplanationButton, styled } from "@shira/ui";
import { LoadingOverlay } from "../../../../LoadingOverlay/LoadingOverlay";
import { useStore } from "../../../../../store";
import { shallow } from "zustand/shallow";
import { ImageObject } from "../../../../../store/types/active_question";
import { MdOutlineImage } from "react-icons/md";
import { ErrorBanner } from "../../../../ErrorBanner";

interface Props {
  value?: ImageObject | null;
  index: number
  explanationId?: string
  isLoading?: boolean
  uploadError?: string | null
  uploadFilename?: string | null
}

export const ImageDragItem: FunctionComponent<Props> = ({
  value,
  explanationId,
  index,
  isLoading = false,
  uploadError,
  uploadFilename
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
      {uploadError && (
        <ErrorBanner role="alert" aria-live="polite">
          {uploadError}
        </ErrorBanner>
      )}

      {value ? (
        <ImageWrapper>
          <ImageElement
            ref={ref}
            src={value.url}
            alt={value.originalFilename}
          />
          <ExplanationButton
            hasExplanation={Boolean(explanationId)}
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
      ) : isLoading ? (
        <LoadingOverlay />
      ) : uploadFilename ? (
        <PlaceholderCard>
          <PlaceholderTitle>{uploadFilename}</PlaceholderTitle>
          <PlaceholderIconWrapper>
            <MdOutlineImage size={56} />
          </PlaceholderIconWrapper>
        </PlaceholderCard>
      ) : null
      }

    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding-left: 12px;
  width: 100%;
`

const ImageWrapper = styled.div`
  display: flex;
  align-items: center;
`

const PlaceholderCard = styled.div`
  width: 410px;
  min-height: 280px;
  border: 2px solid ${props => props.theme.colors.light.paleGrey};
  background: ${props => props.theme.colors.light.white};
  overflow: hidden;
`

const PlaceholderTitle = styled.div`
  background: ${props => props.theme.colors.light.paleGrey};
  color: ${props => props.theme.colors.dark.darkGrey};
  font-size: 18px;
  line-height: 1.4;
  padding: 20px 20px 16px;
`

const PlaceholderIconWrapper = styled.div`
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.dark.darkGrey};
`

const ImageElement = styled.img`
  border-radius: 4px;
  max-width: 500px;
  max-height: 400px;
  min-width: 50px;
  min-height: 30px;
  cursor: pointer;
  object-fit: contain;
  border: 2px solid ${props => props.theme.colors.light.paleGrey} !important;

  &.has-explanation {
    border: 2px solid ${props => props.theme.colors.green1} !important;
  }
    
  &.mark-active {
    border: 2px solid #FCC934 !important;
  }
  
  &:hover {
    opacity: 0.9;
  }
`
