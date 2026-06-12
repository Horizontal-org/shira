import { FunctionComponent } from "react"
import { Body2Regular, Body1SemiBold, styled } from "@horizontal-org/shira-ui"
import { useTranslation } from "react-i18next"
import { LanguageSelect } from '@horizontal-org/shira-ui'
import { LANG_OPTIONS } from "../../../../language/constants"
import i18n from "../../../../language/i18n"

interface Props {}

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
          options={LANG_OPTIONS}
          onChange={(value) => {
            i18n.changeLanguage(value)
            localStorage.setItem('lang', value)
          }}
        />
      </SettingRow>
    </SettingsCard>
  )
}

const SettingsCard = styled.section`
  background: ${props => props.theme.colors.light.white};
  border-radius: 32px;
  padding: 8px 42px;
  max-width: 1280px;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: 8px 24px;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    border-radius: 24px;
    padding: 8px 20px;
  }
`

const SettingRow = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  align-items: center;
  padding: 20px 0;

`

const SettingDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
`

const StyledBody2Regular = styled(Body2Regular)`
  color: ${props => props.theme.colors.dark.darkGrey};
`
