import axios from "axios"

export const fetchQuestionTranslations = async (id) => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/question/${id}/translations`)
    return res.data
  } catch (err) {
    console.log("🚀 ~ file: question.ts ~ line 20 ~ submit ~ err", err)
  }
}

export const getLanguages = async () => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/language`)
    return res.data
  } catch (err) {
    console.log("🚀 ~ file: question.ts ~ line 20 ~ submit ~ err", err)
  }
}