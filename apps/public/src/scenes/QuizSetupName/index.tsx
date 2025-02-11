import { FunctionComponent, useState, useEffect } from "react";
import { lowerCase } from 'lodash'
import { styled, Button } from '@shira/ui'
import shallow from 'zustand/shallow'

import { Footer } from "../../components/UI/Footer";
import { SceneWrapper } from "../../components/UI/SceneWrapper";
import { FiChevronRight } from 'react-icons/fi'
import { Subtitle } from "../../components/UI/Subtitle";
import { BigTextInput } from "../../components/UI/BigTextInput";
import { FiRefreshCcw } from 'react-icons/fi'
import { getRandomName } from "../../utils/randomName";
import { useStore } from "../../store";
import { Section } from "../../components/UI/Section";
import { SceneWithFooter } from "../../components/UI/SceneWithFooter";
import { useTranslation } from "react-i18next";
import useGetWidth from "../../hooks/useGetWidth";

interface Props {}

export const QuizSetupNameScene: FunctionComponent<Props> = () => {
  const { t } = useTranslation()
  const { width } = useGetWidth()
  const {
    changeScene,
    persistedName,
    persistedEmail,
    updateName,
    apps,
    fetchApp,
    fieldsOfWork,
    fetchFieldsOfWork
  } = useStore(
    (state) => ({ 
      changeScene: state.changeScene,
      persistedName: state.setup.name, 
      persistedEmail: state.setup.email, 
      updateName: state.updateName,
      apps: state.apps, 
      fetchApp: state.fetchApp,
      fieldsOfWork: state.fieldsOfWork, 
      fetchFieldsOfWork: state.fetchFieldsOfWork
    }),
    shallow
  )

  const [name, handleName] = useState(persistedName || '')
  const [email, handleEmail] = useState(persistedEmail || '')

  useEffect(() => {
    if (apps.length === 0) {
      fetchApp()
    }

    if (fieldsOfWork.length === 0) {
      fetchFieldsOfWork()
    }
  }, [])

  return (
    <SceneWrapper>
      <SceneWithFooter>

        <Section
          title={t('setup.name.title')}
        >
          {width > 490 && (
            <p>
              <Subtitle>{t('setup.name.subtitle')}</Subtitle>
              <Subtitle>{t('setup.name.recommendation')}</Subtitle>
            </p>)
          }

          <FormContent>
            <FormInputs>
              <BigTextInput 
                placeholder={t('setup.name.name')}
                onChange={(e) => { handleName(e.target.value) }}
                value={name}
              />
              <BigTextInput 
                placeholder={t('setup.name.email')}
                onChange={(e) => { handleEmail(e.target.value) }}
                value={email}
              />
            </FormInputs>
            <FormButton>
              <Button
                type='primary'
                onClick={() => {
                  const randomName = getRandomName()
                  handleName(randomName)
                  handleEmail(`${lowerCase(randomName)}@awesomemail.com`)
                }}
                text={t('setup.name.random_button')}
                leftIcon={<FiRefreshCcw size={18}/>}
              />
            </FormButton>
          </FormContent>

          {width < 490 && (
            <p>
              <Subtitle>{t('setup.name.subtitle')}</Subtitle>
              <Subtitle>{t('setup.name.recommendation')}</Subtitle>
            </p>)
          }
        </Section>

        <Footer 
          title={t('setup.name.footer_title')}
          action={(
            <Button 
              disabled={name.length === 0 || email.length === 0}
              size={width > 768 ? 'sm' : 'lg'}
              onClick={() => { 
                updateName(name, email)
                changeScene('quiz-setup-apps')
              }} 
              text={t('setup.name.next_button')}
              type="primary"
              rightIcon={<FiChevronRight size={18}/>}
            />             
          )}
        />
      </SceneWithFooter>  
    </SceneWrapper>
  )
}

const FormContent = styled.div`
  padding-top: 20px;
  @media(min-width: ${props => props.theme.breakpoints.md}) and (max-height: 680px) {
    padding-top: 0;
  }
`

const FormButton = styled.div`
  display: flex;
  justify-content: center;
`

const FormInputs = styled.div`
  display: flex;
  flex-direction: column;
  > input {
    margin-bottom: 20px;
  }
`