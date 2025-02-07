import { FunctionComponent, useRef } from "react";
import { Button } from "../Button";
import styled from 'styled-components'
import axios from 'axios'
import { useStore } from "../../store";
import shallow from "zustand/shallow";
import { useNavigate } from "react-router-dom";

interface Props {}

const exportTranslations = async(langs) => {
  langs.forEach(async(l) => {      
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/question/global-export/${l.code}`)
      var link = document.createElement('a');
      link.setAttribute('download', `questions_global_translations_${l.code}.html`);
      link.setAttribute('href', 'data:' + 'text/plain'  +  ';charset=utf-8,' + res.data);
      link.click()
    } catch (e) {
      console.log('language not found -> ', l.code)
    }
  })
}

export const GlobalImportExport: FunctionComponent<Props> = () => {
  const navigate = useNavigate()
  const { 
    languages,
    handleGlobalTranslations
  } = useStore((state) => ({
    languages: state.languages,
    handleGlobalTranslations: state.handleGlobalTranslations
  }), shallow)

  const hiddenImportInput = useRef(null);

  const handleImport = async(e) => {
    const files = [...e.target.files]
    const validFiles = []
    for (let i = 0; i < files.length; i++) {
      try {
        const lang = files[i].name.split('_')[3].split('.')[0];
        const fileText = await files[i].text()
        const html = new DOMParser().parseFromString(fileText, 'text/html')
        validFiles.push({
          file: files[i],
          html,
          lang
        })
      } catch (e) {
        console.log("🚀 ~ file: index.tsx:51 ~ awaitfiles.forEach ~ e:", e)
      }

    }
    
    handleGlobalTranslations(validFiles)
    navigate('/translations')    
  }

  return (
    <div>
      <p>Languages</p>
      <LanguageButtons>
        <div>
          <Button 
            text="Import"
            onClick={() => {
              hiddenImportInput.current.click()
            }}
          />
          <input
            type="file"
            multiple={true}
            ref={hiddenImportInput}
            onChange={handleImport}
            style={{display: 'none'}}
          />
        </div>
        <Separator>
          <Button 
            text="Export"
            onClick={() => {
              exportTranslations(languages)
            }}
          />
        </Separator>
      </LanguageButtons>
    </div>
  )
}

const Separator = styled.div`
  padding-left: 8px;
`

const LanguageButtons = styled.div`
  display: flex;
`