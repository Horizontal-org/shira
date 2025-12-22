import axios from 'axios'

export const getLearnerQuizByHash = async(hash:string) => {
  const res = await axios.get(`${process.env.REACT_APP_API_URL}/learner-quiz/${hash}`)
  return res.data
}