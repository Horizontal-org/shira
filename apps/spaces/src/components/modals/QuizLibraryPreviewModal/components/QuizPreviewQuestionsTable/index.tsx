import { Body3, Body3Bold, SmallSelect, Table, defaultTheme, styled } from "@horizontal-org/shira-ui";
import { ColumnDef, RowSelectionState } from "@tanstack/react-table";
import { FunctionComponent, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaCircleCheck } from "react-icons/fa6";
import { MdOutlinePhishing } from "react-icons/md";
import { MdRemoveRedEye } from "react-icons/md";
import { appIcons, appTypesIcons } from "../../../../../utils/appIcons";
import { getAppsByType, getAppsByTypeAndValue, normalizePreviewAppName } from "../../../../../utils/appNames";

export type QuizPreviewQuestion = {
  questionId: number;
  questionName: string;
  isPhishing: boolean;
  language: string;
  appName: string | null;
  appType: string;
};

type Props = {
  questions: QuizPreviewQuestion[];
  loading?: boolean;
  onPreviewQuestion: (questionId: number) => void;
  onSelectApp: (questionId: number, appName: string) => void;
};

export const QuizPreviewQuestionsTable: FunctionComponent<Props> = ({
  questions,
  loading = false,
  onPreviewQuestion,
  onSelectApp,
}) => {
  const { t } = useTranslation();
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const columns = useMemo<ColumnDef<QuizPreviewQuestion>[]>(
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
          const normalizedAppName = normalizePreviewAppName(row.original.appName);
          const appOptions = row.original.appType
            ? getAppsByType(row.original.appType)
            : [];
          const selectedApp = getAppsByTypeAndValue(row.original.appType, row.original.appName);
          const canChooseKnownApp = appOptions.length > 1 && (!normalizedAppName || Boolean(selectedApp));

          if (row.original.appType && canChooseKnownApp) {
            const selectOptions = appOptions.map((appOption) => ({
              label: appOption.name,
              labelEnglish: appOption.name,
              value: appOption.name,
              leftIcon: appIcons[appOption.name.toLowerCase()],
            }));

            return (
              <SmallSelect
                aria-label="app"
                value={selectedApp?.name ?? ""}
                options={selectOptions}
                initialPlaceholder={t(`question_library.columns.app.${row.original.appType}_type`)}
                placeholderLeftIcon={appTypesIcons[row.original.appType]}
                onChange={(appName) => onSelectApp(row.original.questionId, appName)}
              />
            );
          }

          return (
            <AppValue>
              {normalizedAppName && appIcons[normalizedAppName.toLowerCase()]}
              <Body3>{normalizedAppName}</Body3>
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
              onClick={() => onPreviewQuestion(row.original.questionId)}
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
        enableRowHover={false}
        emptyMessage={t("quiz_library.preview.no_questions")}
        colGroups={(
          <colgroup>
            <col style={{ width: "50px" }} />
            <col style={{ width: "40%" }} />
            <col />
            <col />
            <col style={{ width: "20%" }} />
            <col style={{ width: "110px" }} />
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
