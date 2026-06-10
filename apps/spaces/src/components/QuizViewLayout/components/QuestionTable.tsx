import { CSSProperties, FunctionComponent, ReactElement, useMemo, useRef, useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  Row,
  useReactTable,
} from "@tanstack/react-table";
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
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FiLoader } from "react-icons/fi";
import { FiCopy, FiMoreVertical, FiTrash2 } from "react-icons/fi";
import { FaCircleCheck } from "react-icons/fa6";
import { MdDragIndicator, MdOutlinePhishing } from "react-icons/md";
import {
  ActionTooltip,
  BaseFloatingMenu,
  Body3,
  Body3Bold,
  defaultTheme,
  EditIcon,
  styled,
} from "@horizontal-org/shira-ui";
import { useTranslation } from "react-i18next";
import { QuizQuestion } from "../../../store/slices/quiz";
import { appIcons } from "../../../utils/appIcons";
import { normalizePreviewAppName } from "../../../utils/appNames";

type QuestionTableRow = QuizQuestion & {
  id: string;
};

interface QuestionTableProps {
  quizQuestions: QuizQuestion[];
  duplicatingQuestions: Set<string>;
  onEditQuestion: (questionId: string) => void;
  onDuplicateQuestion: (questionId: string) => void;
  onDeleteQuestion: (question: QuizQuestion["question"]) => void;
  onReorder: (newOrder: QuizQuestion[]) => void;
}

type DraggableRowProps = {
  row: Row<QuestionTableRow>;
  duplicatingQuestions: Set<string>;
  onEditQuestion: (questionId: string) => void;
  onDuplicateQuestion: (questionId: string) => void;
  onDeleteQuestion: (question: QuizQuestion["question"]) => void;
  editTooltip: string;
  duplicateTooltip: string;
  deleteTooltip: string;
};

export const QuestionTable: FunctionComponent<QuestionTableProps> = ({
  quizQuestions,
  duplicatingQuestions,
  onEditQuestion,
  onDuplicateQuestion,
  onDeleteQuestion,
  onReorder,
}) => {
  const { t } = useTranslation();
  const editTooltip = t("questions_tab.action_tooltips.edit");
  const duplicateTooltip = t("questions_tab.action_tooltips.duplicate");
  const deleteTooltip = t("questions_tab.action_tooltips.delete");

  const rows = useMemo<QuestionTableRow[]>(
    () =>
      [...quizQuestions]
        .sort((a, b) => a.position - b.position)
        .map((quizQuestion) => ({
          ...quizQuestion,
          id: quizQuestion.question.id,
        })),
    [quizQuestions],
  );

  const columns = useMemo<ColumnDef<QuestionTableRow>[]>(
    () => [
      {
        header: "",
        id: "drag",
        cell: ({ row }) => {
          const isBeingDuplicated = duplicatingQuestions.has(row.original.question.id);

          return (
            <HandleContent id={`drag-handle-${row.original.question.id}`}>
              {isBeingDuplicated ? (
                <SpinningLoader size={18} color={defaultTheme.colors.dark.darkGrey} />
              ) : (
                <MdDragIndicator size={20} color={defaultTheme.colors.dark.darkGrey} />
              )}
            </HandleContent>
          );
        },
      },
      {
        header: t("question_library.columns.question_name"),
        id: "questionName",
        cell: ({ row }) => {
          const isBeingDuplicated = duplicatingQuestions.has(row.original.question.id);

          return (
            <QuestionNameCell id={`question-title-${row.original.question.id}`}>
              {isBeingDuplicated ? t("loading_messages.duplicating") : row.original.question.name}
            </QuestionNameCell>
          );
        },
      },
      {
        header: t("question_library.columns.type.title"),
        id: "type",
        cell: ({ row }) => {
          const isPhishing = Boolean(row.original.question.isPhising);

          return (
            <TypePill $isPhishing={isPhishing}>
              {isPhishing ? (
                <MdOutlinePhishing size={16} />
              ) : (
                <FaCircleCheck size={16} color={defaultTheme.colors.green6} />
              )}
              {isPhishing
                ? t("question_library.columns.type.phishing")
                : t("question_library.columns.type.legitimate")}
            </TypePill>
          );
        },
      },
      {
        header: t("question_library.columns.app.title"),
        id: "app",
        cell: ({ row }) => {
          const app = row.original.question.apps?.[0];

          if (!app?.name) {
            return <Body3>-</Body3>;
          }

          const appName = normalizePreviewAppName(app.name);
          const appIcon = appIcons[appName.toLowerCase()];

          return (
            <AppValue>
              {appIcon}
              <Body3>{appName}</Body3>
            </AppValue>
          );
        },
      },
      {
        header: t("question_library.columns.actions.title"),
        id: "actions",
        cell: () => null,
      },
    ],
    [duplicatingQuestions, t],
  );

  const table = useReactTable({
    data: rows,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (row) => row.id,
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

        const oldIndex = rows.findIndex((row) => row.id === active.id);
        const newIndex = rows.findIndex((row) => row.id === over.id);

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
          <col style={{ width: "5%" }} />
          <col style={{ width: "45%" }} />
          <col style={{ width: "20%" }} />
          <col style={{ width: "15%" }} />
          <col style={{ width: "15%" }} />
        </colgroup>
        <THead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </Th>
              ))}
            </tr>
          ))}
        </THead>
        <SortableContext
          items={rows.map((row) => row.id)}
          strategy={verticalListSortingStrategy}
        >
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <DraggableRow
                key={row.id}
                row={row}
                duplicatingQuestions={duplicatingQuestions}
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

