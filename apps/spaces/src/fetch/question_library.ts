import axios from 'axios';

export interface Explanation {
  position: number;
  text: string;
  index: number;
}

export interface Question {
  id: number;
  name: string;
  isPhishing: boolean;
  type: string;
  content: string;
  language: string;
  appName: string;
  explanations: Explanation[];
}

export const getLibraryQuestions = async() => {
  try {
    const res = await axios.get<Question[]>(`${process.env.REACT_APP_API_URL}/question/library`)
    return res.data
  } catch (err) {
    console.log("🚀 ~ getLibraryQuestions ~ err:", err);
  }
}
