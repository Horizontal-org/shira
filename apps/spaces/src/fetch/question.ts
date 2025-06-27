import axios from 'axios'
import { useStore } from '../store'
import { App } from './app';
import { Explanation } from '../store/slices/explanation';
import { QuestionToBe } from '../components/QuestionFlowManagement/types';
import { useState } from 'react';
import { shallow } from 'zustand/shallow';
import { QuizSuccessStates } from '../store/slices/quiz';

export interface Question {
  id: string;
  name: string;
  isPhising: number;
}

export interface QuestionImage {
  url: string;
  imageId: number
}

export interface QuestionPayload {
  name: string
  content: string
  isPhising: number
  apps: App[]
  explanations: Explanation[]
  fieldOfWorkId: number
  images?: QuestionImage[]
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
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/question/${id}`) 
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

const parseRequest = (question, explanations, quizId) => {
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

  return {
    quizId: parseInt(quizId),
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
}


export enum QuestionCRUDFeedback {
  processing = 'PROCESSING',
  error = 'ERROR',
  success = 'SUCCESS',
}

export const useQuestionCRUD = () => {

  const [actionFeedback, handleActionFeedback] = useState(null);
  
  //POST QUESTION
  const submit = async (quizId: string, question: QuestionToBe) => {
    handleActionFeedback(QuestionCRUDFeedback.processing)
    
    const {
      explanations,
    } = useStore.getState()
 
    const payload = parseRequest(question, explanations, quizId)

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/quiz/question`, payload)
      handleActionFeedback(QuestionCRUDFeedback.success)
    } catch (err) {
      handleActionFeedback(QuestionCRUDFeedback.error)
      console.log("🚀 ~ file: question.ts ~ line 20 ~ submit ~ err", err)    
    }
  }

  //DELET QUESTION
  const destroy = async (quizId: number, questionId: string) => {
    handleActionFeedback(QuestionCRUDFeedback.processing)

    const {
      setQuizActionSuccess,
    } = useStore.getState()

    const payload = {
      questionId,
      quizId
    }

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/quiz/question/delete`, payload)
      setQuizActionSuccess(QuizSuccessStates.question_deleted)
      handleActionFeedback(QuestionCRUDFeedback.success)
    } catch (err) {
      handleActionFeedback(QuestionCRUDFeedback.error)
      console.log("🚀 ~ file: question.ts ~ line 20 ~ submit ~ err", err)    
    }
  }

  //PUT QUESTION
  const edit = async (quizId: string, question: QuestionToBe, questionId) => {
    handleActionFeedback(QuestionCRUDFeedback.processing)

    const {
      explanations,
    } = useStore.getState()
 
    let payload = parseRequest(question, explanations, quizId)
    payload['questionId'] = parseInt(questionId)

    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/quiz/question`, payload)
      handleActionFeedback(QuestionCRUDFeedback.success)
    } catch (err) {
      handleActionFeedback(QuestionCRUDFeedback.error)
      console.log("🚀 ~ file: question.ts ~ line 20 ~ submit ~ err", err)    
    }
  }

  

  return {
    submit,
    edit,
    destroy,
    actionFeedback
  }
}