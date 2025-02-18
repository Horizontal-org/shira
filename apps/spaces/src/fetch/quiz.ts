import axios from "axios"

export interface UpdateQuizPayload {
  id: number
  title?: string
  published?: boolean
}

export const updateQuiz = async(toUpdate: UpdateQuizPayload) => {
  try {
    await axios.put(`${process.env.REACT_APP_API_URL}/quiz/${toUpdate.id}`, toUpdate)
  } catch (err) {
    console.log("🚀 ~ updateQuiz ~ err:", err)    
  }
}

export const getQuizzes = async() => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/quiz`) 
    return res.data
  } catch (err) {
    console.log("🚀 ~ file: question.ts ~ line 20 ~ submit ~ err", err)    
  }
}