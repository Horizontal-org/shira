import axios from "axios"
import { Question } from "../domain/question"

export const getQuiz = async(apps:string[], fieldsOfWork: string[], language: string) => {
  const res = await axios.get<Question[]>(`${process.env.REACT_APP_API_URL}/question/demo?fieldsOfWork=${fieldsOfWork.join(',')}&apps=${apps.join(',')}&lang=${language}`)
  return res.data
}

export const getCustomQuizByHash = async(hash:string) => {
  const res = await axios.get(`${process.env.REACT_APP_API_URL}/quiz/hash/${hash}`)
  return res.data
}