import axios from 'axios';

export interface Question {
  id: number;
  name: string;
  isPhishing: boolean;
  language?: { name?: string; code?: string } | string;
  app?: string;
};

export const getLibraryQuestions = async() => {
  try {
    console.log("🚀 ~ getLibraryQuestions ~");
    const res = await axios.get<Question[]>(`${process.env.REACT_APP_API_URL}/question/library`)
    console.log("🚀 ~ getLibraryQuestions ~ res:", res);
    return res.data
  } catch (err) {
    console.log("🚀 ~ getLibraryQuestions ~ err:", err);
  }
}
