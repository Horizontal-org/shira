import { FunctionComponent, memo } from "react";
import { flexRender, Row } from "@tanstack/react-table";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FiCopy, FiDownload, FiTrash2, FiUpload } from "react-icons/fi";
import { defaultTheme, Td as SharedTd, Tr as SharedTr, styled } from "@horizontal-org/shira-ui";
import { QuizViewItem } from "../../../../store/slices/quiz";
import { BaseActionsMenu } from "../Question/BaseActionsMenu";

interface Props {
  row: Row<QuizViewItem>;
  duplicatingQuestionId: string | null;
  duplicatingNoteId: string | null
  onEditQuestion: (questionId: string) => void;
  onDuplicateQuestion: (questionId: string) => void;
  onSubmitQuestionAsTemplate: (questionId: string) => void;
  onExportQuestion: (questionId: string) => void;
  onDeleteQuestion: (questionId: string) => void;
  onDeleteNote: (noteId: string) => void;
  onEditNote: (noteId: string) => void;
  onDuplicateNote: (noteId: string) => void
  editTooltip: string;
  duplicateTooltip: string;
  submitAsTemplateTooltip: string;
  deleteTooltip: string;
  exportTooltip: string;
}

const QuizItemTableDraggableRowComponent: FunctionComponent<Props> = ({
  row,
  duplicatingQuestionId,
  duplicatingNoteId,
  onEditQuestion,
  onDuplicateQuestion,
  onSubmitQuestionAsTemplate,
  onExportQuestion,
  onDeleteQuestion,
  onEditNote,
  onDeleteNote,
  onDuplicateNote,
  editTooltip,
  duplicateTooltip,
  submitAsTemplateTooltip,
  deleteTooltip,
  exportTooltip,
}) => {
  const item = row.original;
  const rowId = `${item.entityType}-${item.entityId}`;

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: rowId,
    animateLayoutChanges: () => false,
  });

  const isDuplicatingThisQuestion = item.entityType === "question" && duplicatingQuestionId === item.question.id;
  const isDuplicatingThisNote = item.entityType === "note" && duplicatingNoteId === item.entityId.toString()
  const isDuplicatingThisItem = isDuplicatingThisQuestion || isDuplicatingThisNote

  return (
    <Tr
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      $dragging={isDragging}
      id={`quiz-item-${rowId}`}
    >
      {row.getVisibleCells().map((cell) => {
        if (cell.column.id === "drag") {
          return (
            <Td key={cell.id}>
              <HandleButton
                type="button"
                {...attributes}
                {...listeners}
                disabled={isDuplicatingThisItem}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </HandleButton>
            </Td>
          );
        }

        if (cell.column.id === "actions") {
          if (item.entityType === "note") {
            return (
              <Td key={cell.id}>
                <BaseActionsMenu
                  editLabel={editTooltip}
                  onEdit={() => onEditNote(item.entityId.toString())}
                  disabled={isDuplicatingThisNote}
                  items={[
                    {
                      text: duplicateTooltip,
                      icon: <FiCopy color={defaultTheme.colors.dark.darkGrey} />,
                      onClick: () => onDuplicateNote(item.entityId.toString()),
                    },
                    {
                      text: deleteTooltip,
                      icon: <FiTrash2 color={defaultTheme.colors.dark.darkGrey} />,
                      onClick: () => onDeleteNote(item.entityId.toString()),
                    },
                  ]}
                />
              </Td>
            );
          }

          const questionId = item.question.id;

          return (
            <Td key={cell.id}>
              <BaseActionsMenu
                editLabel={editTooltip}
                onEdit={() => onEditQuestion(questionId)}
                disabled={isDuplicatingThisQuestion}
                items={[
                  {
                    text: duplicateTooltip,
                    icon: <FiCopy color={defaultTheme.colors.dark.darkGrey} />,
                    onClick: () => onDuplicateQuestion(questionId),
                  },
                  {
                    text: submitAsTemplateTooltip,
                    icon: <FiUpload color={defaultTheme.colors.dark.darkGrey} />,
                    onClick: () => onSubmitQuestionAsTemplate(questionId),
                  },
                  {
                    text: exportTooltip,
                    icon: <FiDownload color={defaultTheme.colors.dark.darkGrey} />,
                    onClick: () => onExportQuestion(questionId),
                  },
                  {
                    text: deleteTooltip,
                    icon: <FiTrash2 color={defaultTheme.colors.dark.darkGrey} />,
                    onClick: () => onDeleteQuestion(questionId),
                  },
                ]}
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

export const QuizItemTableDraggableRow = memo(QuizItemTableDraggableRowComponent);

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
