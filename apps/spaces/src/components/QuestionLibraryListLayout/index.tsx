import { FunctionComponent, useEffect, useMemo, useState } from "react";
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useNavigate, useLocation } from "react-router-dom";
import { shallow } from "zustand/shallow";
import { styled, Body1, H2, Box, defaultTheme, Body3 } from "@shira/ui";
import { QuestionLibraryFlowManagement } from "../QuestionLibraryFlowManagement";
import { QuestionLibraryPreviewModal } from "../modals/QuestionLibraryPreviewModal";
import { LibraryQuestionFeedback, getLibraryQuestions, useLibraryQuestionCRUD } from "../../fetch/question_library";
import type { ActiveQuestion } from "../../store/types/active_question";
import { useStore } from "../../store";
import { libraryToActiveQuestion } from "../../utils/active_question/libraryToActiveQuestion";
import { QuizSuccessStates } from "../../store/slices/quiz";
import toast from "react-hot-toast";
import { getColumns } from "./components/Columns";
import type { RowType } from "./components/Columns";
import { libraryQuestionToRow } from "./components/Columns/libraryQuestionToRow";

type Props = {
  rows?: RowType[];
  onRowsChange?: (next: RowType[]) => void;
};

export const QuestionLibraryListLayout: FunctionComponent<Props> = ({ rows: rowsProp }) => {
  const controlled = rowsProp !== undefined;

  const navigate = useNavigate();
  const { state } = useLocation() as { state?: { quizId?: string } };
  const quizId = state?.quizId;
  const { actionFeedback, duplicate } = useLibraryQuestionCRUD();
  const {
    setQuizActionSuccess,
    setActiveQuestion,
    clearActiveQuestion
  } = useStore((state) => ({
    setQuizActionSuccess: state.setQuizActionSuccess,
    setActiveQuestion: state.setActiveQuestion,
    clearActiveQuestion: state.clearActiveQuestion,
  }), shallow)

  const [preview, setPreview] = useState<{ active: ActiveQuestion; original: RowType }>(null);
  const [rows, setRows] = useState<RowType[]>(rowsProp ?? []);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (actionFeedback === LibraryQuestionFeedback.Success) {
      setQuizActionSuccess(QuizSuccessStates.question_added_from_library);
      navigate(`/quiz/${quizId}`);
      return;
    }
    if (actionFeedback === LibraryQuestionFeedback.Error) {
      toast.error("Error adding question", { duration: 3000 });
    }
  }, [actionFeedback, navigate, quizId, setQuizActionSuccess]);

  useEffect(() => {
    if (controlled) {
      setRows(rowsProp ?? []);
      return;
    }
    let alive = true;
    (async () => {
      setLoading(true);
      try {
        const data = await getLibraryQuestions();
        const normalized = libraryQuestionToRow(data);
        if (alive) setRows(normalized);
      } catch (e: any) {
        if (alive) console.error(e);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [controlled, rowsProp]);

  useEffect(() => {
    return () => {
      clearActiveQuestion();
    };
  }, []);

  const handlePreview = (row: RowType) => {
    const active = libraryToActiveQuestion(row);
    setActiveQuestion(active);
    setPreview({ active, original: row });
  };

  const handleAdd = (q: RowType) => {
    duplicate(parseInt(quizId), q.id, q.language.id, q.app.id);
  };

  const handleSelectLanguage = (questionId: number, languageId: number) => {
    setRows((prev) =>
      prev.map((r) => {
        if (r.id !== questionId) return r;
        const picked = r.languages.find((lv) => lv.id === languageId);
        if (!picked) return r;
        return {
          ...r,
          language: { id: picked.id, name: picked.name },
          content: picked.content,
          explanations: picked.explanations,
        };
      })
    );
  };

  const handleSelectApp = (questionId: number, appId: number) => {
    setRows((prev) =>
      prev.map((r) => {
        if (r.id !== questionId) return r;
        const picked = r.apps.find((av) => av.id === appId);
        if (!picked) return r;
        return {
          ...r,
          app: { id: picked.id, name: picked.name, type: picked.type },
        };
      })
    );
  }

  const columns = useMemo(
    () =>
      getColumns({
        onPreview: handlePreview,
        onAdd: handleAdd,
        onSelectLanguage: handleSelectLanguage,
        onSelectApp: handleSelectApp
      }),
    []
  );

  const table = useReactTable({
    data: rows,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const totalColumns = table.getAllLeafColumns().length;

  return (
    <QuestionLibraryFlowManagement>
      <StyledBox>
        <HeaderRow>
          <div>
            <H2>Question Library</H2>
            <MiddleBody>
              Select a question from list below to add it to your quiz. Once you've added it to your quiz, you can edit the question to fully customize it, including changing the text and explanations.
            </MiddleBody>
          </div>
        </HeaderRow>

        <Table aria-busy={loading || undefined}>
          <Thead>
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {
                  hg.headers.map((h) => (
                    <Th key={h.id}>
                      {flexRender(h.column.columnDef.header, h.getContext())}
                    </Th>
                  ))
                }
              </tr>
            ))}
          </Thead>

          <tbody>
            {loading ? (
              <Tr>
                <Td colSpan={totalColumns}>
                  <CenteredBody>Loading questions…</CenteredBody>
                </Td>
              </Tr>
            ) : table.getRowModel().rows.length === 0 ? (
              <Tr>
                <Td colSpan={totalColumns}>
                  <CenteredBody>No questions found.</CenteredBody>
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
            onAdd={() => handleAdd(preview.original)}
            explanations={preview.original.explanations}
            onClose={() => setPreview(null)}
          />
        )}
      </StyledBox>
    </QuestionLibraryFlowManagement >
  );
};

const StyledBox = styled(Box)`
  background: ${defaultTheme.colors.light.paleGrey};
  width: 72%;
  z-index: 1;
  border: none;
  display: flex;
`;

const Table = styled("table")`
  background: ${defaultTheme.colors.light.paleGrey};
  width: 100%;
  font-size: 14px;
  border-collapse: collapse;
`;

const HeaderRow = styled("div")`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  color: ${defaultTheme.colors.dark.black};
`;

const Thead = styled.thead`
  & Th {
    background: ${defaultTheme.colors.light.paleGreen};
    &:first-child { border-top-left-radius: 20px; }
    &:last-child { border-top-right-radius: 20px; }
  }
`;

const Th = styled.th`
  text-align: left;
  padding: 14px 16px;
  font-weight: 600;
  font-size: 16px;
  color: ${defaultTheme.colors.dark.black};
  vertical-align: middle;
`;

const Tr = styled("tr")`
  color: ${defaultTheme.colors.dark.darkGrey};

  &: not(: last-child) td { border-bottom: 1px solid ${defaultTheme.colors.light.paleGrey}; }

  &:last-child td {
    background-color: white;
      &:first-child { border-bottom-left-radius: 20px; }
      &:last-child { border-bottom-right-radius: 20px; }
  }
`;

const Td = styled("td")`
  background: ${defaultTheme.colors.light.white};
  padding: 14px 16px;
  vertical-align: middle;
`;

const CenteredBody = styled(Body3)`
  text-align: center;
  font-weight: 400;
  font-size: 14px;
`;

const MiddleBody = styled(Body1)`
  padding-top: 16px;
`;
