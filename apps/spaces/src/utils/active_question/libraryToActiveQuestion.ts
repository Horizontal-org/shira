import type { QuestionToDuplicate } from "../../fetch/question_library";
import type { ActiveQuestion } from "../../store/types/active_question";

export function libraryToActiveQuestion(q: QuestionToDuplicate): ActiveQuestion {
  return {
    name: q.name,
    isPhishing: q.isPhishing,
    app: {
      id: String(q.app.id),
      name: q.app.name,
      type: q.app.type,
    },
    content: {}
  };
}
