import { FunctionComponent, memo } from "react";
import { flexRender, Row } from "@tanstack/react-table";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { defaultTheme, Td as SharedTd, Tr as SharedTr, styled } from "@horizontal-org/shira-ui";
import { QuizQuestion } from "../../../../store/slices/quiz";
import { QuestionTableActionsMenu } from "./QuestionTableActionsMenu";

interface Props {
  row: Row<QuizQuestion>;
  duplicatingQuestionId: string | null;
  onEditQuestion: (questionId: string) => void;
  onDuplicateQuestion: (questionId: string) => void;
  onSubmitQuestionAsTemplate: (questionId: string) => void;
  onExportQuestion: (questionId: string) => void;
  onDeleteQuestion: (questionId: string) => void;
  editTooltip: string;
  duplicateTooltip: string;
  submitAsTemplateTooltip: string;
  deleteTooltip: string;
  exportTooltip: string;
}

const QuestionTableDraggableRowComponent: FunctionComponent<Props> = ({
  row,
  duplicatingQuestionId,
  onEditQuestion,
  onDuplicateQuestion,
  onSubmitQuestionAsTemplate,
  onExportQuestion,
  onDeleteQuestion,
  editTooltip,
  duplicateTooltip,
  submitAsTemplateTooltip,
  deleteTooltip,
  exportTooltip,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: row.original.question.id,
    animateLayoutChanges: () => false,
  });

  const isDuplicatingThisQuestion = duplicatingQuestionId === row.original.question.id;

  return (
    <Tr
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      $dragging={isDragging}
      id={`question-item-${row.original.question.id}`}
    >
      {row.getVisibleCells().map((cell) => {
        if (cell.column.id === "drag") {
          return (
            <Td key={cell.id}>
              <HandleButton
                type="button"
                {...attributes}
                {...listeners}
                disabled={isDuplicatingThisQuestion}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </HandleButton>
            </Td>
          );
        }

        if (cell.column.id === "actions") {
          const questionId = row.original.question.id;

          return (
            <Td key={cell.id}>
              <QuestionTableActionsMenu
                editLabel={editTooltip}
                duplicateLabel={duplicateTooltip}
                submitAsTemplateLabel={submitAsTemplateTooltip}
                deleteLabel={deleteTooltip}
                exportLabel={exportTooltip}
                disabled={isDuplicatingThisQuestion}
                onEdit={() => onEditQuestion(questionId)}
                onDuplicate={() => onDuplicateQuestion(questionId)}
                onSubmitAsTemplate={() => onSubmitQuestionAsTemplate(questionId)}
                onExport={() => onExportQuestion(questionId)}
                onDelete={() => onDeleteQuestion(questionId)}
              />
            </Td>
          );
        }

        return (
          <Td key={cell.id}>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </Td>
        );
      })}
    </Tr>
  );
};

export const QuestionTableDraggableRow = memo(QuestionTableDraggableRowComponent);

const Td = styled(SharedTd)`
  padding: 14px 14px;
`;

const Tr = styled(SharedTr)`
  &:hover td {
    background: ${defaultTheme.colors.light.paleGrey};
  }
`;

const HandleButton = styled.button`
  all: unset;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  line-height: 0;
  cursor: grab;
  touch-action: none;

  color: ${defaultTheme.colors.dark.mediumGrey};

  &:active {
    cursor: grabbing;
  }

  &:disabled {
    cursor: not-allowed;
  }
`;
