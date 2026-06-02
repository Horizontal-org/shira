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

const DEFAULT_LIBRARY_AUTHOR = "Shira Team";

const normalizeQuizTemplate = (quiz: LibraryQuizApiDto): LibraryQuizDto => ({
  id: quiz.id,
  title: quiz.title,
  createdAt: quiz.createdAt,
  author: DEFAULT_LIBRARY_AUTHOR,
  languages: (quiz.langTags ?? [])
    .map((language) => language.name.trim())
    .filter(Boolean),
  tags: (quiz.tags ?? []).map((tag) => tag.name.trim()).filter(Boolean),
})

export const getQuizTemplates = async (): Promise<LibraryQuizDto[]> => {
  try {
    const response = await axios.get<LibraryQuizApiDto[]>(
      `${process.env.REACT_APP_LIBRARY_API_URL}/quiz-templates`,
      { withCredentials: false },
    )

    return response.data.map(normalizeQuizTemplate)
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
