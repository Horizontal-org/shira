import { FunctionComponent } from "react"
import { Body2Regular, Body1SemiBold, styled } from "@horizontal-org/shira-ui"
import { useTranslation } from "react-i18next"
import { LanguageSelect } from '@horizontal-org/shira-ui'
import { Language } from "../../../../store/slices/languages"
import i18n from "../../../../language/i18n"

interface Props {
  languages: Language[]
}

export const GeneralSection: FunctionComponent<Props> = ({ languages }) => {
  const { t } = useTranslation()

  const options = languages.map(l => ({ value: l.code, label: l.name }))

  return (
    <SettingsCard>
      <SettingRow>
        <SettingDetails>
          <Body1SemiBold>{t('settings.sections.language.title')}</Body1SemiBold>
          <Body2Regular>{t('settings.sections.language.description')}</Body2Regular>
        </SettingDetails>

        <LanguageSelect
          autoselect
          options={options}
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
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 24px;
  align-items: center;
  padding: 20px 0;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`

const SettingDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
`
