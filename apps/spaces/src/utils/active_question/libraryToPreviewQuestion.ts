import type { Question } from "../../fetch/question_library";
import type { ActiveLibraryQuestion } from "../../store/types/active_library_question";

export function libraryToPreviewQuestion(q: Question): ActiveLibraryQuestion {
  return {
    id: q.id,
    content: q.content,
    name: q.name,
    app: q.app,
    type: q.type,
    language: q.language,
    isPhishing: q.isPhishing,
    explanations: q.explanations || [],
  };
}
