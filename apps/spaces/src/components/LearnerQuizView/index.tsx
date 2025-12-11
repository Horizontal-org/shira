import { Body1, Button, SettingsFishIcon, Table, TableCheckbox, styled, useTheme } from "@shira/ui";
import { ColumnDef, RowSelectionState } from "@tanstack/react-table";
import { FunctionComponent, useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { GoPersonFill } from "react-icons/go";
import { IoPersonRemoveSharp } from "react-icons/io5";
import { LearnerEmail, LearnerHeader, LearnerName, LearnerPersonInfo } from "../LearnersTable/components/LearnerHeader";
import { QuizStatusTag } from "./components/QuizStatusTag";
import { AssignRequest, getAssignedLearners } from "../../fetch/learner_quiz";
import { LearnerErrorModal } from "../modals/ErrorModal";
import { AssignLearnerAction } from "./components/AssignLearnerAction";
import { UnassignLearnerAction } from "./components/UnassignLearnerAction";

interface Learner {
  id: number;
  name: string;
  email: string;
  status: string;
}

interface Props {
  quizId: number;
  onAssignLearners?: () => void;
  onUnassignLearner?: (learnerId: number) => void;
}

export const LearnerQuizView: FunctionComponent<Props> = ({
  quizId,
  onUnassignLearner
}) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Learner[]>([]);

  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [retryAction, setRetryAction] = useState<(() => void) | null>(null);

  // Key of row selection is DB ID of learner
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const [pendingUnassignLearners, setPendingUnassignLearners] = useState<AssignRequest[] | null>(null);

  const isUnassignModalOpen = Boolean(pendingUnassignLearners);

  const openErrorModal = useCallback(
    (content: string, retry: () => void) => {
      setErrorMessage(content);
      setRetryAction(() => retry);
      setIsErrorModalOpen(true);
    },
    []
  );

  const closeErrorModal = useCallback(() => {
    setIsErrorModalOpen(false);
    setRetryAction(null);
    setErrorMessage(null);
  }, []);

  const handleErrorModalRetry = useCallback(() => {
    const retry = retryAction;
    closeErrorModal();
    retry?.();
  }, [retryAction, closeErrorModal]);

  const fetchLearnerQuiz = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getAssignedLearners(quizId);
      setData(data);
      setRowSelection({});
    } catch (e) {
      console.log("🚀 ~ fetchLeaners ~ e:", e);
    } finally {
      setLoading(false);
    }
  }, [quizId]);

  const selectedLearnerIds = useMemo(
    () =>
      Object.entries(rowSelection)
        .filter(([, isSelected]) => Boolean(isSelected))
        .map(([id]) => Number(id)),
    [rowSelection]
  );

  const hasSelectedLearners = selectedLearnerIds.length > 0;

  const handleBulkUnassignClick = useCallback(() => {
    if (!selectedLearnerIds.length) return;

    setPendingUnassignLearners(
      selectedLearnerIds.map((learnerId) => ({
        learnerId,
        quizId,
      }))
    );
  }, [selectedLearnerIds, quizId]);

  const columns = useMemo<ColumnDef<Learner>[]>(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <TableCheckbox
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler(),
              isTDCheckbox: false
            }}
          />
        ),
        cell: ({ row }) => (
          <TableCheckbox
            {...{
              checked: row.getIsSelected(),
              disabled: !row.getCanSelect(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler(),
              isTDCheckbox: true
            }}
          />
        ),
      },
      {
        header: () => {
          return (
            <LearnerHeader>
              <GoPersonFill size={18} color={theme.colors.dark.darkGrey} />
              <span>{t('learners.table.learner')}</span>
            </LearnerHeader>
          )
        },
        id: 'learner',
        cell: ({ row }) => {
          return (
            <LearnerPersonInfo>
              <LearnerName>{row.original.name}</LearnerName>
              <LearnerEmail>{row.original.email}</LearnerEmail>
            </LearnerPersonInfo>
          )
        },
      },
      {
        header: t('learners.table.registration'),
        accessorKey: 'status',
        cell: info => (<QuizStatusTag status={info.getValue() as string} />)
      },
      {
        id: 'actions',
        cell: ({ row }) => {
          const learner = row.original;
          return (
            <UnassignAction
              onClick={() => {
                setPendingUnassignLearners([{ learnerId: learner.id, quizId }]);
              }}
            >
              <IoPersonRemoveSharp size={24} color={theme.colors.error9} />
            </UnassignAction>
          );
        },
      },
    ],
    [t, theme, quizId]
  );

  useEffect(() => {
    fetchLearnerQuiz();
  }, [fetchLearnerQuiz]);

  const hasData = data.length > 0;
  const showLoadingState = loading && !hasData;
  const showEmptyState = !loading && !hasData;

  return (
    <>
      <div>
        {!showLoadingState && !showEmptyState && (
          <DescriptionWrapper>
            <LeftActions>
              <Body1>{t("learner_quiz_tab.table.description")}</Body1>
            </LeftActions>

            {hasSelectedLearners && (
              <RightActions>
                <Button
                  id="unassign-learners-bulk-button"
                  text={t("buttons.unassign_learners")}
                  type="primary"
                  leftIcon={<IoPersonRemoveSharp size={20} />}
                  color={theme.colors.error7}
                  onClick={handleBulkUnassignClick}
                  disabled={!hasSelectedLearners}
                />
              </RightActions>
            )}
          </DescriptionWrapper>
        )}

        {showLoadingState ? (
          <LoadingState>
            <Body1>{t("loading_messages.loading")}</Body1>
          </LoadingState>
        ) : showEmptyState ? (
          <EmptyStateContainer>
            <SettingsFishIcon />
            <EmptyDescription>
              {t("learner_quiz_tab.empty_state.description")}
            </EmptyDescription>
            <AssignLearnerAction
              learnerIds={selectedLearnerIds}
              quizId={quizId}
              openErrorModal={openErrorModal}
            />
          </EmptyStateContainer>
        ) : (
          <Table
            loading={loading}
            data={data}
            columns={columns}
            rowSelection={rowSelection}
            setRowSelection={setRowSelection}
            colGroups={
              <colgroup>
                <col style={{ width: "50px" }} />
                <col style={{ width: "50%" }} />
                <col />
                <col style={{ width: "80px" }} />
              </colgroup>
            }
          />
        )}
      </div>

      <LearnerErrorModal
        isOpen={isErrorModalOpen}
        errorMessage={errorMessage}
        onRetry={handleErrorModalRetry}
        onCancel={closeErrorModal}
      />

      {pendingUnassignLearners && (
        <UnassignLearnerAction
          learners={pendingUnassignLearners}
          isOpen={isUnassignModalOpen}
          onClose={() => setPendingUnassignLearners(null)}
          openErrorModal={openErrorModal}
          onSuccess={() => {
            fetchLearnerQuiz();

            if (pendingUnassignLearners.length === 1) {
              onUnassignLearner?.(pendingUnassignLearners[0].learnerId);
            }

            if (pendingUnassignLearners.length > 1) {
              setRowSelection({});
            }

            setPendingUnassignLearners(null);
          }}
        />
      )}
    </>
  );
};

const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 64px 16px;
  gap: 16px;
`;

const EmptyDescription = styled(Body1)`
  text-align: center;
  max-width: 800px;
  padding-bottom: 20px;
`;

const LoadingState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 64px 16px;
`;

const DescriptionWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 25px;
`;

const LeftActions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const RightActions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const UnassignAction = styled.button`
  display: flex;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
`;
