import axios from 'axios'

export const getAssignedLearners = async(quizId: number) => {
  const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/learner-quiz/assignments/${quizId}`)
  return data
}

export const getFreeLearners = async(quizId: number) => {
  const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/learner-quiz/free/${quizId}`)
  return data
}