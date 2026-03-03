import axios from 'axios'

export interface App {
  name: string;
  id: string; 
  type: string;
}

export const getApps = async() => {
  try {
    const res = await axios.get<App[]>(`${process.env.REACT_APP_API_URL}/app`)
    return res.data
  } catch (err) {
    console.log("🚀 ~ file: apps.ts ~ line 14 ~ getApps ~ err", err)    
  }
}

