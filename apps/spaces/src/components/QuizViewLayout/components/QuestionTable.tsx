import { FunctionComponent, useMemo } from "react";
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { StyledTable, TableFooter, TableHeader, THead, Th } from "@horizontal-org/shira-ui";
import { useTranslation } from "react-i18next";
import { QuizQuestion } from "../../../store/slices/quiz";
import { useQuestionTableColumns } from "./QuestionTableColumns";
import { QuestionTableDraggableRow } from "./QuestionTableDraggableRow";

interface Props {
  quizQuestions: QuizQuestion[];
  duplicatingQuestionId: string | null;
  onEditQuestion: (questionId: string) => void;
  onDuplicateQuestion: (questionId: string) => void;
  onDeleteQuestion: (questionId: string) => void;
  onReorder: (newOrder: QuizQuestion[]) => void;
}

export const QuestionTable: FunctionComponent<Props> = ({
  quizQuestions,
  duplicatingQuestionId,
  onEditQuestion,
  onDuplicateQuestion,
  onDeleteQuestion,
  onReorder,
}) => {
  const { t } = useTranslation();
  const editTooltip = t("questions_tab.action_tooltips.edit");
  const duplicateTooltip = t("questions_tab.action_tooltips.duplicate");
  const deleteTooltip = t("questions_tab.action_tooltips.delete");

  const rows = useMemo<QuizQuestion[]>(
    () =>
      [...quizQuestions]
        .sort((a, b) => a.position - b.position),
    [quizQuestions],
  );

  const sortableRowIds = useMemo(
    () => rows.map((row) => row.question.id),
    [rows],
  );

  const columns = useQuestionTableColumns();

  const table = useReactTable({
    data: rows,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (row) => row.question.id,
  });

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 6,
      },
    }),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  return (
    <DndContext
      collisionDetection={closestCenter}
      sensors={sensors}
      onDragEnd={({ active, over }) => {
        if (!over || active.id === over.id) {
          return;
        }

        const oldIndex = rows.findIndex((row) => row.question.id === active.id);
        const newIndex = rows.findIndex((row) => row.question.id === over.id);

        if (oldIndex === -1 || newIndex === -1) {
          return;
        }

        const reorderedRows = arrayMove(rows, oldIndex, newIndex).map((row, index) => ({
          ...row,
          position: index + 1,
        }));

        onReorder(reorderedRows);
      }}
    >
      <TableHeader />
      <StyledTable>
        <colgroup>
          <col style={{ width: "50px" }} />
          <col style={{ width: "45%" }} />
          <col />
          <col />
          <col style={{ width: "110px" }} />
        </colgroup>
        <THead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Th key={header.id} $size="full">
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </Th>
              ))}
            </tr>
          ))}
        </THead>
        <SortableContext
          items={sortableRowIds}
          strategy={verticalListSortingStrategy}
        >
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <QuestionTableDraggableRow
                key={row.id}
                row={row}
                duplicatingQuestionId={duplicatingQuestionId}
                onEditQuestion={onEditQuestion}
                onDuplicateQuestion={onDuplicateQuestion}
                onDeleteQuestion={onDeleteQuestion}
                editTooltip={editTooltip}
                duplicateTooltip={duplicateTooltip}
                deleteTooltip={deleteTooltip}
              />
            ))}
          </tbody>
        </SortableContext>
      </StyledTable>
      <TableFooter />
    </DndContext>
  );
};

export default QuestionTable;
