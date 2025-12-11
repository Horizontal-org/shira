import axios from 'axios'

export const getAssignedLearners = async(quizId: number) => {
  const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/learner-quiz/assignments/${quizId}`)
  return data
}

export const getUnassignedLearners = async(quizId: number) => {
  const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/learner-quiz/unassignments/${quizId}`)
  return data
}