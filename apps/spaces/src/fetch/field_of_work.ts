import axios from 'axios'

export interface FieldOfWork {
  name: string;
  id: string; 
}

export const getFieldsOfWork = async() => {
  try {
    const res = await axios.get<FieldOfWork[]>(`${process.env.REACT_APP_API_URL}/field_of_work`)
    return res.data
  } catch (err) {
    console.log("🚀 ~ file: field_of_work.ts:14 ~ getFieldsOfWork ~ err:", err)
  }
}

