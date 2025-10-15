import type { Question } from "../../fetch/question_library";
import parseHtml from "../parseHtml";
import type { ActiveQuestion } from "../../store/types/active_question";

export function libraryToActiveQuestion(
  q: Question,
  images: Array<{ imageId: number; url: string }> = []
): ActiveQuestion {

  const contentString = () => {
    const { parseContent } = parseHtml(q.content, images);
    const c = parseContent();
    return c ? c.outerHTML : '';
  }

  return {
    name: q.name,
    isPhishing: q.isPhishing,
    content: null,
    stringContent: contentString(),
    app: { name: q.appName, id: '0', type: q.type }
  } as ActiveQuestion;
}