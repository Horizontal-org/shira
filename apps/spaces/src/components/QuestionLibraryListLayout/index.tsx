import { FunctionComponent, useEffect, useMemo, useState } from "react";
import type { RowSelectionState } from "@tanstack/react-table";
import { useNavigate, useLocation } from "react-router-dom";
import { shallow } from "zustand/shallow";
import { styled, Body1, H2, Box, defaultTheme, Table } from "@shira/ui";
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
import { useTranslation } from "react-i18next";

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

  const { t } = useTranslation();

  const [preview, setPreview] = useState<{ active: ActiveQuestion; original: RowType }>(null);
  const [rows, setRows] = useState<RowType[]>(rowsProp ?? []);
  const [loading, setLoading] = useState(false);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  useEffect(() => {
    if (actionFeedback === LibraryQuestionFeedback.Success) {
      setQuizActionSuccess(QuizSuccessStates.question_added_from_library);
      navigate(`/quiz/${quizId}`);
      return;
    }
    if (actionFeedback === LibraryQuestionFeedback.Error) {
      toast.error(t('error_messages.add_question_error'), { duration: 3000 });
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
      }, t),
    []
  );

  return (
    <QuestionLibraryFlowManagement>
      <StyledBox>
        <HeaderRow>
          <div>
            <H2 role="heading" aria-level={1}>{t('question_library.title')}</H2>
            <MiddleBody role="heading" aria-level={2}>
              {t('question_library.subtitle')}
            </MiddleBody>
          </div>
        </HeaderRow>

        <Table
          size="full"
          aria-busy={loading || undefined}
          loading={loading}
          loadingMessage={t('loading_messages.loading_library_questions')}
          emptyMessage={t('success_messages.no_questions_found')}
          data={rows}
          columns={columns}
          rowSelection={rowSelection}
          setRowSelection={setRowSelection}
          enableRowSelection={false}
          enablePagination={false}
          colGroups={(
            <colgroup>
              <col style={{ width: "28%" }} />
              <col style={{ width: "16%" }} />
              <col style={{ width: "22%" }} />
              <col style={{ width: "22%" }} />
              <col style={{ width: "12%" }} />
            </colgroup>
          )}
        />

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

const HeaderRow = styled("div")`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  color: ${defaultTheme.colors.dark.black};
`;

const MiddleBody = styled(Body1)`
  padding-top: 16px;
`;
