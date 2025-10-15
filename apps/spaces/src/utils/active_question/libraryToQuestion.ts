import type { Question } from "../../fetch/question_library";
import type { ActiveQuestion } from "../../store/types/active_question";

export function libraryToActiveQuestion(q: Question): ActiveQuestion {

  return {
    name: q.name,
    isPhishing: q.isPhishing,
    app: {
      name: q.app.name,
      id: String(q.app.id),
      type: q.app.type
    },
    content: {}
  };
}
