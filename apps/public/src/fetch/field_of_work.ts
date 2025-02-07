import axios from 'axios'
import { FieldOfWork } from '../domain/field_of_work'

export const getFieldsOfWork = async() => {
  try {
    const res = await axios.get<FieldOfWork[]>(`${process.env.REACT_APP_API_URL}/field_of_work`)
    return res.data
  } catch (err) {
    console.log("🚀 ~ file: fields_of_work.ts ~ line 10 ~ getApps ~ err", err)    
  }
}