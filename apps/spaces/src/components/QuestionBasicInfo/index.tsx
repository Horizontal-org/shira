import { FunctionComponent } from "react";
import {
  Box,
  Body3,
  FilterButton,
  styled,
  SubHeading3,
  TextInput
} from '@shira/ui'
import { useTranslation } from "react-i18next";
import { App } from "../../fetch/app";
import { ActiveQuestion } from "../../store/types/active_question";

interface Props {
  handleQuestion: (k, v) => void;
  handleApp: (app: App) => void
  question: ActiveQuestion
  apps: App[]
  initialAppType: string
}

const QUESTION_NAME_MAX_LENGTH = 100;

export const QuestionBasicInfo: FunctionComponent<Props> = ({
  handleQuestion,
  handleApp,
  question,
  apps,
  initialAppType
}) => {
  const { t } = useTranslation();

  return (
    <StyledBox>
      <div>
        <SubHeading3>{t('create_question.tabs.question_info.question_name.title')}</SubHeading3>
        <Body3>{t('create_question.tabs.question_info.question_name.subtitle')}</Body3>
      </div>

      <div>
        <TextInput
          label={t('create_question.tabs.question_info.question_name.question_name_placeholder')}
          value={question.name}
          showCharacterCount={true}
          maxLength={QUESTION_NAME_MAX_LENGTH}
          characterLimitErrorText={t('error_messages.character_limit_error')}
          onChange={(e) => {
            handleQuestion('name', e.target.value)
          }}
        />
      </div>

      <div>
        <SubHeading3>{t('create_question.tabs.question_info.phishing.title')}</SubHeading3>
        <FilterButtonsContainer>
          <FilterButton
            text={t('create_question.tabs.question_info.phishing.yes')}
            color="green"
            handleFilter={() => {
              handleQuestion('isPhishing', true)
            }}
            isActive={question.isPhishing}
          />

          <FilterButton
            text={t('create_question.tabs.question_info.phishing.no')}
            color="green"
            handleFilter={() => {
              handleQuestion('isPhishing', false)
            }}
            isActive={!question.isPhishing}
          />
        </FilterButtonsContainer>
      </div>

      <div>
        <SubHeading3>{t('create_question.tabs.question_info.apps.title')}</SubHeading3>
        <FilterButtonsContainer>

          {apps && apps
            .filter((a) => initialAppType ? initialAppType === a.type : true)
            .map((a) => (
              <FilterButton
                key={a.id}
                text={a.name}
                color="green"
                handleFilter={() => {
                  handleApp(a)
                }}
                isActive={question.app && question.app.id === a.id}
              />
            ))}

        </FilterButtonsContainer>
      </div>

    </StyledBox>
  )
}

const StyledBox = styled(Box)`
  position: relative;
  z-index: 1;
  padding: 48px;
  width: 1024px;
`

const FilterButtonsContainer = styled.div`
  margin-top: 8px;
  display: flex;
  gap: 8px;
`
