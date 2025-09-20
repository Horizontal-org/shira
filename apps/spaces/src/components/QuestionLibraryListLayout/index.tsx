import { FunctionComponent, useEffect, useMemo, useState } from 'react';
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
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
    // local state if parent didn't pass rows
  const [rows, setRows] = useState<Question[]>(rowsProp ?? []);
  const controlled = Array.isArray(rowsProp);

  useEffect(() => {
    if (controlled) { setRows(rowsProp!); return; }
    (async () => {
      const data = await getLibraryQuestions();
      setRows(Array.isArray(data) ? data : []);
    })();
  }, [controlled, rowsProp]);

  const columns = useMemo<ColumnDef<Question>[]>(() => [
    {
      id: "title",
      header: "Question name",
      accessorFn: (q) => q.name ?? "",
      cell: ({ getValue }) => <NameCell>{String(getValue())}</NameCell>,
    },
    {
      id: "type",
      header: "Type",
      accessorFn: (q) => (q.isPhishing ? "Legitimate" : "Phishing"),
      cell: ({ getValue }) => {
        const v = String(getValue() ?? "");
        const cls = v.toLowerCase().includes("phish") ? "danger" : "success";
        return <TypeBadge className={cls}>{v}</TypeBadge>;
      },
    },
    {
      id: "language",
      header: "Language",
      accessorFn: (q) =>
        (typeof (q as any).language === "string"
          ? (q as any).language
          : (q as any).language?.name) ?? "—",
      cell: ({ getValue }) => <Body1>{String(getValue())}</Body1>,
    },
    {
      id: "app",
      header: "App",
      accessorFn: (q) => (q as any).app ?? "",
      cell: ({ getValue }) => <AppCell app={String(getValue() ?? "")} />,
    },
    {
      id: "actions",
      header: "Actions",
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
    data: rows ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <QuestionLibraryFlowManagement>
      <StyledBox>
        <div>
          <H2>Question Library</H2>
          <Body3>
            Select a question from list below to add it to your quiz. Once you’ve added it to your quiz, you can edit the question to fully customize it, including changing the text and explanations.
          </Body3>
        </div>

        <Table>
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
            {table.getRowModel().rows.map((r) => (
              <Tr key={r.id}>
                {r.getVisibleCells().map((c) => (
                  <Td key={c.id}>
                    {flexRender(c.column.columnDef.cell, c.getContext())}
                  </Td>
                ))}
              </Tr>
            ))}

            {table.getRowModel().rows.length === 0 && (
              <Tr>
                <Td colSpan={columns.length}>
                  <Body1>No questions found.</Body1>
                </Td>
              </Tr>
            )}
          </tbody>
        </Table>
      </StyledBox>
    </QuestionLibraryFlowManagement>
  );
};

/** ---------- styles (template-literal, like QuizViewLayout) ---------- */

const StyledBox = styled(Box)`
  position: relative;
  z-index: 1;
  padding: 48px;
  width: 1024px;
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

  &:first-child { width: 44%; border-top-left-radius: $3; }
  &:nth-child(2) { width: 16%; }
  &:nth-child(3) { width: 14%; }
  &:nth-child(4) { width: 16%; }
  &:last-child { width: 10%; border-top-right-radius: $3; }
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