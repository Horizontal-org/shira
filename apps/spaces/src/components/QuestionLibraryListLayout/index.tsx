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
import { libraryToActiveQuestion } from "../../utils/active_question/libraryToQuestion";
import { QuizSuccessStates } from "../../store/slices/quiz";
import toast from "react-hot-toast";
import { getColumns } from "./components/Columns";
import type { RowType, LanguageVariant } from "./components/Columns";

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
  } = useStore((state) => ({
    setQuizActionSuccess: state.setQuizActionSuccess
  }), shallow)

  const [preview, setPreview] = useState<{ active: ActiveQuestion; original: RowType } | null>(null);
  const [rows, setRows] = useState<RowType[]>(rowsProp ?? []);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

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

  const normalize = (apiObj: any): RowType[] => {
    const entries = Object.values(apiObj ?? {}) as any[];

    return entries.map((q) => {
      const variants: LanguageVariant[] = (q.language ?? []).map((l: any) => ({
        id: Number(l.id),
        name: String(l.name),
        content: String(l.content ?? ""),
        explanations: (l.explanations ?? []).map((e: any) => ({
          index: Number(e.index),
          position: Number(e.position),
          text: String(e.text ?? ""),
        })),
      }));

      const defaultLang =
        variants.find((v) => v.name.toLowerCase().startsWith("english")) ??
        variants[0];

      return {
        id: Number(q.id),
        name: String(q.name),
        isPhishing: Boolean(q.isPhishing),
        type: String(q.type),
        app: {
          id: Number(q.app?.id),
          name: String(q.app?.name),
          type: String(q.app?.type),
        },
        language: { id: defaultLang?.id, name: defaultLang?.name },
        content: defaultLang?.content ?? "",
        explanations: defaultLang?.explanations ?? [],
        languages: variants,
      } as RowType;
    });
  };

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
        const normalized = normalize(data);
        if (alive) setRows(normalized);
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

  const handlePreview = (q: RowType) => {
    const active = libraryToActiveQuestion(q);
    setActiveQuestion(active);
    setPreview({ active, original: q });
  };

  const handleAdd = (q: RowType) => {
    duplicate(parseInt(quizId), q.id, q.language.id, Number(q.app.id));
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

  const columns = useMemo(
    () =>
      getColumns({
        onPreview: handlePreview,
        onAdd: handleAdd,
        onSelectLanguage: handleSelectLanguage,
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

        {err && (
          <ErrorBox role="alert">
            <Body1>Failed to load: {err}</Body1>
            {!controlled && (
              <RetryButton
                type="button"
                onClick={() =>
                  getLibraryQuestions().then((d) => setRows(normalize(d)))
                }
              >
                Retry
              </RetryButton>
            )}
          </ErrorBox>
        )}

        <Table aria-busy={loading || undefined}>
          <thead>
            {table.getHeaderGroups().map((hg) => (
              <TheadRow key={hg.id}>
                {hg.headers.map((h, i) => (
                  <Th key={h.id} $first={i === 0} $last={i === hg.headers.length - 1}>
                    {flexRender(h.column.columnDef.header, h.getContext())}
                  </Th>
                ))}
              </TheadRow>
            ))}
          </thead>

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
  border: 1px solid;
  cursor: pointer;
`;

const TheadRow = styled("tr")`
  background-color: ${defaultTheme.colors.light.paleGreen};
`;

const Th = styled("th")<{ $first?: boolean; $last?: boolean }>`
  text-align: left;
  padding: 14px 16px;
  font-weight: 600;
  font-size: 16px;
  color: ${defaultTheme.colors.dark.black};
  vertical-align: middle;
  user-select: none;
  ${({ $first }) => $first && `border-top-left-radius: 10px;`};
  ${({ $last }) => $last && `border-top-right-radius: 10px;`};
`;

const Tr = styled("tr")`
  background: ${defaultTheme.colors.light.white};
  color: ${defaultTheme.colors.dark.darkGrey};
  &:not(:last-child) td { border-bottom: 1px solid #ececec; }
`;

const Td = styled("td")`
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
