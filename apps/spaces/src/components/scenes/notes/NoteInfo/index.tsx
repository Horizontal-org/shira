import { FunctionComponent } from "react";
import { EntityFlowBox } from "../../../EntityFlowBody";
import { Body3, SubHeading3, TextInput } from "@horizontal-org/shira-ui";
import { useTranslation } from "react-i18next";
import { QUESTION_NAME_MAX_LENGTH } from "../../../../utils/inputLimits";
import { ActiveNote } from "../../../../types/active_note";

interface Props {
  note: ActiveNote
  handleNoteChange: (k, v) => void;
}

export const NoteInfo: FunctionComponent<Props> = ({
  note,
  handleNoteChange
}) => {

  const { t } = useTranslation()

  return (
    <EntityFlowBox>
      <div>
        <SubHeading3>{t('create_question.tabs.question_info.question_name.title')}</SubHeading3>
        <Body3>{t('create_question.tabs.question_info.question_name.subtitle')}</Body3>
      </div>

      <div>
        <TextInput
          label={t('create_question.tabs.question_info.question_name.question_name_placeholder')}
          value={note.name}
          showCharacterCount={true}
          maxLength={QUESTION_NAME_MAX_LENGTH}
          characterLimitErrorText={t('error_messages.character_limit_error')}
          onChange={(e) => { handleNoteChange('name', e.target.value) }}
        />
      </div>
    </EntityFlowBox>
  )
}