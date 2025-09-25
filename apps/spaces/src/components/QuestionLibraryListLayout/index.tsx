import { FunctionComponent, useEffect, useMemo, useState } from "react";
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { styled, Body1, H2, Box, defaultTheme, Body3Bold } from "@shira/ui";
import { FaCircleCheck, FaCirclePlus } from "react-icons/fa6";
import { MdRemoveRedEye, MdOutlinePhishing, MdTextsms, MdFacebook, MdMail } from "react-icons/md";
import { RiWhatsappFill } from "react-icons/ri";
import { QuestionLibraryFlowManagement } from "../QuestionLibraryFlowManagement";
import { QuestionLibraryPreviewModal } from "../modals/QuestionLibraryPreviewModal";
import { getLibraryQuestions } from "../../fetch/question_library";
import type { Question as LibraryQuestion } from "../../fetch/question_library";
import type { ActiveQuestion } from "../../store/types/active_question";
import { useStore } from "../../store";

const stripHtml = (html: string) =>
  (html || "")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<[^>]*>/g, "")
    .trim();

const normApp = (name: string) => {
  const n = (name || "").toLowerCase();
  if (["gmail", "mail", "email"].includes(n)) return "Gmail";
  if (["outlook", "microsoft outlook"].includes(n)) return "Outlook";
  if (["whatsapp", "wa"].includes(n)) return "Whatsapp";
  if (["sms", "text"].includes(n)) return "SMS";
  if (["messenger", "facebook", "fb messenger"].includes(n)) return "FBMessenger";
  return "Gmail";
};
export function mapToActiveQuestion(row: LibraryQuestion): ActiveQuestion {
  const anyRow = row as any;
  const app = normApp(String(anyRow.appName ?? anyRow.app?.name ?? ""));
  const isPhishing = Boolean(anyRow.isPhishing ?? anyRow.isPhising ?? false);

  // raw content from the library (often HTML for email, text for others)
  const raw = typeof anyRow.content === "string" ? anyRow.content : "";
  const text = stripHtml(raw);

  // language can be string or object
  const language =
    typeof anyRow.language === "string" ? { name: anyRow.language } : anyRow.language ?? undefined;

  if (app === "Gmail" || app === "Outlook") {
    // *** THIS SHAPE FIXES THE CRASH ***

    // Non-email apps: safest minimal shape
    return {
      id: row.id,
      name: row.name ?? "",
      isPhishing,
      app: { name: app },
      language,
      content: {
        // empty array is OK; preview will render an empty thread safely
        draggableItems: [],
        // give the preview something to show if it expects an editor item
        message: { value: text || row.name || "", htmlId: "component-required-message" },
        // optional elements the preview may query for; undefined is tolerated
        fullname: { value: anyRow.fullname ?? "John Doe", htmlId: "component-required-fullname" },
        phone: { value: anyRow.phone ?? "", htmlId: "component-required-phone" },
      } as any,
    } as unknown as ActiveQuestion;
  }

  type Props = {
    rows?: LibraryQuestion[];
    onPreview?: (q: LibraryQuestion) => void;
    onAdd?: (q: LibraryQuestion) => void;
  };

  type TableMeta = {
    onPreview?: (q: LibraryQuestion) => void;
    onAdd?: (q: LibraryQuestion) => void;
  };

  const appIcons: Record<string, JSX.Element> = {
    gmail: <MdMail />,
    messenger: <MdFacebook />,
    sms: <MdTextsms />,
    whatsapp: <RiWhatsappFill />,
    outlook: <MdMail />
  };

  const columns: ColumnDef<LibraryQuestion>[] = [
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
          <PhishingCell $isPhishing={isPhishing}>
            {isPhishing ? <MdOutlinePhishing size={16} /> : <FaCircleCheck size={16} color={defaultTheme.colors.green6} />}
            {isPhishing ? "Phishing" : "Legitimate"}
          </PhishingCell>
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
      cell: (c) => {
        const appName = String(c.getValue());
        return (
          <AppCell>
            {appIcons[appName.toLowerCase()]}
            {appName}
          </AppCell>
        );
      },
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

    const [preview, setPreview] = useState<{ active: ActiveQuestion; original: LibraryQuestion } | null>(null);
    const [rows, setRows] = useState<LibraryQuestion[]>(rowsProp ?? []);
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState<string | null>(null);

    const setActiveQuestion =
      useStore((s: any) => s.setActiveQuestion) ||
      ((aq: ActiveQuestion) => useStore.setState({ activeQuestion: aq }));

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

    const handlePreview = (q: LibraryQuestion) => {
      setPreview({ active: mapToActiveQuestion(q), original: q });
    };

    const meta = useMemo<TableMeta>(
      () => ({ onPreview: handlePreview, onAdd }),
      [onAdd]
    );

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

          {preview && (
            <QuestionLibraryPreviewModal
              question={preview.original}
              // originalQuestion={preview.original}
              // onAdd={(q) => { onAdd?.(q); setPreview(null); }}
              onClose={() => setPreview(null)}
            />
          )}
        </StyledBox>
      </QuestionLibraryFlowManagement>
    );
  };

  const StyledBox = styled(Box)`
  position: relative;
  z-index: 1;
  width: 1024px;
  background: ${defaultTheme.colors.light.paleGrey};
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
  background: ${defaultTheme.colors.light.white};
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
  background-color: ${defaultTheme.colors.light.paleGreen};
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

  const AppCell = styled("div")`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border-radius: 2px;
  padding: 4px 8px;
  font-weight: 400;
`;

  const ActionsCell = styled("div")`
  display: flex;
  align-items: center;
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

  const PhishingCell = styled.div<{ $isPhishing?: boolean }>`
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
