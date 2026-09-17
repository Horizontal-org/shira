import axios from 'axios'
import { useState } from 'react'

export enum NoteCRUDFeedback {
  processing = 'PROCESSING',
  error = 'ERROR',
  success = 'SUCCESS',
}

export const useNoteCRUD = () => {

  const [actionFeedback, handleActionFeedback] = useState(null)

  const submit = async (quizId: string, note: { name: string, content: { value: string } }) => {
    handleActionFeedback(NoteCRUDFeedback.processing)

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/note`, {
        quizId: Number(quizId),
        name: note.name,
        content: note.content.value
      })
      handleActionFeedback(NoteCRUDFeedback.success)
    } catch (err) {
      handleActionFeedback(NoteCRUDFeedback.error)
      console.log("🚀 ~ file: note.ts ~ submit ~ err", err)
    }
  }

  return { submit, actionFeedback }
}
