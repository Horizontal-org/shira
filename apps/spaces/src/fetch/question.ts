import axios from 'axios'
import { useStore } from '../store'
import { App } from './app';
import { Explanation } from '../store/slices/explanation';

interface SubmitPayload {
  question: {
    content: string;
    isPhishing: number;
    apps: App[],
  }
  explanations: {
    id?: number;
    position: string;
    text: string;
  }
}
export interface Question {
  id: string;
  name: string;
  isPhising: number;
}

export interface QuestionPayload {
  name: string
  content: string
  isPhising: number
  apps: App[]
  explanations: Explanation[]
  fieldOfWorkId: number
}

export interface CustomElements {
  textContent: string,
  explanationPosition: string | null
}

export const fetchQuestions = async() => {
  try {
    const res = await axios.get<Question[]>(`${process.env.REACT_APP_API_URL}/question`) 
    return res.data
  } catch (err) {
    console.log("🚀 ~ file: question.ts ~ line 20 ~ submit ~ err", err)    
  }
}

export const fetchQuestion = async(id: string) => {
  try {
    const res = await axios.get<QuestionPayload>(`${process.env.REACT_APP_API_URL}/question/${id}`) 
    return res.data
  } catch(err) {
    console.log("🚀 ~ file: question.ts ~ line 37 ~ submit ~ err", err)   
  }
}

export const deleteQuestion = async(id) => {
  try {
    const res = await axios.delete(`${process.env.REACT_APP_API_URL}/question/${id}`) 
    return res.data
  } catch (err) {
    console.log("🚀 ~ file: question.ts ~ line 20 ~ submit ~ err", err)    
  }
}

export const useSubmit = () => {

  const submit = async (
    name: string, 
    phising: boolean,
    id?: string
    ) => {
    const {
      explanations,
      selectedApps,
      selectedFieldsOfWork,
      content,
      optionalContent,
      requiredContent,
      handleTranslationsScene
    } = useStore.getState()
    
    const requiredHTML = Object.keys(requiredContent).reduce((prev, current) => {
      return prev + requiredContent[current]
    }, `<div id='required-content'>`) + '</div>'
    
    const optionalHTML = Object.keys(optionalContent).reduce((prev, current) => {
      return prev + optionalContent[current]
    }, `<div id='optional-content'>`) + '</div>'
  
    const dynamicHTML = Object.keys(content).reduce((prev, current) => {
      return prev + content[current]
    }, `<div id='dynamic-content'>`) + '</div>'
  
    const finalContent = `<div>${requiredHTML}${optionalHTML}${dynamicHTML}</div>`
  
    const payload = {
      question: {
        name: name,
        content: finalContent,
        isPhishing: phising,
        apps: selectedApps,
        fieldOfWork: selectedFieldsOfWork
      },
      explanations: explanations.map((e) => {
        console.log(e)
        return {
          id: e.id,
          position: e.position + '',
          index: e.index + '',
          text: e.text
        }
      })
    }
  
    try {
      if(!id) {
        await axios.post<SubmitPayload[]>(`${process.env.REACT_APP_API_URL}/question`, payload)
        alert('Question created')
      }

      if(id) {
        await axios.patch<SubmitPayload[]>(`${process.env.REACT_APP_API_URL}/question/${id}`, payload)
        alert('Question edited')
      }
      window.location.replace('/')
      // handleTranslationsScene(true)      
    } catch (err) {
      console.log("🚀 ~ file: question.ts ~ line 20 ~ submit ~ err", err)    
    }
  }

  return {
    submit
  }
}