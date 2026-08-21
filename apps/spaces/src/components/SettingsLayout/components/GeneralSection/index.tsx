import { FunctionComponent } from "react"
import { Body2Regular, Body1SemiBold, styled } from "@horizontal-org/shira-ui"
import { useTranslation } from "react-i18next"
import { LanguageSelect } from '@horizontal-org/shira-ui'
import { getLanguageOptions } from "../../../../language/constants"
import i18n from "../../../../language/i18n"
import { SettingsCard } from "../../../Settings/SettingsCard"
import { SettingRow } from "../../../Settings/SettingsRow"
import { SettingDetails } from "../../../Settings/SettingsDetails"

interface Props { }

export const GeneralSection: FunctionComponent<Props> = () => {
  const { t } = useTranslation()

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
    </SettingsCard>
  )
}

const StyledBody2Regular = styled(Body2Regular)`
  color: ${props => props.theme.colors.dark.darkGrey};
`
