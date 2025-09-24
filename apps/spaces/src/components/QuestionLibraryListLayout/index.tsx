import { FunctionComponent, useEffect, useMemo, useState } from "react";
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { styled, Body1, H2, Box, defaultTheme, Body3Bold } from "@shira/ui";
import { FaCircleCheck } from "react-icons/fa6";
import { QuestionLibraryFlowManagement } from "../QuestionLibraryFlowManagement";
import { MdRemoveRedEye, MdOutlinePhishing } from "react-icons/md";
import { FaCirclePlus } from "react-icons/fa6";
import { Question, getLibraryQuestions } from "../../fetch/question_library";

type Props = {
  rows?: Question[];
  onPreview?: (q: Question) => void;
  onAdd?: (q: Question) => void;
};

type TableMeta = {
  onPreview?: (q: Question) => void;
  onAdd?: (q: Question) => void;
};

const columns: ColumnDef<Question>[] = [
  {
    header: "Question name",
    accessorKey: "name",
    id: "title",
    cell: (c) => <NameCell>{String(c.getValue())}</NameCell>,
  },
  {
    header: "Type",
    accessorKey: "isPhishing",
    id: "type",
    cell: (c) => {
      const isPhishing = Boolean(c.getValue());
      return (
        <Phishing $isPhishing={isPhishing}>
          {isPhishing ? <MdOutlinePhishing size={16} /> : <FaCircleCheck size={16} color={defaultTheme.colors.green6} />}
          {isPhishing ? "Phishing" : "Legitimate"}
        </Phishing>
      );
    },
  },
  {
    header: "Language",
    accessorKey: "language",
    id: "language",
    cell: (c) => <Cell>{String(c.getValue())}</Cell>,
  },
  {
    header: "App",
    accessorKey: "appName",
    id: "app",
    cell: (c) => <Cell>{String(c.getValue())}</Cell>,
  },
  {
    header: "Actions",
    id: "actions",
    cell: ({ row, table }) => {
      const meta = table.options.meta as TableMeta | undefined;
      return (
        <ActionsCell>
          <ActionButton
            aria-label="Preview question"
            title="Preview"
            onClick={() => meta?.onPreview?.(row.original)}
          >
            <MdRemoveRedEye size={21} color={defaultTheme.colors.dark.overlay} />
          </ActionButton>
          <ActionButton
            aria-label="Add question"
            title="Add"
            onClick={() => meta?.onAdd?.(row.original)}
          >
            <FaCirclePlus size={18} color={defaultTheme.colors.green6} />
          </ActionButton>
        </ActionsCell>
      );
    }
  }
];

