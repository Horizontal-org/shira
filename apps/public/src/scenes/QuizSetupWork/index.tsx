import { FunctionComponent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { styled, Button } from '@horizontal-org/shira-ui'
import shallow from 'zustand/shallow'
import { Footer } from '../../components/UI/Footer'
import { SceneWithFooter } from '../../components/UI/SceneWithFooter'
import { SceneWrapper } from '../../components/UI/SceneWrapper'
import { Section } from '../../components/UI/Section'
import { WorkFieldItem } from '../../components/UI/WorkFieldItem'
import { useStore } from '../../store'
import { FooterButtonsSetup } from '../../components/UI/FooterSetup'

interface Props {}

export const QuizSetupWorkScene: FunctionComponent<Props> = () => {
  const { t } = useTranslation()
  const { changeScene, fieldsOfWork, updateFieldsOfWork, persistedFieldsOfWork } = useStore(
    (state) => ({
      changeScene: state.changeScene,
      fieldsOfWork: state.fieldsOfWork,
      updateFieldsOfWork: state.updateFieldsOfWork,
      persistedFieldsOfWork: state.setup.fields_of_work
    }),
    shallow
  )

  const [selected, handleSelected] = useState<Array<string>>(persistedFieldsOfWork)

  return (
    <SceneWrapper>
      <SceneWithFooter>
        <Section
          title={t('setup.fields_of_work.title')}
        >
          <>
            <p>
              <i>{t('setup.fields_of_work.select')}</i>    
            </p>
          </>

          <Fields>
            { fieldsOfWork.map((a, i) => (
              <WorkFieldItem 
                key={a.id}
                slug={a.slug}
                selected={selected.includes(a.id + '')}
                name={a.name}
                onClick={() => {
                  let newSelected = selected.slice()
                  if (selected.includes(a.id + '')) {
                    newSelected = selected.filter(s => s !== (a.id + ''))
                  } else {
                    if(selected.length < 3) {
                      newSelected.push(a.id + '')
                    }
                  }
                  handleSelected(newSelected)
                }}
              />
            ))}
          </Fields>
        </Section>

        <Footer
            title={t('setup.fields_of_work.footer_title')}
            action={(
              <FooterButtonsSetup
                onBack={() => { 
                  changeScene('quiz-setup-apps')
                }}
                onNext={() => { 
                  updateFieldsOfWork(selected)
                  changeScene('quiz')
                }}
                backText={t('setup.fields_of_work.back_button')}
                nextText={t('setup.fields_of_work.next_button')}
                disabled={selected.length === 0} 
              />
            )}
          />
      </SceneWithFooter>
    </SceneWrapper>
  )
}

const Fields = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    display: flex;
    flex-wrap: wrap;
  }

  > div {
    margin-top: 12px;
  }
`