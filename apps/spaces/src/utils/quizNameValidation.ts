import { handleHttpError } from "../fetch/handleError";
import { getErrorContent } from "./getErrorContent";
import { hasRequiredValue } from "./validation";

export const QUIZ_NAME_VALIDATION_MIN_LENGTH = 1;
export const QUIZ_NAME_VALIDATION_DELAY_MS = 300;

interface ValidateQuizNameParams {
  name: string;
  validateQuizName: (title: string) => Promise<void>;
}

export const getQuizNameValidationError = async ({
  name,
  validateQuizName,
}: ValidateQuizNameParams): Promise<string | null> => {
  const trimmedName = name.trim();

  if (!hasRequiredValue(trimmedName)) {
    return null;
  }

  try {
    await validateQuizName(trimmedName);
    return null;
  } catch (e) {
    const error = handleHttpError(e);
    return getErrorContent("error_messages", "something_went_wrong", error.message);
  }
};
