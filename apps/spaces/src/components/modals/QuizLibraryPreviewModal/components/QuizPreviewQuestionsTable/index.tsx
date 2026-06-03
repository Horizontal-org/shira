import { Body3, Body3Bold, Table, defaultTheme, styled } from "@horizontal-org/shira-ui";
import { ColumnDef, RowSelectionState } from "@tanstack/react-table";
import { FunctionComponent, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaCircleCheck } from "react-icons/fa6";
import { MdOutlinePhishing } from "react-icons/md";
import { MdRemoveRedEye } from "react-icons/md";
import type { LibraryQuizQuestionTemplateDto } from "../../../../../fetch/quiz_templates";
import { appIcons } from "../../../../../utils/appIcons";
import { SelectApp } from "../../../../QuestionLibraryListLayout/components/Selects/SelectApp";
import { getAppsByType } from "../../../../../utils/appNames";

type Props = {
  questions: LibraryQuizQuestionTemplateDto[];
  loading?: boolean;
  onPreviewQuestion: (question: LibraryQuizQuestionTemplateDto) => void;
  onSelectApp: (questionId: number, appId: number) => void;
};

export const QuizPreviewQuestionsTable: FunctionComponent<Props> = ({
  questions,
  loading = false,
  onPreviewQuestion,
  onSelectApp,
}) => {
  const { t } = useTranslation();
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const columns = useMemo<ColumnDef<LibraryQuizQuestionTemplateDto>[]>(
    () => [
      {
        header: "",
        id: "rowNumber",
        cell: ({ row }) => <RowIndexCell>{row.index + 1}</RowIndexCell>,
      },
      {
        header: t("quiz_library.preview.columns.question_name"),
        accessorKey: "questionName",
        id: "questionName",
        cell: ({ row }) => (
          <QuestionNameCell>{row.original.questionName}</QuestionNameCell>
        ),
      },
      {
        header: t("quiz_library.preview.columns.type"),
        accessorKey: "isPhishing",
        id: "type",
        cell: ({ row }) => (
          <TypePill $isPhishing={row.original.isPhishing}>
            {row.original.isPhishing ? (
              <MdOutlinePhishing size={16} />
            ) : (
              <FaCircleCheck size={16} color={defaultTheme.colors.green6} />
            )}
            {row.original.isPhishing
              ? t("question_library.columns.type.phishing")
              : t("question_library.columns.type.legitimate")}
          </TypePill>
        ),
      },
      {
        header: t("quiz_library.preview.columns.language"),
        accessorKey: "language",
        id: "language",
        cell: ({ row }) => <Body3>{row.original.language || "-"}</Body3>,
      },
      {
        header: t("quiz_library.preview.columns.app"),
        accessorKey: "appName",
        id: "app",
        cell: ({ row }) => {
          const appOptions = row.original.appType
            ? getAppsByType(row.original.appType)
            : [];
          const selectedApp = appOptions.find(
            (appOption) => appOption.name === row.original.appName,
          );
          const canChooseKnownApp =
            appOptions.length > 1 && (!row.original.appName || Boolean(selectedApp));

          if (row.original.appType && canChooseKnownApp) {
            return (
              <SelectApp
                valueId={selectedApp?.id}
                options={appOptions}
                currentType={row.original.appType}
                initiallyShowPlaceholder={!row.original.appName}
                onChange={(appId) => { onSelectApp(row.original.questionId, appId); }}
              />
            );
          }

          return (
            <AppValue>
              {row.original.appName && appIcons[row.original.appName.toLowerCase()]}
              <Body3>{row.original.appName || "-"}</Body3>
            </AppValue>
          )
        },
      },
      {
        header: t("quiz_library.preview.columns.actions"),
        id: "actions",
        cell: ({ row }) => {
          return (
            <PreviewActionButton
              type="button"
              title={t("quiz_library.preview.columns.preview")}
              onClick={() => { onPreviewQuestion(row.original); }}
            >
              <MdRemoveRedEye
                size={20}
                color={defaultTheme.colors.dark.darkGrey}
              />
            </PreviewActionButton>
          );
        },
      },
    ],
    [t, onPreviewQuestion, onSelectApp],
  );

  return (
    <QuestionsTableWrapper>
      <Table
        size="full"
        data={questions}
        columns={columns}
        loading={loading}
        loadingMessage={t("loading_messages.loading_library_questions")}
        rowSelection={rowSelection}
        setRowSelection={setRowSelection}
        enableRowSelection={false}
        enablePagination={false}
        emptyMessage={t("quiz_library.preview.no_questions")}
        colGroups={(
          <colgroup>
            <col style={{ width: "4%" }} />
            <col style={{ width: "34%" }} />
            <col style={{ width: "16%" }} />
            <col style={{ width: "16%" }} />
            <col style={{ width: "20%" }} />
            <col style={{ width: "10%" }} />
          </colgroup>
        )}
      />
    </QuestionsTableWrapper>
  );
};

const QuestionsTableWrapper = styled.div`
  margin-top: 12px;

  & table td {
    padding: 14px 16px;
  }
`

const RowIndexCell = styled(Body3Bold)`
  color: ${defaultTheme.colors.green6};
`

const QuestionNameCell = styled(Body3Bold)`
  color: ${defaultTheme.colors.dark.darkGrey};
`

const TypePill = styled.span<{ $isPhishing: boolean }>`
  background: ${(props) =>
    props.$isPhishing
      ? defaultTheme.colors.light.paleRed
      : defaultTheme.colors.light.paleGreen};
  color: ${(props) =>
    props.$isPhishing ? defaultTheme.colors.error9 : defaultTheme.colors.green9};
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border-radius: 2px;
  padding: 4px 8px;
  font-size: 14px;
  font-weight: 400;
`

const AppValue = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
`

const PreviewActionButton = styled.button`
  all: unset;
  width: 32px;
  height: 32px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:disabled {
    cursor: not-allowed;
  }
`
