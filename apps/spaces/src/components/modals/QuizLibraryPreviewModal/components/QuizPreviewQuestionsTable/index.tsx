import { Body3, Body3Bold, Body4, Table, defaultTheme, styled } from "@shira/ui";
import { ColumnDef, RowSelectionState } from "@tanstack/react-table";
import { FunctionComponent, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaCircleCheck } from "react-icons/fa6";
import { MdOutlinePhishing } from "react-icons/md";
import { appIcons } from "../../../../QuestionLibraryListLayout/components/AppIcons/appIcons";

export type PreviewQuestionRow = {
  id: string;
  name: string;
  isPhishing: boolean | null;
  typeLabel: string;
  language: string;
  app: string;
};

type Props = {
  questions: PreviewQuestionRow[];
};

export const QuizPreviewQuestionsTable: FunctionComponent<Props> = ({
  questions,
}) => {
  const { t } = useTranslation();
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const questionColumns = useMemo<ColumnDef<PreviewQuestionRow>[]>(
    () => [
      {
        header: "",
        id: "rowNumber",
        cell: ({ row }) => <RowIndexCell>{row.index + 1}</RowIndexCell>,
      },
      {
        header: t("quiz_library.preview.columns.question_name"),
        accessorKey: "name",
        id: "name",
        cell: ({ row }) => <QuestionNameCell>{row.original.name}</QuestionNameCell>,
      },
      {
        header: t("quiz_library.preview.columns.type"),
        accessorKey: "typeLabel",
        id: "type",
        cell: ({ row }) => (
          row.original.isPhishing !== null ? (
            <TypePill $isPhishing={row.original.isPhishing}>
              {row.original.isPhishing ? (
                <MdOutlinePhishing size={16} />
              ) : (
                <FaCircleCheck size={16} color={defaultTheme.colors.green6} />
              )}
              {row.original.typeLabel}
            </TypePill>
          ) : (
            <Body4>{row.original.typeLabel || "-"}</Body4>
          )
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
        accessorKey: "app",
        id: "app",
        cell: ({ row }) => (
          <AppValue>
            {row.original.app && appIcons[row.original.app.toLocaleLowerCase()]}
            <span>{row.original.app || "-"}</span>
          </AppValue>
        ),
      },
    ],
    [t],
  );

  return (
    <QuestionsTableWrapper>
      <Table
        size="full"
        data={questions}
        columns={questionColumns}
        loading={false}
        rowSelection={rowSelection}
        setRowSelection={setRowSelection}
        enableRowSelection={false}
        enablePagination={false}
        emptyMessage={t("quiz_library.preview.no_questions")}
        colGroups={(
          <colgroup>
            <col style={{ width: "6%" }} />
            <col style={{ width: "38%" }} />
            <col style={{ width: "20%" }} />
            <col style={{ width: "16%" }} />
            <col style={{ width: "20%" }} />
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
`;

const RowIndexCell = styled(Body3Bold)`
  color: ${defaultTheme.colors.green6};
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
`;
