import axios from "axios";
import { useState } from "react";

export const DEFAULT_PAGE_LIMIT = 20;
export const DEFAULT_QUESTION_TEMPLATE_SORT_ORDER: QuestionTemplateSortOrder = "desc";

export interface LibraryQuestionTemplateDto {
  id: number;
  name: string;
  highlighted: boolean;
  isPhishing: boolean;
  content: string;
  appType: string;
  defaultApp: string | null;
  createdAt: string;
  languages: string[];
  tags: string[];
}

export interface LibraryQuestionTemplatesPageDto {
  data: LibraryQuestionTemplateDto[];
  total: number;
  page: number;
  limit: number;
}

export interface LibraryQuestionTemplateQuestionDto {
  questionId: number;
  questionName: string;
  isPhishing: boolean;
  language: string | null;
  appName: string | null;
  appType: string;
  content: string;
  explanations: {
    position: string;
    text: string;
    index: string;
  }[];
}

export type QuestionTemplateSortOrder = "asc" | "desc";

export interface GetQuestionTemplatesParams {
  page?: number;
  limit?: number;
  search?: string;
  sortOrder?: QuestionTemplateSortOrder;
  langTagCodes?: string[];
  tagSlugs?: string[];
  appType?: string;
  isPhishing?: boolean;
}

export interface QuestionTemplateFilterOption {
  value: string;
  label: string;
}

export enum QuestionTemplateFeedback {
  Processing = "PROCESSING",
  Error = "ERROR",
  Success = "SUCCESS",
}

type LibraryQuestionTemplateApiDto = {
  id: number;
  name: string;
  highlighted: boolean;
  isPhishing: boolean;
  content: string;
  appType: string;
  defaultApp: string | null;
  createdAt: string;
  langTags?: {
    id: number;
    name: string;
    code: string;
  }[];
  tags?: {
    id: number;
    name: string;
    slug?: string;
  }[];
};

type LibraryQuestionTemplatesApiResponseDto = {
  data: LibraryQuestionTemplateApiDto[];
  total: number;
  page: number;
  limit: number;
};

type ListQuestionTemplatesApiQueryDto = {
  page: number;
  limit: number;
  search?: string;
  sortOrder?: QuestionTemplateSortOrder;
  langTags?: string;
  tags?: string;
  appType?: string;
  isPhishing?: "true" | "false";
};

type LibraryLangTagApiDto = {
  id: number;
  name: string;
  code: string;
};

type LibraryTagApiDto = {
  id: number;
  name: string;
  slug: string;
};

const normalizeQuestionTemplate = (
  questionTemplate: LibraryQuestionTemplateApiDto,
): LibraryQuestionTemplateDto => ({
  id: questionTemplate.id,
  name: questionTemplate.name,
  highlighted: questionTemplate.highlighted,
  isPhishing: questionTemplate.isPhishing,
  content: questionTemplate.content,
  appType: questionTemplate.appType,
  defaultApp: questionTemplate.defaultApp,
  createdAt: questionTemplate.createdAt,
  languages: (questionTemplate.langTags ?? []).map((language) => language.name.trim()),
  tags: (questionTemplate.tags ?? []).map((tag) => tag.name.trim()),
});

const serializeFilterValues = (values?: string[]) => {
  if (!values?.length) {
    return;
  }

  return values.join(",");
};

