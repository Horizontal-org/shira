import { useRef, useState } from "react";
import { getQuizNameValidationError } from "../utils/quizNameValidation";
import { hasRequiredValue } from "../utils/validation";

export const QUIZ_NAME_VALIDATION_MIN_LENGTH = 1;
export const QUIZ_NAME_VALIDATION_DELAY_MS = 300;

interface UseTitleUpdateParams {
  setTitle: (title: string) => void;
  validateQuizName: (name: string) => Promise<void>;
  onValidTitle: (title: string) => void;
  shouldValidateTitle?: (trimmedTitle: string) => boolean;
}

export const useTitleUpdate = ({
  setTitle,
  validateQuizName,
  onValidTitle,
  shouldValidateTitle,
}: UseTitleUpdateParams) => {
  const [isValidatingTitle, setIsValidatingTitle] = useState(false);
  const [titleError, setTitleError] = useState<string | null>(null);

  const validationTimeoutIdRef = useRef<number | null>(null);

  const clearTitleValidation = () => {
    if (validationTimeoutIdRef.current !== null) {
      window.clearTimeout(validationTimeoutIdRef.current);
      validationTimeoutIdRef.current = null;
    }

    setIsValidatingTitle(false);
    setTitleError(null);
  };

  const shouldRunValidation = (trimmedTitle: string) => {
    if (!hasRequiredValue(trimmedTitle) || trimmedTitle.length < QUIZ_NAME_VALIDATION_MIN_LENGTH) {
      return false;
    }

    return shouldValidateTitle?.(trimmedTitle) ?? true;
  };

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
    clearTitleValidation();

    const trimmedTitle = newTitle.trim();

    if (!shouldRunValidation(trimmedTitle)) {
      return;
    }

    validationTimeoutIdRef.current = window.setTimeout(async () => {
      validationTimeoutIdRef.current = null;
      setIsValidatingTitle(true);

      const error = await getQuizNameValidationError({
        name: trimmedTitle,
        validateQuizName,
      });

      setTitleError(error);
      setIsValidatingTitle(false);
    }, QUIZ_NAME_VALIDATION_DELAY_MS);
  };

  const handleTitleSubmit = async (newTitle: string) => {
    const trimmedTitle = newTitle.trim();

    if (!hasRequiredValue(trimmedTitle) || isValidatingTitle) {
      return;
    }

    clearTitleValidation();

    if (!shouldRunValidation(trimmedTitle)) {
      onValidTitle(trimmedTitle);
      return;
    }

    setIsValidatingTitle(true);

    const error = await getQuizNameValidationError({
      name: trimmedTitle,
      validateQuizName,
    });

    setTitleError(error);
    setIsValidatingTitle(false);

    if (error) { return; }

    onValidTitle(trimmedTitle);
  };

  return {
    isValidatingTitle,
    titleError,
    clearTitleValidation,
    handleTitleChange,
    handleTitleSubmit,
  };
};
