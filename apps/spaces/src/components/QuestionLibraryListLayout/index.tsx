import { FunctionComponent, useEffect, useMemo, useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { styled, Body1, Body3, H2, Box } from "@shira/ui";
import { QuestionLibraryFlowManagement } from "../QuestionLibraryFlowManagement";
import { MdRemoveRedEye } from "react-icons/md";
import { FaCirclePlus } from "react-icons/fa6";
import { SiGmail, SiMicrosoftoutlook, SiWhatsapp } from "react-icons/si";
import { MdSms } from "react-icons/md";
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

const icons = {
  gmail: { fg: "#DB4437", bg: "#FDEBE9", Icon: SiGmail },
  outlook: { fg: "#0A64AD", bg: "#E8F1FF", Icon: SiMicrosoftoutlook },
  whatsapp: { fg: "#25D366", bg: "#EAF9F0", Icon: SiWhatsapp },
  sms: { fg: "#6B7280", bg: "#F2F2F3", Icon: MdSms },
}

function resolveIcons(appRaw?: unknown) {
  const app = String(appRaw ?? "").toLowerCase();
  if (app.includes("gmail")) return "gmail";
  if (app.includes("outlook")) return "outlook";
  if (app.includes("whatsapp")) return "whatsapp";
  if (app.includes("sms")) return "sms";
  return undefined;
}


const AppCell: React.FC<{ value?: unknown }> = ({ value }) => {
  const label = value == null || value === "" ? "-" : String(value);
  const key = resolveIcons(label);
  const Icon = key ? icons[key].Icon : null;
  return (
        <AppButton style={{ color: icons[key].fg, background: icons[key].bg }}>
          {<Icon size={16} aria-hidden />}
          <p>{label}</p>
        </AppButton>
  );
};

const columns: ColumnDef<Question, unknown>[] = [
  {
    accessorKey: "name",
    id: "title",
    header: "Question name",
    cell: (ctx) => <NameCell>{String(ctx.getValue())}</NameCell>,
  },
  {
    accessorKey: "isPhishing",
    id: "type",
    header: "Type",
    cell: (ctx) => {
      const isPhising = Boolean(ctx.getValue());
      const label = isPhising ? "Phishing" : "Legitimate";
      return <TypeBadge className={isPhising ? "danger" : "success"}>{label}</TypeBadge>;
    },
  },
  {
    accessorKey: "language",
    id: "language",
    header: "Language",
    cell: (ctx) => <NameCell>{String(ctx.getValue())}</NameCell>,
  },
  {
    accessorKey: "appName",
    id: "app",
    header: "App",
    cell: (ctx) => <AppCell value={ctx.getValue()} />,
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row, table }) => {
      const meta = table.options.meta as TableMeta | undefined;
      return (
        <ActionsCell>
          <IconButton
            aria-label="Preview question"
            title="Preview"
            onClick={() => meta?.onPreview?.(row.original)}
          >
            <MdRemoveRedEye size={18} color="grey" />
          </IconButton>
          <IconButton
            aria-label="Add question"
            title="Add"
            onClick={() => meta?.onAdd?.(row.original)}
          >
            <FaCirclePlus size={18} color="green" />
          </IconButton>
        </ActionsCell>
      );
    },
  },
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
    return () => {
      alive = false;
    };
  }, [controlled, rowsProp]);

  const table = useReactTable({
    data: rows,
    columns,
    getCoreRowModel: getCoreRowModel(),
    meta: useMemo<TableMeta>(() => ({ onPreview, onAdd }), [onPreview, onAdd]),
  });

  const totalCols = table.getAllLeafColumns().length;

  return (
    <QuestionLibraryFlowManagement>
      <StyledBox>
        <HeaderRow>
          <div>
            <H2>Question Library</H2>
            <Body3>
              Select a question from list below to add it to your quiz. Once you’ve added it to your quiz, you can edit the question to fully customize it, including changing the text and explanations.
            </Body3>
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
  padding: 48px;
  width: 1024px;
  background: #f9f9f9;
  border: none;
`;

const HeaderRow = styled("div")`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: $4;
  margin-bottom: $4;
`;

const ErrorBox = styled("div")`
  background: #fff5f5;
  border: 1px solid #ffd6d6;
  color: #7a1e1e;
  padding: $3;
  border-radius: $2;
  display: inline-flex;
  align-items: center;
  gap: $3;
  margin-bottom: $3;
`;

const RetryButton = styled("button")`
  padding: 6px 10px;
  border-radius: $2;
  border: 1px solid $border;
  background: $accent1;
  cursor: pointer;
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

const TheadRow = styled("tr")`
  background-color: #f3f5e4;
  padding: $4;
`;

const Th = styled("th")<{ $first?: boolean; $last?: boolean }>`
  text-align: left;
  padding: 14px 16px;
  color: $textHigh;
  font-weight: 600;

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
  &:not(:last-child) td { border-bottom: 1px solid #ececec; }
  &:hover { background: #fafafa; }
`;

const Td = styled("td")`
  padding: 14px 16px;
  vertical-align: middle;
  color: $text;
`;

const NameCell = styled("div")`
  font-weight: 300;
  color: $textHigh;
`;

const TypeBadge = styled("span")`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 500;
  border: 1px solid transparent;

  &.success {
    background-color: #e9f3e6;
    color: #275c2b;
    border-color: #cfe6ca;
  }
  &.danger {
    background-color: #fbe6e6;
    color: #7a1e1e;
    border-color: #f4cdcd;
  }
`;

const ActionsCell = styled("div")`
  display: flex;
  align-items: center;
  gap: $2;
  font-weight: 300;
`;

const IconButton = styled("button")`
  width: 32px;
  height: 32px;
  padding: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  cursor: pointer;

  &:hover {
    background: $accent3;
  }
`;

const AppButton = styled("button")`
  width: 22px;
  height: 22px;
  border: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

