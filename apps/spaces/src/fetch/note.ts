import axios from 'axios'
import { useState } from 'react'
import { useStore } from '../store'
import { QuizSuccessStates } from '../store/slices/quiz'

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

export const deleteNote = async (quizId: number, noteId: number) => {
  try {
    await axios.post(`${process.env.REACT_APP_API_URL}/note/delete`, { quizId, noteId })
    useStore.getState().setQuizActionSuccess(QuizSuccessStates.note_deleted)
  } catch (err) {
    console.log("🚀 ~ file: note.ts ~ deleteNote ~ err", err)
    throw new Error('Failed to delete note')
  }
}
