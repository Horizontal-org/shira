import axios from "axios"

export const getQuizzes = async() => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/quiz`) 
    return res.data
  } catch (err) {
    console.log("🚀 ~ file: question.ts ~ line 20 ~ submit ~ err", err)    
  }
}