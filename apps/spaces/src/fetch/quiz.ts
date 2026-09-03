import axios from "axios";

export interface UpdateQuizPayload {
  id: number
  title?: string
  published?: boolean
  assessmentMode?: boolean
}

export interface CreateTemplateQuizQuestionPayload {
  questionName: string
  content: string
  isPhishing: boolean
  appName: string
  images?: { id: number; name: string; url: string }[]
  explanations?: {
    position: string
    index: string
    text: string
  }[]
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
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/quiz`, {
      title: title,
      visibility: visibility
    })
    return (res.data?.quizId ?? res.data)
  } catch (err) {
    console.log("🚀 ~ createQuiz ~ err:", err)
    throw new Error('Failed to create quiz')
  }
}

export const createQuizFromTemplate = async (
  title: string,
  visibility: string,
  questions: CreateTemplateQuizQuestionPayload[],
) => {
  try {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/quiz-from-template`, {
      title,
      visibility,
      questions,
    })
    return (res.data?.quizId ?? res.data)
  } catch (err) {
    console.log("🚀 ~ createQuizFromTemplate ~ err:", err)
    throw new Error('Failed to create quiz from template')
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

export const validateQuizTitle = async (title: string) => {
  const { data } = await axios.post(
    `${process.env.REACT_APP_API_URL}/quiz/validate-name`,
    { title }
  )
  return data;
}




export const exportEntity = async (id: string, type: 'question' | 'quiz') => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/${type}/${id}/export`, {
      responseType: 'blob'
    })

    const disposition = res.headers['content-disposition'] as string | undefined
    const filename = disposition?.match(/filename="?([^"]+)"?/)?.[1] || `question-${id}.zip`

    const url = window.URL.createObjectURL(new Blob([res.data]))
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    link.remove()
    window.URL.revokeObjectURL(url)
  } catch (err) {
    console.log("🚀 ~ exportQuestion ~ err:", err)
    throw new Error('Failed to export question')
  }
}

export const importEntity = async (quizId: number, file: File) => {
  const formData = new FormData()
  formData.append('file', file)

  const { data } = await axios.post(
    `${process.env.REACT_APP_API_URL}/question/import?quizId=${quizId}`,
    formData,
    { headers: { 'Content-Type': 'multipart/form-data' } }
  )

  return data as { questionId: number }
}

export const importQuiz = async (file: File) => {
  const formData = new FormData()
  formData.append('file', file)

  const { data } = await axios.post(
    `${process.env.REACT_APP_API_URL}/quiz/import`,
    formData,
    { headers: { 'Content-Type': 'multipart/form-data' } }
  )

  return data as { quizId: number }
}
