import { FunctionComponent, useState } from "react";
import { SettingsCard } from "../../../Settings/SettingsCard";
import { SettingRow } from "../../../Settings/SettingsRow";
import { SettingDetails } from "../../../Settings/SettingsDetails";
import { Body1SemiBold, Body2Regular, RadioGroup, Toggle, styled } from "@horizontal-org/shira-ui";
import { useTranslation } from "react-i18next";

interface SettingsProps {
  assessmentMode: boolean;
}

const MODES = [
  { value: 'assessment' },
  { value: 'learning' }
]

// const ORG_TYPES = [
//   {
//     value: "business", label: (
//       <Option>
//         <Body1SemiBold>Assessment Mode:</Body1SemiBold>
//         <Body2Regular>Learners receive feedback and explanations after submitting the quiz to help them learn from their mistakes</Body2Regular>
//       </Option>
//     )
//   },
//   {
//     value: "cibersecurity", label: (

//     )
//   }
// ];


export const Settings: FunctionComponent<SettingsProps> = ({
  assessmentMode,
  // toggleAssessmentMode
}) => {

  const { t } = useTranslation();
  const [orgType, setOrgType] = useState("business");

  return (
    <QuizSettingsCard>
      <SettingRow>
        <SettingDetails>
          <Body1SemiBold>{t('quiz.settings.assessment.title')}</Body1SemiBold>
          <RadioGroup
            name="organization-type"
            value={orgType}
            onChange={(value) => setOrgType(value)}
            options={MODES.map((m) => {
              return {
                value: m.value,
                label: (
                  <Option>
                    <Body1SemiBold>Assessment Mode:</Body1SemiBold>
                    <Body2Regular>Learners test their phishing detection skills without feedback or explanations to measure their actual performance level.</Body2Regular>
                  </Option>
                )
              }
            })}
          />

        </SettingDetails>

        {/* <Toggle
          size='big'
          isEnabled={assessmentMode}
          onToggle={() => {
            console.log('Assessment mode toggle clicked');
            toggleAssessmentMode();
          }}
        /> */}


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