import { FunctionComponent, memo } from "react";
import { flexRender, Row } from "@tanstack/react-table";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { defaultTheme, Td as SharedTd, Tr as SharedTr, styled } from "@horizontal-org/shira-ui";
import { QuizQuestion } from "../../../store/slices/quiz";
import { QuestionTableActionsMenu } from "./QuestionTableActionsMenu";

interface Props {
  row: Row<QuizQuestion>;
  duplicatingQuestionId: string | null;
  onEditQuestion: (questionId: string) => void;
  onDuplicateQuestion: (questionId: string) => void;
  onDeleteQuestion: (questionId: string) => void;
  editTooltip: string;
  duplicateTooltip: string;
  deleteTooltip: string;
}

const QuestionTableDraggableRowComponent: FunctionComponent<Props> = ({
  row,
  duplicatingQuestionId,
  onEditQuestion,
  onDuplicateQuestion,
  onDeleteQuestion,
  editTooltip,
  duplicateTooltip,
  deleteTooltip,
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
                deleteLabel={deleteTooltip}
                disabled={isDuplicatingThisQuestion}
                onEdit={() => onEditQuestion(questionId)}
                onDuplicate={() => onDuplicateQuestion(questionId)}
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
  padding: 14px 16px;
`;

const Tr = styled(SharedTr)`
  &:hover td {
    background: ${defaultTheme.colors.light.paleGrey};
  }
`;

const HandleButton = styled.button`
  all: unset;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: grab;
  touch-action: none;

  &:active {
    cursor: grabbing;
  }

  &:disabled {
    cursor: not-allowed;
  }
`;
