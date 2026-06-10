import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { FaCircleCheck } from "react-icons/fa6";
import { MdDragIndicator, MdOutlinePhishing } from "react-icons/md";
import { Body3, Body3Bold, defaultTheme, styled } from "@horizontal-org/shira-ui";
import { useTranslation } from "react-i18next";
import { QuizQuestion } from "../../../store/slices/quiz";
import { appIcons } from "../../../utils/appIcons";
import { normalizePreviewAppName } from "../../../utils/appNames";

export const useQuestionTableColumns = (): ColumnDef<QuizQuestion>[] => {
  const { t } = useTranslation();

  return useMemo(
    () => [
      {
        header: "",
        id: "drag",
        cell: ({ row }) => {
          return (
            <HandleContent id={`drag-handle-${row.original.question.id}`}>
              <MdDragIndicator size={20} color={defaultTheme.colors.dark.darkGrey} />
            </HandleContent>
          );
        },
      },
      {
        header: t("question_library.columns.question_name"),
        id: "questionName",
        cell: ({ row }) => {
          return (
            <QuestionNameCell id={`question-title-${row.original.question.id}`}>
              {row.original.question.name}
            </QuestionNameCell>
          );
        },
      },
      {
        header: t("question_library.columns.type.title"),
        id: "type",
        cell: ({ row }) => {
          const isPhishing = Boolean(row.original.question.isPhising);

          return (
            <TypePill $isPhishing={isPhishing}>
              {isPhishing ? (
                <MdOutlinePhishing size={16} />
              ) : (
                <FaCircleCheck size={16} color={defaultTheme.colors.green6} />
              )}
              {isPhishing
                ? t("question_library.columns.type.phishing")
                : t("question_library.columns.type.legitimate")}
            </TypePill>
          );
        },
      },
      {
        header: t("question_library.columns.app.title"),
        id: "app",
        cell: ({ row }) => {
          const app = row.original.question.apps?.[0];

          if (!app?.name) {
            return <Body3>-</Body3>;
          }

          const appName = normalizePreviewAppName(app.name);
          const appIcon = appIcons[appName.toLowerCase()];

          return (
            <AppValue>
              {appIcon}
              <Body3>{appName}</Body3>
            </AppValue>
          );
        },
      },
      {
        header: t("question_library.columns.actions.title"),
        id: "actions",
        cell: () => null,
      },
    ],
    [t],
  );
};

const HandleContent = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: ${defaultTheme.colors.dark.darkGrey};
`;

const QuestionNameCell = styled(Body3Bold)`
  color: ${defaultTheme.colors.dark.darkGrey};
`;

const TypePill = styled.span<{ $isPhishing: boolean }>`
  background: ${(props) => (
    props.$isPhishing
      ? defaultTheme.colors.light.paleRed
      : defaultTheme.colors.light.paleGreen)};
  color: ${(props) => (
    props.$isPhishing
      ? defaultTheme.colors.error9
      : defaultTheme.colors.green9)};
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border-radius: 2px;
  padding: 4px 8px;
  font-size: 14px;
  font-weight: 400;
`;

const AppValue = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: ${defaultTheme.colors.dark.darkGrey};
`;
