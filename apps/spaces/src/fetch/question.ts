import axios from 'axios'
import { useStore } from '../store'
import { App } from './app';
import { Explanation } from '../store/slices/explanation';
import { QuestionToBe } from '../components/QuestionManagementLayout/types';

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

const getHtmlByType = (appType, questionContent) => {
    if (appType === 'email') {
      const emailKeys = [
        'component-required-sender-name',
        'component-required-sender-email',
        'component-optional-subject'
      ]

      return Object.keys(questionContent)
        .filter(c => emailKeys.includes(c))
        .reduce((prev, current) => {
          return prev + questionContent[current]
        }, `<div id='type-content'>`) + '</div>'
    }
}

export const useSubmit = () => {

  let success = null
  const submit = async (id: string, question: QuestionToBe) => {
    const {
      explanations,
      // selectedApps,
      // selectedFieldsOfWork,
      // content,
      // optionalContent,
      // requiredContent,
      // handleTranslationsScene
    } = useStore.getState()
 
    let typeHtml = getHtmlByType(question.app.type, question.content)
    
    // const requiredHTML = Object.keys(requiredContent).reduce((prev, current) => {
    //   return prev + requiredContent[current]
    // }, `<div id='required-content'>`) + '</div>'
    
    // const optionalHTML = Object.keys(optionalContent).reduce((prev, current) => {
    //   return prev + optionalContent[current]
    // }, `<div id='optional-content'>`) + '</div>'
  
    const dynamicHTML = Object.keys(question.content)
      .filter(qk => qk.includes('component-text') || qk.includes('component-attachment'))
      .reduce((prev, current) => {
        return prev + question.content[current]
      }, `<div id='dynamic-content'>`) + '</div>'
  
    const finalContent = `<div>${typeHtml}${dynamicHTML}</div>`
  
    const payload = {
      quizId: parseInt(id),
      question: {
        name: question.name,
        content: finalContent,
        isPhishing: question.isPhishing,
        app: question.app.id,
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

      await axios.post<SubmitPayload[]>(`${process.env.REACT_APP_API_URL}/quiz/question`, payload)
      // alert('Question created')
      success = true
    } catch (err) {
      success = false
      console.log("🚀 ~ file: question.ts ~ line 20 ~ submit ~ err", err)    
    }
  }

  return {
    submit,
    success
  }
}