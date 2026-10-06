import { FunctionComponent, useState } from "react";
import { styled, GeneralTooltip, ExplanationButton, Attachment, AttachmentType } from "@horizontal-org/shira-ui";
import { useStore } from "../../../../../store";
import { useTranslation } from 'react-i18next'
import { shallow } from "zustand/shallow";

interface Props {
  name: string;
  index: number;
  type: AttachmentType;
  explanationId: string;
}

export const AttachmentDragItem: FunctionComponent<Props> = ({
  name,
  index,
  explanationId,
  type
}) => {
  const nop = () => {}
  const [showExplanationButtonTooltip, setShowExplanationButtonTooltip] = useState(false)

  const { t } = useTranslation()
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

  return (
    <Wrapper>
        <Attachment
          name={name}
          type={type}
          active={selectedExplanation && selectedExplanation + '' == explanationId}
        />

        <GeneralTooltip
          enabled={true}
          show={showExplanationButtonTooltip}
          setShow={setShowExplanationButtonTooltip}
          label={t('create_question.tabs.content.explanation_tooltip')}
        >
          <ExplanationButton
            isText={true}
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
        </GeneralTooltip>
    </Wrapper>
  )
}

const Wrapper = styled.div`
display: flex;
`
