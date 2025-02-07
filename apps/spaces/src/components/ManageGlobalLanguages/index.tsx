import { FunctionComponent, useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import styled from 'styled-components';
import shallow from "zustand/shallow";
import { fetchQuestionTranslations } from "../../fetch/translations";
import { useStore } from "../../store";
import { Button } from "../Button";
import { QuestionDetails } from "./components/QuestionDetails";
import { QuestionsWithTranslationsList } from "./components/QuestionsWithTranslationsList";
import axios from "axios";
 
interface Props {}

const submit = async(globalTranslations) => {
  // const files = globalTranslations.map(gt => vf.originalFile)
  for (let i = 0; i < globalTranslations.length; i++) {
    const gb = globalTranslations[i]
    const formData = new FormData()
    formData.append('files', gb.file)

    const promise = axios.post(`${process.env.REACT_APP_API_URL}/question/global-import`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    toast.promise(promise, {
      loading: `Importing ${gb.file.name}`,
      success: `${gb.file.name} Imported!`,
      error: `Importing ${gb.file.name}`,
    }, {
      duration: 20000,
      style: {
        minWidth: '450px',
      },
    });
  }  
}


export const ManageGlobalLanguages: FunctionComponent<Props> = ({}) => {
  const navigate = useNavigate()
  const {
    languages,
    globalTranslations
  } = useStore((state) => ({
    showTranslationsScene: state.showTranslationsScene,    
    handleTranslationsScene: state.handleTranslationsScene,
    languages: state.languages,
    globalTranslations: state.globalTranslations
  }), shallow)
    console.log("🚀 ~ file: index.tsx:48 ~ globalTranslations:", globalTranslations)
  
  const [focusedQuestionFile, handleFocusedQuestion] = useState(null)
  const [focusedQuestionCurrent, handleFocusedQuestionCurrent] = useState(null)

  if (!globalTranslations) {
    return (
      <Wrapper>
        <div>
          <div>
            <Link to='/'>{`<- back home`}</Link>
          </div>
          <h2>Loading...</h2>
        </div>
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <div>
        <div>
          <div>
            <Link to='/'>{`<- back home`}</Link>
          </div>
          <h2>Global import</h2>  
          <div>
            <p>
              Files to import
              <ul>
                { globalTranslations.map((gt, k) => (
                  <li key={k}>
                    { gt.file.name }
                  </li>
                ))}
              </ul>
            </p>
          </div>
          <p>
            Translations have not been imported yet. Review and validate to finish importing.
          </p>
        </div>
        <QuestionsWithTranslationsList
          translations={globalTranslations}
          onShowDetails={(q) => {
            fetchQuestionTranslations(q.id).then((r) => {
              handleFocusedQuestionCurrent(r)
            })
            handleFocusedQuestion(q)
          }}
        />
        <Footer>
          <Button 
            onClick={() => {
              submit(globalTranslations)
              navigate('/')
            }}
            text="Submit"
          />
        </Footer>
      </div>  

      <QuestionDetails 
        fileQuestion={focusedQuestionFile}
        currentQuestion={focusedQuestionCurrent}
        languages={languages}
        onClose={() => {
          handleFocusedQuestion(null)
          handleFocusedQuestionCurrent(null)
        }}
      />
    </Wrapper>
  )
}


const Wrapper = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: center;

  > div {
    width: 1024px;
  }
`

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 10px 0;
`