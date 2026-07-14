import { FunctionComponent, useState } from "react";
import { SettingsCard } from "../../../Settings/SettingsCard";
import { SettingRow } from "../../../Settings/SettingsRow";
import { SettingDetails } from "../../../Settings/SettingsDetails";
import { Body1SemiBold, Body2Regular, RadioGroup, styled } from "@horizontal-org/shira-ui";
import { useTranslation } from "react-i18next";

interface SettingsProps {
  assessmentMode: boolean;
  onAssessmentModeChange: (value: boolean) => void;
}

const MODES = [
  { value: 'assessment' },
  { value: 'learning' }
]

export const Settings: FunctionComponent<SettingsProps> = ({
  assessmentMode,
  onAssessmentModeChange
}) => {

  const { t } = useTranslation();
  const [mode, setMode] = useState(assessmentMode ? 'assessment' : 'learning');

  return (
    <QuizSettingsCard>
      <SettingRow>
        <SettingDetails>
          {/* <Body1SemiBold>{t('quiz.settings.assessment.title')}</Body1SemiBold> */}
          <RadioGroup
            name="quiz-mode"
            value={mode}
            onChange={(value) => {
              setMode(value)
              onAssessmentModeChange(value === 'assessment' ? true : false)
            }}
            options={MODES.map((m) => {
              return {
                value: m.value,
                label: (
                  <Option>
                    <Body1SemiBold>{t(`quiz.settings.${m.value}.title`)}</Body1SemiBold>
                    <Body2Regular>{t(`quiz.settings.${m.value}.description`)}</Body2Regular>
                  </Option>
                )
              }
            })}
          />

        </SettingDetails>

      </SettingRow>
    </QuizSettingsCard>
  )
}

const QuizSettingsCard = styled(SettingsCard)`
  border: 1px solid #DBE3A3;
`

const Option = styled.div`
  padding-left: 4px;
`