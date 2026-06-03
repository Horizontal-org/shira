import axios from "axios";

export interface LibraryQuizDto {
  id: string;
  title: string;
  createdAt: string;
  author: string;
  languages: string[];
  tags: string[];
}

export interface LibraryQuizQuestionTemplateDto {
  questionId: number;
  questionName: string;
  isPhishing: boolean;
  language: string;
  appName: string | null;
  appType: string;
  content: string;
  explanations: {
    position: string;
    text: string;
    index: string;
  }[];
}

type LibraryQuizApiDto = {
  id: string;
  title: string;
  createdAt: string;
  langTags?: {
    id: number
    name: string
    code: string
  }[]
  tags?: {
    id: number
    name: string
  }[]
}

const normalizeQuizTemplate = (quiz: LibraryQuizApiDto): LibraryQuizDto => ({
  id: quiz.id,
  title: quiz.title,
  createdAt: quiz.createdAt,
  author: "Shira Team", // TODO author
  languages: (quiz.langTags ?? []).map((language) => language.name.trim()),
  tags: (quiz.tags ?? []).map((tag) => tag.name.trim()),
})

export const getQuizTemplates = async (): Promise<LibraryQuizDto[]> => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_LIBRARY_API_URL}/quiz-templates`,
      { withCredentials: false },
    )

    return response.data.data.map(normalizeQuizTemplate)
  } catch (error) {
    console.error("Error fetching quiz templates:", error)
    // TODO check error response
    return []
  }
}

export const getQuizTemplateQuestions = async (quizId: string)
  : Promise<LibraryQuizQuestionTemplateDto[] | null> => {
  try {
    const response = await axios.get<LibraryQuizQuestionTemplateDto[] | null>(
      `${process.env.REACT_APP_LIBRARY_API_URL}/quiz-templates/${quizId}/questions`,
      { withCredentials: false },
    )

    return response.data
  } catch (error) {
    console.error(`Error fetching quiz template questions for ${quizId}:`, error)
    // TODO check error response
    return null
  }
}
