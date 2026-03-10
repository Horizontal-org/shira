import axios from "axios";

export interface UpdateQuizPayload {
  id: number
  title?: string
  published?: boolean
}

export const updateQuiz = async (toUpdate: UpdateQuizPayload) => {
  try {
    await axios.put(`${process.env.REACT_APP_API_URL}/quiz/${toUpdate.id}`, toUpdate)
  } catch (err) {
    console.log("🚀 ~ updateQuiz ~ err:", err)
  }
}

export interface ReorderQuizPayload {
  quizId: number
  newOrder: {
    position: number
    questionId: number
  }[]
}

export const reorderQuiz = async (reorderData: ReorderQuizPayload) => {
  try {
    await axios.post(`${process.env.REACT_APP_API_URL}/quiz/reorder`, reorderData)
  } catch (err) {
    console.log("🚀 ~ reorderQuiz ~ err:", err)
  }
}

export const deleteQuiz = async (id: number) => {
  try {
    await axios.delete(`${process.env.REACT_APP_API_URL}/quiz/${id}`)
  } catch (err) {
    console.log("🚀 ~ deleteQuiz ~ err:", err)
  }
}

export const createQuiz = async (title: string, visibility: string) => {
  try {
    await axios.post(`${process.env.REACT_APP_API_URL}/quiz`, {
      title: title,
      visibility: visibility
    })
  } catch (err) {
    console.log("🚀 ~ createQuiz ~ err:", err)
  }
}

export const getQuizzes = async () => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/quiz`)
    return res.data
  } catch (err) {
    console.log("🚀 ~ file: question.ts ~ line 20 ~ submit ~ err", err)
  }
}

export const getQuizById = async (id: number) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/quiz/${id}`)
    console.log("🚀 ~ getQuizById ~ res:", res.data)
    return res.data
  } catch (err) {
    console.log("🚀 ~ updateQuiz ~ err:", err)
    throw new Error('Failed to fetch quiz')
  }
}

export const duplicateQuestion = async (quizId: number, questionId: number) => {
  try {
    await axios.post(`${process.env.REACT_APP_API_URL}/quiz/${quizId}/questions/${questionId}/duplicate`)
  } catch (err) {
    console.log("🚀 ~ duplicateQuestion ~ err:", err)
    throw new Error('Failed to duplicate question')
  }
}

export const duplicateQuiz = async (quizId: number, title: string, visibility: string) => {
  try {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/quiz/${quizId}/duplicate`, {
      title,
      visibility
    })
    return res.data
  } catch (err) {
    console.log("🚀 ~ duplicateQuiz ~ err:", err)
    throw new Error('Failed to duplicate quiz')
  }
}

export const validateQuizTitle = async (title: string, spaceId: number) => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_API_URL}/quiz/validate-name`, { params: { title, spaceId } }
  )
  return data;
}