const DraggableRow: FunctionComponent<DraggableRowProps> = ({
  row,
  duplicatingQuestions,
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
    id: row.original.id,
  });

  const dragButtonStyle: CSSProperties = {
    touchAction: "none",
  };

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
          const isBeingDuplicated = duplicatingQuestions.has(row.original.question.id);

          return (
            <Td key={cell.id}>
              <HandleButton
                type="button"
                aria-label="Reorder question"
                {...attributes}
                {...listeners}
                style={dragButtonStyle}
                disabled={isBeingDuplicated}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </HandleButton>
            </Td>
          );
        }

        if (cell.column.id === "actions") {
          const questionId = row.original.question.id;
          const isBeingDuplicated = duplicatingQuestions.has(questionId);

          return (
            <Td key={cell.id}>
              <ActionsCell>
                <ActionTooltip content={editTooltip}>
                  <ActionButton
                    id={`edit-button-${questionId}`}
                    type="button"
                    aria-label={editTooltip}
                    onClick={() => onEditQuestion(questionId)}
                  >
                    <EditIcon />
                  </ActionButton>
                </ActionTooltip>

                <MoreActionsMenu
                  question={row.original.question}
                  duplicateLabel={duplicateTooltip}
                  deleteLabel={deleteTooltip}
                  isBeingDuplicated={isBeingDuplicated}
                  onDuplicate={() => onDuplicateQuestion(questionId)}
                  onDelete={() => onDeleteQuestion(row.original.question)}
                />
              </ActionsCell>
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

interface MoreActionsMenuProps {
  question: QuizQuestion["question"];
  duplicateLabel: string;
  deleteLabel: string;
  isBeingDuplicated: boolean;
  onDuplicate: () => void;
  onDelete: () => void;
}

const MoreActionsMenu: FunctionComponent<MoreActionsMenuProps> = ({
  question,
  duplicateLabel,
  deleteLabel,
  isBeingDuplicated,
  onDuplicate,
  onDelete,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const elements: Array<{
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    text: string;
    icon?: ReactElement;
  }> = [
    {
      text: duplicateLabel,
      onClick: (event) => {
        event.stopPropagation();
        onDuplicate();
        setIsOpen(false);
      },
      icon: <FiCopy color={defaultTheme.colors.dark.darkGrey} />,
    },
    {
      text: deleteLabel,
      onClick: (event) => {
        event.stopPropagation();
        onDelete();
        setIsOpen(false);
      },
      icon: <FiTrash2 color={defaultTheme.colors.dark.darkGrey} />,
    },
  ];

  return (
    <>
      <ActionButton
        id={`more-actions-button-${question.id}`}
        ref={buttonRef}
        type="button"
        aria-label="More actions"
        title="More actions"
        onClick={(event) => {
          event.stopPropagation();
          setIsOpen((current) => !current);
        }}
        disabled={isBeingDuplicated}
      >
        <FiMoreVertical size={20} color={defaultTheme.colors.dark.darkGrey} />
      </ActionButton>

      <BaseFloatingMenu
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        elements={elements}
        anchorEl={buttonRef.current}
        width={150}
      />
    </>
  );
};

const TableHeader = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 16px;
  background: ${defaultTheme.colors.light.paleGreen};
  border-radius: 20px 20px 0 0;
`;

const TableFooter = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 6px;
  background: white;
  border-radius: 0 0 20px 20px;
  border-left: 1px solid ${defaultTheme.colors.light.paleGreen};
  border-right: 1px solid ${defaultTheme.colors.light.paleGreen};
  border-bottom: 1px solid ${defaultTheme.colors.light.paleGreen};
`;

const StyledTable = styled.table`
  background: ${defaultTheme.colors.light.paleGrey};
  width: 100%;
  table-layout: fixed;
  font-size: 14px;
  border: none;
  border-spacing: 0;
  border-left: 1px solid ${defaultTheme.colors.light.paleGreen};
  border-right: 1px solid ${defaultTheme.colors.light.paleGreen};
`;

const THead = styled.thead`
  & th {
    background: ${defaultTheme.colors.light.paleGreen};
  }
`;

const Th = styled.th`
  text-align: left;
  padding: 0 16px 14px 16px;
  font-weight: 600;
  color: ${defaultTheme.colors.dark.black};
  vertical-align: middle;
  border: none;
  box-sizing: border-box;
  width: inherit;
  font-size: 16px;
`;

const Td = styled.td`
  background: ${defaultTheme.colors.light.white};
  padding: 14px 16px;
  vertical-align: middle;
  box-sizing: border-box;
  width: inherit;
  font-size: inherit;
  border-bottom: 1px solid ${defaultTheme.colors.light.paleGrey};
`;

const Tr = styled.tr<{ $dragging?: boolean }>`
  position: relative;

  &:hover td {
    background: ${defaultTheme.colors.light.paleGrey};
  }

  &:last-child td {
    border-bottom: none;
  }

  ${(props) => props.$dragging && `
    z-index: 2;

    & td {
      background: ${defaultTheme.colors.light.white};
    }
  `}
`;

const HandleButton = styled.button`
  all: unset;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: grab;

  &:active {
    cursor: grabbing;
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

const HandleContent = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: ${defaultTheme.colors.dark.darkGrey};
`;

const QuestionNameCell = styled(Body3Bold)`
  color: ${defaultTheme.colors.dark.darkGrey};
`;

const TypePill = styled.span<{ $isPhishing: boolean }>`
  background: ${(props) => (
    props.$isPhishing
      ? defaultTheme.colors.light.paleRed
      : defaultTheme.colors.light.paleGreen)};
  color: ${(props) => (
    props.$isPhishing
      ? defaultTheme.colors.error9
      : defaultTheme.colors.green9)};
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border-radius: 2px;
  padding: 4px 8px;
  font-size: 14px;
  font-weight: 400;
`;

const AppValue = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: ${defaultTheme.colors.dark.darkGrey};
`;

const ActionsCell = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  border-radius: 4px;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:hover:not(:disabled) {
    background: ${defaultTheme.colors.light.paleGreen};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

const SpinningLoader = styled(FiLoader)`
  animation: spin 1s linear infinite;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

export default QuestionTable;
