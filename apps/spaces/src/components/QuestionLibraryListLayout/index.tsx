import { FunctionComponent, useEffect, useMemo, useState } from 'react';
import { ColumnDef, flexRender, getCoreRowModel, getSortedRowModel, SortingState, useReactTable } from "@tanstack/react-table";
import { styled, Body1, Body3, H2, Box } from "@shira/ui";
import { QuestionLibraryFlowManagement } from '../QuestionLibraryFlowManagement';
import { MdRemoveRedEye } from "react-icons/md";
import { FaCirclePlus } from "react-icons/fa6";
import { SiGmail, SiMicrosoftoutlook, SiWhatsapp } from "react-icons/si";
import { MdSms } from "react-icons/md";
import { Question, getLibraryQuestions } from "../../fetch/question_library";

const AppCell: FunctionComponent<{ app?: string }> = ({ app }) => {
  const v = (app ?? "").toLowerCase();
  let icon: React.ReactNode = null;
  if (v.includes("gmail")) icon = <SiGmail />;
  else if (v.includes("outlook")) icon = <SiMicrosoftoutlook />;
  else if (v.includes("whatsapp")) icon = <SiWhatsapp />;
  else if (v.includes("sms")) icon = <MdSms />;
  return (
    <Flex>
      {icon}
      <Body1>{app ?? "-"}</Body1>
    </Flex>
  );
};

type Props = {
  rows: Question[];
  onPreview?: (q: Question) => void;
  onAdd?: (q: Question) => void;
};

