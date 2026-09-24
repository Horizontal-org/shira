import { FunctionComponent, useMemo, useState } from "react";
import { NoteType } from "../../../domain/quiz_item";
import { Note, styled } from "@horizontal-org/shira-ui";
import useParseHTML from "../../../hooks/useParseHTML";
import { QuizFooter } from "../QuizFooter";
import { SceneWithFooter } from "../SceneWithFooter";
import { NoteActions } from "../NoteActions";

interface Props {
  note: NoteType
  images?: Array<{ imageId: number; url: string }>
  onNext: () => void
  goBack: () => void
  changeScene?: (scene: string) => void
  hasAssessmentEnabled?: boolean
}

export const NoteView: FunctionComponent<Props> = ({
  note,
  images = [],
  onNext,
  goBack,
  changeScene,
  hasAssessmentEnabled
}) => {

  const {
    parseNoteContent,
  } = useParseHTML(note.content, images)

  const content = useMemo(parseNoteContent, [parseNoteContent, note.content])

  const [isExpanded, handleIsExpanded] = useState(false)

  return (
    <SceneWithFooter>
      <NoteWrapper>
        <Note
          content={content}
        />
      </NoteWrapper>

      {/* no counter on notes, the footer counter only tracks questions */}
      <QuizFooter
        hasAnswer={false}
        showExplanations={false}
        isExpanded={isExpanded}
        handleIsExpanded={handleIsExpanded}
        action={
          <NoteActions
            goBack={goBack}
            onNext={onNext}
            isExpanded={isExpanded}
          />
        }
      />
    </SceneWithFooter>
  )
}

const NoteWrapper = styled.div`
  height: calc(100vh - 86px);
  max-height: calc(100vh - 86px);
  overflow-y: scroll;
  background: ${props => props.theme.colors.light.paleGreen};
`