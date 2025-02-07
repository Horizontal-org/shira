import { FunctionComponent, useEffect, useState } from "react";
import styled, { createGlobalStyle } from 'styled-components'
import { useStore } from "../../store";
import shallow from "zustand/shallow";
import axios from "axios";
import { fetchQuestionTranslations } from "../../fetch/translations";
import { OriginalLanguage } from "./components/OriginalLanguage";
import { Languages } from "./components/Languages";
import { Exporter } from "./components/Exporter";
import { SmallCloseButton } from "../SmallCloseButton";
import { QuestionComparison } from "../QuestionComparison";
import { Select } from "../Select";
import { ControlledSelect } from "../ControlledSelect";
import { Button } from "../Button";
import { toast } from "react-hot-toast";

interface Props {}

const exportTranslations = async(id, langs) => {
    langs.forEach(async(l) => {      
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/question/${id}/export/${l.code}`)
        var link = document.createElement('a');
        link.setAttribute('download', `question_${id}_translation_${l.code}.html`);
        link.setAttribute('href', 'data:' + 'text/plain'  +  ';charset=utf-8,' + res.data);
        link.click()
      } catch (e) {
        console.log('language not found -> ', l.code)
      }
    })
}

const submit = async(validFiles, id) => {
  const files = validFiles.map(vf => vf.file)

  for (let i = 0; i < files.length; i++) {
    const formData = new FormData()
    const fileName = files[i].name
    formData.append('files', files[i])
    formData.append('id', id)

    const promise = axios.post(`${process.env.REACT_APP_API_URL}/question/${id}/import`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    toast.promise(promise, {
      loading: `Importing ${fileName}`,
      success: `${fileName} Imported!`,
      error: `Importing ${fileName}`,
    }, {
      duration: 20000,
      style: {
        minWidth: '450px',
      },
    });
  }  
}


const validateFiles = async(translations) => {
  let langs = []

  for (let i = 0; i < translations.length; i++) {
    try {
      const langCode = translations[i].name.split('_')[3].split('.')[0];
      const fileText = await translations[i].text()
      const html = new DOMParser().parseFromString(fileText, 'text/html')
      const explanationHTML = html.getElementById('explanations')
      langs.push({
        lang: langCode,
        questionElement: html.childNodes[0],
        explanationElement: explanationHTML ? explanationHTML : null,
        file: translations[i]
      })
    } catch (e) { 
      console.log("🚀 ~ file: index.tsx:49 ~ validateFiles ~ e:", e)      
    }
  }

  return {
    langs: langs
  }
}

const getFileNames = (langs) => {
  let names = []
  for (let i = 0; i < langs.length; i++) {
    names.push(langs[i].file.name)
  }
  
  return names
}

export const ManageQuestionLanguages: FunctionComponent<Props> = () => {

  const { 
    showTranslationsScene,
    handleTranslationsScene,
    languages
  } = useStore((state) => ({
    showTranslationsScene: state.showTranslationsScene,    
    handleTranslationsScene: state.handleTranslationsScene,
    languages: state.languages
  }), shallow)

  const [question, handleQuestion] = useState(null)
  const [newLanguageFiles, handleNewLanguageFiles] = useState(null)
  console.log("🚀 ~ file: index.tsx:84 ~ newLanguageFiles:", newLanguageFiles)
  const [lang, handleLang] = useState({
    value: 'en',
    label: 'English'
  })

  useEffect(() => {
    if (showTranslationsScene) {      
      fetchQuestionTranslations(showTranslationsScene).then((q) => {
        handleQuestion(q)      
      })
    } else {
      handleQuestion(null)
    }    
  }, [showTranslationsScene])
  

  return (
    <Wrapper show={showTranslationsScene}>
      <div>
        <Header>
          <div>
            <h2>{newLanguageFiles ? 'Compare current with file' : 'Manage translations'}</h2>
          </div>
          <SmallCloseButton onClose={() => { 
            handleTranslationsScene(null)
            handleNewLanguageFiles(null)
            handleQuestion(null)
          }}/>
        </Header>

        { question ? (
          <>
          { newLanguageFiles ? (
            <>
              <div>
                <p>
                  Files to import 
                  <ul>                  
                    { getFileNames(newLanguageFiles.langs).map((nf, k) => (
                      <li key={nf}>
                        { nf }
                      </li>
                    ))}
                  </ul>
                </p>
              </div>
              <ControlledSelectWrapper>              
                <ControlledSelect
                  onChange={(v) => {
                    handleLang(v)
                  }}
                  selected={lang}
                  options={languages.map((l) => {
                    return {
                      value: l.code,
                      label: l.name,
                    }
                  })}
                />              
                <Button 
                  text="Cancel Import"
                  onClick={() => {
                    handleNewLanguageFiles(null)
                  }}
                />
                <Button 
                  text="Submit Import"
                  onClick={() => {
                    submit(newLanguageFiles.langs, question.id)
                    handleTranslationsScene(null)
                    handleNewLanguageFiles(null)
                    handleQuestion(null)
                  }}
                />
              </ControlledSelectWrapper>
              <QuestionComparison 
                currentQuestion={question}
                newQuestion={newLanguageFiles}
                currentLang={lang.value}
              />
            </>
            ) : (
              <>
                <Exporter 
                  onExport={() => { exportTranslations(question.id, languages) }}
                  onImportFiles={(files) => { 
                    validateFiles(files).then((f) => {
                      handleNewLanguageFiles(f) 
                    })
                  }}
                />     

                { question && !newLanguageFiles && (
                  <Content>
                    <OriginalLanguage
                      translation={question.questionTranslations.find(qt => question.languageId === qt.languageId.id)}
                      explanations={question.explanations}
                      langId={question.languageId}
                    />
                    <Languages
                      translations={question.questionTranslations.filter(qt => question.languageId !== qt.languageId.id)}
                      explanations={question.explanations}
                      languages={languages.filter((l) => l.id !== question.languageId)}
                    />
                  </Content>

                )}
              </>       
            )}
          </>
        ) : (
          <h4>Loading...</h4>
        )}      
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  background: white;
  display: ${props => props.show ? 'flex' : 'none'};
  position: absolute;
  top: 0;
  justify-content: center;

  > div {
    padding: 10px;
    box-sizing: border-box;
    width: 1024px;
  }
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  > div {
    width: 45%;
  }
`

const ControlledSelectWrapper = styled.div`
  padding-top: 16px;
  display: flex;

  > button {
    margin-left: 12px;
  }
`