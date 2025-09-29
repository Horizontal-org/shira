import type { Question } from "../../fetch/question_library";
import type { ActiveQuestion } from "../../store/types/active_question";

const stripHtml = (html: string) =>
  String(html)
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .trim();

function makeField(value: string | undefined | null, htmlId: string, fallback = "") {
  return { value: (value ?? fallback).toString(), htmlId };
}

export function libraryToActiveQuestion(row: Question): ActiveQuestion {
  const app = row.appName.toLowerCase().trim();
  const rawHtml = String(row.content);
  const text = stripHtml(rawHtml) || row.name || "";

  const base = {
    id: row.id,
    name: row.name,
    isPhishing: row.isPhishing,
    language: row.language,
    app: { name: row.appName },
  } as const;

  const isEmail = app === "gmail" || app === "outlook";

  if (isEmail) {
    return {
      ...base,
      content: {
        draggableItems: [],
        senderName: makeField((row as any).fullname, "component-required-sender-name", "John Doe"),
        senderEmail: makeField((row as any).email, "component-required-sender-email", "john.doe@example.com"),
        subject: makeField((row as any).subject ?? row.name, "component-optional-subject", ""),
        body: makeField(rawHtml, "component-required-message", ""),
        message: makeField(text, "component-required-message", ""),
        phone: makeField((row as any).phone, "component-required-phone", ""),
        images: [],
      },
    } as unknown as ActiveQuestion;
  }

  return {
    ...base,
    content: {
      draggableItems: [],
      message: makeField(text, "component-required-message", row.name),
      fullname: makeField((row as any).fullname, "component-required-fullname", ""),
      phone: makeField((row as any).phone, "component-required-phone", ""),
      images: [],
    },
  } as unknown as ActiveQuestion;
}
