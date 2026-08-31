import { FunctionComponent } from "react"
import { Body2Regular, Body1SemiBold, styled, Toggle, Link2 } from "@horizontal-org/shira-ui"
import { useNavigate } from "react-router-dom"
import { useTranslation, Trans } from "react-i18next"
import { LanguageSelect } from '@horizontal-org/shira-ui'
import { getLanguageOptions } from "../../../../language/constants"
import i18n from "../../../../language/i18n"
import { SettingsCard } from "../../../Settings/SettingsCard"
import { SettingRow } from "../../../Settings/SettingsRow"
import { SettingDetails } from "../../../Settings/SettingsDetails"

interface Props {
  hasResultsEnabled: boolean;
  isUpdatingResults: boolean;
  onResultsEnabledChange: () => void;
}

export const GeneralSection: FunctionComponent<Props> = ({
  hasResultsEnabled,
  isUpdatingResults,
  onResultsEnabledChange,
}) => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <SettingsCard>
      <SettingRow>
        <SettingDetails>
          <Body1SemiBold>{t('settings.sections.language.title')}</Body1SemiBold>
          <StyledBody2Regular>{t('settings.sections.language.description')}</StyledBody2Regular>
        </SettingDetails>

        <LanguageSelect
          autoselect
          options={getLanguageOptions(t)}
          alternativeStyling={true}
          onChange={(value) => {
            i18n.changeLanguage(value)
            localStorage.setItem('lang', value)
          }}
        />
      </SettingRow>

      <SettingRow>
        <SettingDetails>
          <Body1SemiBold>{t('settings.sections.results.title')}</Body1SemiBold>
          <StyledBody2Regular>
            <Trans
              i18nKey="settings.sections.results.description"
              components={{
                learnMore: <Link2 onClick={() => navigate("https://www.shira.app/results/")} />,
              }}
            />
          </StyledBody2Regular>
        </SettingDetails>

        <Toggle
          isEnabled={hasResultsEnabled}
          onToggle={onResultsEnabledChange}
          disabled={isUpdatingResults}
        />
      </SettingRow>
    </SettingsCard>
  )
}

const StyledBody2Regular = styled(Body2Regular)`
  color: ${props => props.theme.colors.dark.darkGrey};
`
