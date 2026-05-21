import axios from "axios";

export interface LibraryQuizDto {
  title: string;
  createdAt: string;
  author: string;
  description: string;
  languages: string[];
  tags: string[];
}

export const getQuizTemplates = async (): Promise<LibraryQuizDto[]> => {
  try {
    const res = await axios.get<LibraryQuizDto[]>(
      `${process.env.REACT_APP_LIBRARY_API_URL}/quiz-templates`,
      {
        headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyLTEyMyIsInJvbGVzIjpbInNwYWNlLWFkbWluIl0sImlhdCI6MTc3OTI5ODgxMiwiZXhwIjoxNzc5OTAzNjEyfQ.j13kZcbjK0sBuIyKDKBtF-9wQ8bXS2q7_S-7gePisF8` }
      }
    );

    return res.data;
  } catch (err) {
    console.error("Error fetching quiz-templates:", err);
    return [];
  }
};