export const QuestionLibraryListLayout: FunctionComponent<Props> = ({
  rows: rowsProp,
  onPreview,
  onAdd,
}) => {
  const controlled = rowsProp !== undefined;

  const [rows, setRows] = useState<Question[]>(rowsProp ?? []);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (controlled) {
      setRows(rowsProp ?? []);
      return;
    }
    let alive = true;
    (async () => {
      setErr(null);
      setLoading(true);
      try {
        const data = await getLibraryQuestions();
        if (alive) setRows(Array.isArray(data) ? data : []);
      } catch (e: any) {
        if (alive) setErr(e?.message ? String(e.message) : "Failed to load questions");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [controlled, rowsProp]);

  const meta = useMemo<TableMeta>(() => ({ onPreview, onAdd }), [onPreview, onAdd]);

  const table = useReactTable({
    data: rows,
    columns,
    getCoreRowModel: getCoreRowModel(),
    meta,
  });

  const totalCols = table.getAllLeafColumns().length;

  return (
    <QuestionLibraryFlowManagement>
      <StyledBox>
        <HeaderRow>
          <div>
            <H2>Question Library</H2>
            <MiddleBody1>
              Select a question from list below to add it to your quiz. Once you've added it to your quiz, you can edit the question to fully customize it, including changing the text and explanations.
            </MiddleBody1>
          </div>
        </HeaderRow>

        {err && (
          <ErrorBox role="alert">
            <Body1>Failed to load: {err}</Body1>
            {!controlled && (
              <RetryButton type="button" onClick={() => getLibraryQuestions().then(setRows)}>
                Retry
              </RetryButton>
            )}
          </ErrorBox>
        )}

        <Table aria-busy={loading || undefined}>
          <thead>
            {table.getHeaderGroups().map((hg) => (
              <TheadRow key={hg.id}>
                {hg.headers.map((h) => (
                  <Th key={h.id}>
                    {flexRender(h.column.columnDef.header, h.getContext())}
                  </Th>
                ))}
              </TheadRow>
            ))}
          </thead>

          <tbody>
            {loading ? (
              <Tr>
                <Td colSpan={totalCols}>
                  <Body1>Loading questions…</Body1>
                </Td>
              </Tr>
            ) : table.getRowModel().rows.length === 0 ? (
              <Tr>
                <Td colSpan={totalCols}>
                  <Body1>No questions found.</Body1>
                </Td>
              </Tr>
            ) : (
              table.getRowModel().rows.map((r) => (
                <Tr key={r.id}>
                  {r.getVisibleCells().map((c) => (
                    <Td key={c.id}>{flexRender(c.column.columnDef.cell, c.getContext())}</Td>
                  ))}
                </Tr>
              ))
            )}
          </tbody>
        </Table>
      </StyledBox>
    </QuestionLibraryFlowManagement>
  );
};

const StyledBox = styled(Box)`
  position: relative;
  z-index: 1;
  width: 1024px;
  background: #f9f9f9;
  border: none;
`;

const HeaderRow = styled("div")`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  color: ${defaultTheme.colors.dark.black};
`;

const Table = styled("table")`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  font-size: 14px;
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
`;

const ErrorBox = styled("div")`
  background: #fff5f5;
  border: 1px solid #ffd6d6;
  color: #7a1e1e;
  display: inline-flex;
  align-items: center;
`;

const RetryButton = styled("button")`
  padding: 6px 10px;
  border: 1px solid $border;
  cursor: pointer;
`;

const TheadRow = styled("tr")`
  background-color: #f3f5e4;
`;

const Th = styled("th") <{ $first?: boolean; $last?: boolean }>`
  text-align: left;
  padding: 14px 16px;
  font-weight: 600;
  font-size: 16px;
  color: ${defaultTheme.colors.dark.black};
  vertical-align: middle;

  &:nth-child(1) { width: 44%; }
  &:nth-child(2) { width: 16%; }
  &:nth-child(3) { width: 14%; }
  &:nth-child(4) { width: 16%; }
  &:nth-child(5) { width: 10%; }

  ${({ $first }) => $first && `border-top-left-radius: 10px;`};
  ${({ $last }) => $last && `border-top-right-radius: 10px;`};
`;

const Tr = styled("tr")`
  background: #fff;
  color: ${defaultTheme.colors.dark.darkGrey};
  &:not(:last-child) td { border-bottom: 1px solid #ececec; }
`;

const Td = styled("td")`
  padding: 14px 16px;
  vertical-align: middle;
`;

const NameCell = styled(Body3Bold)`
  color: ${defaultTheme.colors.dark.darkGrey};
`;

const Cell = styled("div")`
  font-weight: 400;
`;

const ActionsCell = styled("div")`
  display: flex;
  align-items: center;
  font-weight: 300;
`;

const ActionButton = styled("button")`
  width: 32px;
  height: 32px;
  padding: 0;
  display: inline-flex;
  align-items: center;
  background: transparent;
  border: none;
  cursor: pointer;

  &:hover {
    background: $accent3;
  }
`;

const Phishing = styled.div<{ $isPhishing?: boolean }>`
  background: ${(props) => (props.$isPhishing ? "#FFECEA" : "#F3F5E4")};
  color: ${(props) => (props.$isPhishing ? defaultTheme.colors.error9 : defaultTheme.colors.green9)};
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border-radius: 2px;
  padding: 4px 8px;
  font-weight: 400;
`;

const MiddleBody1 = styled(Body1)`
  padding-top: 16px;
`;
