import { FunctionComponent } from "react";
import { EntityFlowBox } from "../../../EntityFlowBody";
import { Body2Regular, Body3, InputHeading, SubHeading3, TextInput } from "@horizontal-org/shira-ui";
import { useTranslation } from "react-i18next";
import { EMAIL_CONTENT_MAX_LENGTH, QUESTION_NAME_MAX_LENGTH } from "../../../../utils/inputLimits";
import { ActiveNote } from "../../../../types/active_note";
import { NoteTipTapEditor } from "../../../TipTapEditor/NoteTipTapEditor";

interface Props {
  note: ActiveNote
  handleNameChange: (name) => void;
  handleContentChange: (contentValue) => void;
}

export const NoteInfo: FunctionComponent<Props> = ({
  note,
  handleNameChange,
  handleContentChange
}) => {

  const { t } = useTranslation()

  return (
    <EntityFlowBox>

      <div>
        <InputHeading required>
          <SubHeading3>{t('create_note.note_info.note_name.title')}</SubHeading3>
          <Body3>{t('create_note.note_info.note_name.subtitle')}</Body3>
        </InputHeading>

        <TextInput
          label={t('create_note.note_info.note_name.placeholder')}
          value={note.name}
          showCharacterCount={true}
          maxLength={QUESTION_NAME_MAX_LENGTH}
          characterLimitErrorText={t('error_messages.character_limit_error')}
          onChange={(e) => { handleNameChange(e.target.value) }}
        />
      </div>


      <div>
        <InputHeading required>
          <SubHeading3 id="note-content-title">{t('create_note.note_info.note_content.title')}</SubHeading3>
          <Body3 id="note-content-subtitle">{t('create_note.note_info.note_content.subtitle')}</Body3>
        </InputHeading>

        <NoteTipTapEditor
          initialContent={note.content.value}
          maxLength={EMAIL_CONTENT_MAX_LENGTH}
          characterLimitErrorText={t('error_messages.character_limit_error')}
          onChange={handleContentChange}
        />
      </div>
    </EntityFlowBox>
  )
}
