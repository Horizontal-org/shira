import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { MdDragIndicator } from "react-icons/md";
import {
  Body3,
  Body3Bold,
  defaultTheme,
  QuestionTypeChip,
  styled,
} from "@horizontal-org/shira-ui";
import { useTranslation } from "react-i18next";
import { QuizQuestion } from "../../../store/slices/quiz";
import { appIcons } from "../../../utils/appIcons";
import { normalizePreviewAppName } from "../../../utils/appNames";
import { truncateQuestionName } from "../../../utils/questionName";

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
              {truncateQuestionName(row.original.question.name)}
            </QuestionNameCell>
          );
        },
      },
      {
        header: t("question_library.columns.type.title"),
        id: "type",
        cell: ({ row }) => {
          const isPhishing = Boolean(row.original.question.isPhising);
          return <QuestionTypeChip isPhishing={isPhishing} variant="table" />;
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
              <AppIcon>{appIcon}</AppIcon>
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
  width: 20px;
  height: 20px;
  line-height: 0;
  color: ${defaultTheme.colors.dark.darkGrey};
`;

const QuestionNameCell = styled(Body3Bold)`
  display: flex;
  align-items: center;
  min-height: 20px;
  color: ${defaultTheme.colors.dark.darkGrey};
`;

const AppValue = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 20px;
  color: ${defaultTheme.colors.dark.darkGrey};
`;

const AppIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  line-height: 0;
  flex-shrink: 0;
`;
