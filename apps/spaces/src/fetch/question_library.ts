import axios from 'axios';

export interface Question {
  id: number;
  name: string;
  isPhishing: boolean;
  type: string;
  language: string;
  appName: string;
};

export const getLibraryQuestions = async() => {
  try {
    const res = await axios.get<Question[]>(`${process.env.REACT_APP_API_URL}/question/library`)
    return res.data
  } catch (err) {
    console.log("🚀 ~ getLibraryQuestions ~ err:", err);
  }
}
