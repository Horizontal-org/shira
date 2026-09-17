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
import { QuizViewItem } from "../../../../store/slices/quiz";
import { useQuizItemTableColumns } from "./QuizItemTableColumns";
import { QuizItemTableDraggableRow } from "./QuizItemTableDraggableRow";

interface Props {
  items: QuizViewItem[];
  duplicatingQuestionId: string | null;
  onEditQuestion: (questionId: string) => void;
  onDuplicateQuestion: (questionId: string) => void;
  onSubmitQuestionAsTemplate: (questionId: string) => void;
  onExportQuestion: (questionId: string) => void;
  onDeleteQuestion: (questionId: string) => void;
  onDeleteNote: (noteId: string) => void;
  onEditNote: (noteId: string) => void;
  onReorder: (newOrder: QuizViewItem[]) => void;
}

const getItemRowId = (item: QuizViewItem) => `${item.entityType}-${item.entityId}`;

export const QuizItemsTable: FunctionComponent<Props> = ({
  items,
  duplicatingQuestionId,
  onEditQuestion,
  onDuplicateQuestion,
  onSubmitQuestionAsTemplate,
  onExportQuestion,
  onDeleteQuestion,
  onDeleteNote,
  onEditNote,
  onReorder,
}) => {
  const { t } = useTranslation();
  const editTooltip = t("questions_tab.action_tooltips.edit");
  const duplicateTooltip = t("questions_tab.action_tooltips.duplicate");
  const submitAsTemplateTooltip = t("questions_tab.action_tooltips.submit_as_template");
  const deleteTooltip = t("questions_tab.action_tooltips.delete");
  const exportTooltip = t("questions_tab.action_tooltips.export");

  const rows = useMemo<QuizViewItem[]>(
    () =>
      [...items]
        .sort((a, b) => a.position - b.position),
    [items],
  );

  const sortableRowIds = useMemo(
    () => rows.map(getItemRowId),
    [rows],
  );

  const columns = useQuizItemTableColumns();

  const table = useReactTable({
    data: rows,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getRowId: getItemRowId,
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

        const oldIndex = rows.findIndex((row) => getItemRowId(row) === active.id);
        const newIndex = rows.findIndex((row) => getItemRowId(row) === over.id);

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
              <QuizItemTableDraggableRow
                key={row.id}
                row={row}
                duplicatingQuestionId={duplicatingQuestionId}
                onEditQuestion={onEditQuestion}
                onDuplicateQuestion={onDuplicateQuestion}
                onSubmitQuestionAsTemplate={onSubmitQuestionAsTemplate}
                onExportQuestion={onExportQuestion}
                onDeleteQuestion={onDeleteQuestion}
                onDeleteNote={onDeleteNote}
                onEditNote={onEditNote}
                editTooltip={editTooltip}
                duplicateTooltip={duplicateTooltip}
                submitAsTemplateTooltip={submitAsTemplateTooltip}
                deleteTooltip={deleteTooltip}
                exportTooltip={exportTooltip}
              />
            ))}
          </tbody>
        </SortableContext>
      </StyledTable>
      <TableFooter />
    </DndContext>
  );
};

export default QuizItemsTable;
