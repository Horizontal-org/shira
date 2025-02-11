import { FunctionComponent, useState } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { styled, Button } from '@shira/ui'
import { AppItem } from '../../components/UI/AppItem'
import { Footer } from '../../components/UI/Footer'
import { SceneWithFooter } from '../../components/UI/SceneWithFooter'
import { SceneWrapper } from '../../components/UI/SceneWrapper'
import { Section } from '../../components/UI/Section'
import { useStore } from '../../store'
import shallow from 'zustand/shallow'
import { useTranslation } from 'react-i18next'
import useGetWidth from '../../hooks/useGetWidth'
import { FooterButtonsSetup } from '../../components/UI/FooterSetup'

interface Props {}

export const QuizSetupAppsScene: FunctionComponent<Props> = () => {
  const { t } = useTranslation()
  const { width } = useGetWidth()
  const { changeScene, apps, updateApps, persistedApps } = useStore(
    (state) => ({
      changeScene: state.changeScene,
      apps: state.apps,
      updateApps: state.updateApps,
      persistedApps: state.setup.apps
    }),
    shallow
  )

  const [selected, handleSelected] = useState<Array<string>>(persistedApps)

  return (
    <SceneWrapper>
      <SceneWithFooter>
        <Section
          title={t('setup.apps.title')}
        >
          <>
          <p>
              <i>{t('setup.apps.select')}</i>    
            </p>
          </>

          <Apps>
            { apps.map((a, i) => (
              <AppItem 
                key={a.id}
                selected={selected.includes(a.id + '')}
                name={a.name}
                onClick={() => {
                  let newSelected = selected.slice()
                  if (selected.includes(a.id + '')) {
                    newSelected = selected.filter(s => s !== (a.id + ''))
                  } else {
                    newSelected.push(a.id + '')
                  }
                  handleSelected(newSelected)
                }}
              />
            ))}
          </Apps>
        </Section>

        <Footer
            title={t('setup.apps.footer_title')}
            action={(
              <FooterButtonsSetup
                onBack={() => { 
                  changeScene('quiz-setup-name')
                }}
                onNext={() => { 
                  updateApps(selected)
                  changeScene('quiz-setup-work')
                }}
                backText={t('setup.apps.back_button')}
                nextText={t('setup.apps.next_button')}
                disabled={selected.length === 0} 
              />
            )}
          />
      </SceneWithFooter>
    </SceneWrapper>
  )
}

const Apps = styled.div`
  padding-top: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 40px 20px;
  @media (min-width:  ${props => props.theme.breakpoints.lg}) {
    width: 70%;
    margin: 0 auto;
  }
  @media (max-width:  ${props => props.theme.breakpoints.sm}) {
    gap: 40px 12px;
  }

  @media(min-width: ${props => props.theme.breakpoints.md}) and (max-height: 680px) {
    padding-top: 0px;
    gap: 20px 20px;
  }
`