import { FunctionComponent } from "react";
import { styled } from "@horizontal-org/shira-ui";
import { MessageTipTapEditor } from "../../../../TipTapEditor/MessageTipTapEditor";
import { useStore } from "../../../../../store";
import { shallow } from "zustand/shallow";
import { MESSAGE_CONTENT_MAX_LENGTH } from "../../../../../utils/inputLimits";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

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
        maxLength={MESSAGE_CONTENT_MAX_LENGTH}
        characterLimitErrorText={t('error_messages.character_limit_error')}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  max-width: 100%;
`
