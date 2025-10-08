import type { Question } from "../../fetch/question_library";
import type { ActiveQuestion } from "../../store/types/active_question";

const stripHtml = (html: string) =>
  String(html)
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .trim();

export function libraryToActiveQuestion(row: Question): ActiveQuestion {
  const rawHtml = String(row.content ?? "");
  const text = stripHtml(rawHtml) || row.name || "";

  const base = {
    id: row.id,
    name: row.name,
    isPhishing: row.isPhishing,
    language: row.language,
    app: { name: row.appName },
  } as const;

  const appName = (row.appName || "").toLowerCase().trim();
  const isEmail = appName === "gmail" || appName === "outlook";

  return {
    ...base,
    content: isEmail
      ? buildEmailContent({ rawHtml, text, row })
      : buildMessageContent({ text, row }),
  } as unknown as ActiveQuestion;
}

const buildEmailContent = ({
  rawHtml,
  text,
  row,
}: {
  rawHtml: string;
  text: string;
  row: Question;
}) => {
  const fullname = getString(row, "fullname");
  const email = getString(row, "email");
  const subject = getString(row, "subject");
  const phone = getString(row, "phone");

  return {
    draggableItems: [],
    senderName: makeField(fullname, "component-required-sender-name", "John Doe"),
    senderEmail: makeField(email, "component-required-sender-email", "john.doe@example.com"),
    subject: makeField(subject || row.name, "component-optional-subject", ""),
    body: makeField(rawHtml, "component-required-message", ""),
    message: makeField(text, "component-required-message", ""),
    phone: makeField(phone, "component-required-phone", ""),
    images: [],
  };
};

const buildMessageContent = ({
  text,
  row,
}: {
  text: string;
  row: Question;
}) => {
  const fullname = getString(row, "fullname");
  const phone = getString(row, "phone");

  return {
    draggableItems: [],
    message: makeField(text, "component-required-message", row.name),
    fullname: makeField(fullname, "component-required-fullname", ""),
    phone: makeField(phone, "component-required-phone", ""),
    images: [],
  };
};

const getString = (obj: unknown, key: string): string =>
  String((obj as any)?.[key] ?? "");

const makeField = (value: string | null, htmlId: string, fallback = "") => ({
  value: (value ?? fallback).toString(),
  htmlId,
});
