import axios from 'axios';

export interface Explanation {
  position: number;
  text: string;
  index: number;
};

export interface Question {
  id: number;
  name: string;
  isPhishing: boolean;
  type: string;
  content: string;
  language: string;
  appName: string;
  explanations: Explanation[];
};

export const getLibraryQuestions = async () => {
  try {
    const { data } = await axios.get<Question[]>(`${process.env.REACT_APP_API_URL}/question/library`);
    return keepFirstAppPerQuestionLanguage(data);
  } catch (err) {
    console.log("🚀 ~ getLibraryQuestions ~ err:", err);
  }
};

function keepFirstAppPerQuestionLanguage(questions: Question[]): Question[] {
  const set = new Set<string>();
  const result: Question[] = [];

  for (const question of questions) {
    const key = `${question.id}::${question.language}`;
    if (!set.has(key)) {
      set.add(key);
      result.push(question);
    }
  }

  return result;
};
