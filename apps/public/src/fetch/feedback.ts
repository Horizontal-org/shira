import axios from 'axios'
import { CreateSurvey } from '../domain/survey'

export const submitFeedback = async(data) => {
  try {
    

    const res = await axios.post(`${process.env.REACT_APP_API_URL}/survey`, data)
    return true
  } catch (err) {
    console.log("🚀 ~ file: apps.ts ~ line 14 ~ getApps ~ err", err)    
    return false
  }
}