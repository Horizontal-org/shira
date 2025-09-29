import { FunctionComponent, useEffect, useMemo, useState } from "react";
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";
import { shallow } from "zustand/shallow";
import { styled, Body1, H2, Box, defaultTheme } from "@shira/ui";
import { QuestionLibraryFlowManagement } from "../QuestionLibraryFlowManagement";
import { QuestionLibraryPreviewModal } from "../modals/QuestionLibraryPreviewModal";
import { getLibraryQuestions } from "../../fetch/question_library";
import type { Question as LibraryQuestion } from "../../fetch/question_library";
import type { ActiveQuestion } from "../../store/types/active_question";
import { useStore } from "../../store";
import { QuestionCRUDFeedback, useQuestionCRUD } from "../../fetch/question";
import { libraryToActiveQuestion } from "../../utils/active_question/libraryToQuestion";
import { QuizSuccessStates } from "../../store/slices/quiz";
import toast from "react-hot-toast";
import { columns } from "./columns";

type Props = {
  rows?: LibraryQuestion[];
  onPreview?: (q: LibraryQuestion) => void;
  onAdd?: (q: LibraryQuestion) => void;
};

export type TableMeta = {
  onPreview?: (q: LibraryQuestion) => void;
  onAdd?: (q: LibraryQuestion) => void;
};

export const QuestionLibraryListLayout: FunctionComponent<Props> = ({
  rows: rowsProp,
  onAdd,
}) => {
  const controlled = rowsProp !== undefined;
  const navigate = useNavigate();
  const { submit, actionFeedback } = useQuestionCRUD();
  const {
    setQuizActionSuccess,
  } = useStore((state) => ({
    setQuizActionSuccess: state.setQuizActionSuccess
  }), shallow)

  const [preview, setPreview] = useState<{ active: ActiveQuestion; original: LibraryQuestion } | null>(null);
  const [rows, setRows] = useState<LibraryQuestion[]>(rowsProp ?? []);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (actionFeedback === QuestionCRUDFeedback.success) {
      setQuizActionSuccess(QuizSuccessStates.question_added_from_library)
      navigate(`/quiz/1`) // TODO quiz id
      return
    }

    if (actionFeedback === QuestionCRUDFeedback.error) {
      toast.error('ERROR CREATING QUESTION', { duration: 3000 })
    }
  }, [actionFeedback])

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

  const setActiveQuestion =
    useStore((s: any) => s.setActiveQuestion) ||
    ((aq: ActiveQuestion) => useStore.setState({ activeQuestion: aq }));

  const handlePreview = (q: LibraryQuestion) => {
    const active = libraryToActiveQuestion(q);
    setActiveQuestion(active);
    setPreview({ active, original: q });
  };

  const meta = useMemo<TableMeta>(
    () => ({ onPreview: handlePreview, onAdd }),
    [handlePreview, onAdd]
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
            question={preview.active}
            onAdd={(question) => {
              submit("1", question) // TODO quiz id
            }}
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

const MiddleBody1 = styled(Body1)`
  padding-top: 16px;
`;
