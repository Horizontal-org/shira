import axios from "axios"
import { Question } from "../domain/question"

const getLang = () => {
  const lang = localStorage.getItem('lang')
  return lang ? lang : 'en'
}


export const getQuiz = async(apps:string[], fieldsOfWork: string[], language: string) => {
  const res = await axios.get<Question[]>(`${process.env.REACT_APP_API_URL}/question/quiz?fieldsOfWork=${fieldsOfWork.join(',')}&apps=${apps.join(',')}&lang=${language}`)
  return res.data
}