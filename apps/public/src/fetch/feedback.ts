import axios from 'axios'

export const submitFeedback = async (data) => {
  try {
    await axios.post(`${process.env.REACT_APP_API_URL}/survey`, data)
    return true
  } catch (err) {
    console.log("🚀 ~ file: apps.ts ~ line 14 ~ getApps ~ err", err)
    return false
  }
}