export const getQuestionTemplates = async (
  {
    page = 1,
    limit = DEFAULT_PAGE_LIMIT,
    search,
    sortOrder = DEFAULT_QUESTION_TEMPLATE_SORT_ORDER,
    langTagCodes,
    tagSlugs,
    appType,
    isPhishing,
  }: GetQuestionTemplatesParams = {},
): Promise<LibraryQuestionTemplatesPageDto> => {
  try {
    const serializedLangTags = serializeFilterValues(langTagCodes);
    const serializedTags = serializeFilterValues(tagSlugs);

    const params: ListQuestionTemplatesApiQueryDto = {
      page,
      limit,
      sortOrder,
      ...(search ? { search } : {}),
      ...(serializedLangTags ? { langTags: serializedLangTags } : {}),
      ...(serializedTags ? { tags: serializedTags } : {}),
      ...(appType ? { appType } : {}),
      ...(typeof isPhishing === "boolean" ? { isPhishing: String(isPhishing) as "true" | "false" } : {}),
    };

    const response = await axios.get<LibraryQuestionTemplatesApiResponseDto>(
      `${process.env.REACT_APP_LIBRARY_API_URL}/question-templates`,
      {
        params,
        withCredentials: true,
      },
    );

    return {
      data: response.data.data.map(normalizeQuestionTemplate),
      total: response.data.total,
      page: response.data.page,
      limit: response.data.limit,
    };
  } catch (error) {
    console.error("Error fetching question templates:", error);
    return { data: [], total: 0, page, limit };
  }
};

export const getQuestionLibrary = getQuestionTemplates;

export const getQuestionTemplateQuestions = async (
  quizId: string | number,
): Promise<LibraryQuestionTemplateQuestionDto[] | null> => {
  try {
    const response = await axios.get<LibraryQuestionTemplateQuestionDto[] | null>(
      `${process.env.REACT_APP_LIBRARY_API_URL}/quiz-templates/${quizId}/questions`,
      {
        withCredentials: true,
      },
    );

    return response.data;
  } catch (error) {
    console.error(`Error fetching question template questions for ${quizId}:`, error);
    return null;
  }
};

type AddQuestionTemplateToQuizParams = {
  quizId: number;
  questionName: string;
  content: string;
  isPhishing: boolean;
  appId: number;
  explanations?: {
    position: string | number;
    text: string;
    index: string | number;
  }[];
};

export const addQuestionTemplateToQuiz = async ({
  quizId,
  questionName,
  content,
  isPhishing,
  appId,
  explanations = [],
}: AddQuestionTemplateToQuizParams) => {
  const payload = {
    quizId,
    question: {
      name: questionName,
      content,
      isPhishing,
      app: appId,
    },
    explanations: explanations.map((explanation) => ({
      position: String(explanation.position),
      index: String(explanation.index),
      text: explanation.text,
    })),
  };

  const { data } = await axios.post(
    `${process.env.REACT_APP_API_URL}/quiz/question`,
    payload,
  );

  return data;
};

export const useQuestionTemplateCRUD = () => {
  const [actionFeedback, handleActionFeedback] = useState<QuestionTemplateFeedback | null>(null);

  const addToQuiz = async (params: AddQuestionTemplateToQuizParams) => {
    handleActionFeedback(QuestionTemplateFeedback.Processing);

    try {
      const data = await addQuestionTemplateToQuiz(params);
      handleActionFeedback(QuestionTemplateFeedback.Success);
      return data;
    } catch (error) {
      handleActionFeedback(QuestionTemplateFeedback.Error);
      console.error("Error adding question template to quiz:", error);
      return null;
    }
  };

  return {
    actionFeedback,
    addToQuiz,
  };
};

export const getQuestionTemplateLanguageOptions = async (): Promise<QuestionTemplateFilterOption[]> => {
  try {
    const response = await axios.get<LibraryLangTagApiDto[]>(
      `${process.env.REACT_APP_LIBRARY_API_URL}/lang-tags`,
      {
        withCredentials: true,
      },
    );

    return response.data.map((language) => ({
      value: language.code,
      label: language.name.trim(),
    }));
  } catch (error) {
    console.error("Error fetching question template language options:", error);
    return [];
  }
};

export const getQuestionTemplateTagOptions = async (): Promise<QuestionTemplateFilterOption[]> => {
  try {
    const response = await axios.get<LibraryTagApiDto[]>(
      `${process.env.REACT_APP_LIBRARY_API_URL}/tags`,
      {
        withCredentials: true,
      },
    );

    return response.data.map((tag) => ({
      value: tag.slug,
      label: tag.name.trim(),
    }));
  } catch (error) {
    console.error("Error fetching question template tag options:", error);
    return [];
  }
};
