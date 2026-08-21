import axios from "axios";
import {
  translateLibraryLanguageTag,
  translateLibraryTag,
} from "../language/libraryTags";

export interface LibraryFilterOption {
  id: number;
  value: string;
  label: string;
}

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

export const getLibraryLanguageOptions = async (): Promise<LibraryFilterOption[]> => {
  try {
    const response = await axios.get<LibraryLangTagApiDto[]>(
      `${process.env.REACT_APP_LIBRARY_API_URL}/lang-tags`,
    );

    return response.data.map((language) => ({
      id: language.id,
      value: language.code,
      label: translateLibraryLanguageTag(language.code, language.name),
    }));
  } catch (error) {
    console.error("Error fetching library language options:", error);
    return [];
  }
};

export const getLibraryTagOptions = async (): Promise<LibraryFilterOption[]> => {
  try {
    const response = await axios.get<LibraryTagApiDto[]>(
      `${process.env.REACT_APP_LIBRARY_API_URL}/tags`,
    );

    return response.data.map((tag) => ({
      id: tag.id,
      value: tag.slug,
      label: translateLibraryTag(tag.slug, tag.name),
    }));
  } catch (error) {
    console.error("Error fetching library tag options:", error);
    return [];
  }
};
