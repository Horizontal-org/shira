import { QUESTION_NAME_MAX_LENGTH } from "./inputLimits";

export const truncateQuestionName = (name: string) => {
  if (name.length <= QUESTION_NAME_MAX_LENGTH) {
    return name;
  }

  return `${name.slice(0, QUESTION_NAME_MAX_LENGTH - 3)}...`;
};