export const QuestionLibraryListLayout: FunctionComponent<Props> = ({
  rows: rowsProp,
  onPreview,
  onAdd,
}) => {
  const [rows, setRows] = useState<Question[]>(rowsProp ?? []);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const controlled = Array.isArray(rowsProp);

  const fetchRows = async () => {
    setErr(null);
    setLoading(true);
    try {
      const data = await getLibraryQuestions();
      setRows(Array.isArray(data) ? data : []);
    } catch (e: any) {
      setErr(e?.message ? String(e.message) : "Failed to load questions");
      setRows([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (controlled) {
      setRows(rowsProp!);
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
        if (alive) {
          setErr(e?.message ? String(e.message) : "Failed to load questions");
          setRows([]);
        }
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [controlled, rowsProp]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter(r => {
      const lang = typeof (r as any).language === "string"
        ? (r as any).language
        : (r as any).language?.name;
      return [
        r.name,
        r.app,
        r.isPhishing ? "phishing" : "legitimate",
        lang,
      ].some(v => String(v ?? "").toLowerCase().includes(q));
    });
  }, [rows, search]);

  const columns = useMemo<ColumnDef<Question>[]>(() => [
    {
      id: "title",
      header: "Question name",
      accessorFn: (q) => q.name ?? "",
      cell: ({ getValue }) => <NameCell>{String(getValue())}</NameCell>,
      enableSorting: true,
    },
    {
      id: "type",
      header: "Type",
      // fix: if isPhishing === true → Type = "Phishing"
      accessorFn: (q) => (q.isPhishing ? "Phishing" : "Legitimate"),
      cell: ({ getValue }) => {
        const v = String(getValue() ?? "");
        const cls = v.toLowerCase().includes("phish") ? "danger" : "success";
        return <TypeBadge className={cls}>{v}</TypeBadge>;
      },
      enableSorting: true,
    },
    {
      id: "language",
      header: "Language",
      accessorFn: (q) =>
        (typeof (q as any).language === "string"
          ? (q as any).language
          : (q as any).language?.name) ?? "—",
      cell: ({ getValue }) => <Body1>{String(getValue())}</Body1>,
      enableSorting: true,
    },
    {
      id: "app",
      header: "App",
      accessorFn: (q) => (q as any).app ?? "",
      cell: ({ getValue }) => <AppCell app={String(getValue() ?? "")} />,
      enableSorting: true,
    },
    {
      id: "actions",
      header: "Actions",
      enableSorting: false,
      cell: ({ row }) => (
        <ActionsCell>
          <IconIcon
            aria-label="Preview"
            title="Preview"
            onClick={() => onPreview?.(row.original)}
          >
            <MdRemoveRedEye size={18} />
          </IconIcon>
          <IconIcon
            aria-label="Add"
            title="Add"
            onClick={() => onAdd?.(row.original)}
          >
            <FaCirclePlus size={18} />
          </IconIcon>
        </ActionsCell>
      ),
    }
  ], [onPreview, onAdd]);

  const table = useReactTable({
    data: filtered ?? [],
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <QuestionLibraryFlowManagement>
      <StyledBox>
        <HeaderRow>
          <div>
            <H2>Question Library</H2>
            <Body3>
              Select a question from list below to add it to your quiz. Once you've added it to your quiz, you can edit the question to fully customize it, including changing the text and explanations.
            </Body3>
          </div>
          <Controls>
            <input
              placeholder="Search…"
              value={search}
              onChange={(e: any) => setSearch(e.target.value)}
              style={{ minWidth: 220 }}
            />
            {!controlled && (
              <button onClick={fetchRows} disabled={loading}>
                {loading ? "Loading…" : "Refresh"}
              </button>
            )}
          </Controls>
        </HeaderRow>

        {err && (
          <ErrorBox>
            <Body1>Failed to load: {err}</Body1>
            {!controlled && <button onClick={fetchRows}>Retry</button>}
          </ErrorBox>
        )}

        <Table aria-busy={loading}>
          <thead>
            {table.getHeaderGroups().map((hg) => (
              <TheadRow key={hg.id}>
                {hg.headers.map((h) => {
                  const canSort = h.column.getCanSort();
                  const sortDir = h.column.getIsSorted(); // false | 'asc' | 'desc'
                  return (
                    <Th
                      key={h.id}
                      role={canSort ? "button" : undefined}
                      onClick={canSort ? h.column.getToggleSortingHandler() : undefined}
                      aria-sort={sortDir ? (sortDir === 'asc' ? 'ascending' : 'descending') : 'none'}
                    >
                      <span style={{ display: 'inline-flex', gap: 6, alignItems: 'center' }}>
                        {flexRender(h.column.columnDef.header, h.getContext())}
                        {canSort && (
                          <SortGlyph>
                            {sortDir === 'asc' ? '▲' : sortDir === 'desc' ? '▼' : '↕'}
                          </SortGlyph>
                        )}
                      </span>
                    </Th>
                  );
                })}
              </TheadRow>
            ))}
          </thead>

          <tbody>
            {loading ? (
              <Tr>
                <Td colSpan={columns.length}>
                  <Body1>Loading questions…</Body1>
                </Td>
              </Tr>
            ) : table.getRowModel().rows.length === 0 ? (
              <Tr>
                <Td colSpan={columns.length}>
                  <Body1>No questions found.</Body1>
                </Td>
              </Tr>
            ) : (
              table.getRowModel().rows.map((r) => (
                <Tr key={r.id}>
                  {r.getVisibleCells().map((c) => (
                    <Td key={c.id}>
                      {flexRender(c.column.columnDef.cell, c.getContext())}
                    </Td>
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

/** ---------- styles ---------- */

const StyledBox = styled(Box)`
  position: relative;
  z-index: 1;
  padding: 48px;
  width: 1024px;
`;

const HeaderRow = styled("div")`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: $4;
  margin-bottom: $4;
`;

const Controls = styled("div")`
  display: flex;
  align-items: center;
  gap: $3;
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

const Table = styled("table")`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  font-size: 14px;
`;

const TheadRow = styled("tr")`
  background-color: $accent2;
`;

const Th = styled("th")`
  text-align: left;
  padding: $3 $4;
  color: $textHigh;
  font-weight: 600;
  border-bottom: 1px solid $border;
  user-select: none;

  &:first-child { width: 44%; border-top-left-radius: $3; }
  &:nth-child(2) { width: 16%; }
  &:nth-child(3) { width: 14%; }
  &:nth-child(4) { width: 16%; }
  &:last-child { width: 10%; border-top-right-radius: $3; }
`;

const SortGlyph = styled("span")`
  font-size: 11px;
  opacity: 0.8;
`;

const Tr = styled("tr")`
  background-color: $loContrast;

  &:not(:last-child) td { border-bottom: 1px solid $border; }
  &:hover { background-color: $accent1; }
`;

const Td = styled("td")`
  padding: $3 $4;
  vertical-align: middle;
  color: $text;
`;

const NameCell = styled("div")`
  font-weight: 600;
  color: $textHigh;
`;

const TypeBadge = styled("span")`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  border: 1px solid transparent;

  &.success { background-color: #e9f3e6; color: #275c2b; border-color: #cfe6ca; }
  &.danger  { background-color: #fbe7e7; color: #7a1e1e; border-color: #f4cdcd; }
`;

const ActionsCell = styled("div")`
  display: flex;
  align-items: center;
  gap: $2;
  justify-content: flex-start;
`;

const IconIcon = styled("button")`
  width: 32px;
  height: 32px;
  padding: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  background: transparent;
  border: 1px solid $border;
  cursor: pointer;

  &:hover { background: $accent3; }
`;

const Flex = styled("div")`
  display: flex;
  align-items: center;
  gap: $2;
`;
