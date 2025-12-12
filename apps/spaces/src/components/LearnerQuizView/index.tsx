import { Body1, Button, SettingsFishIcon, Table, TableCheckbox, styled, useTheme } from "@shira/ui";
import { ColumnDef } from "@tanstack/react-table";
import { FunctionComponent, useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { GoPersonFill } from "react-icons/go";
import { IoPersonAdd, IoPersonRemoveSharp } from "react-icons/io5";
import { LearnerEmail, LearnerHeader, LearnerName, LearnerPersonInfo } from "../LearnersTable/components/LearnerHeader";
import { QuizStatusTag } from "./components/QuizStatusTag";
import { getAssignedLearners } from "../../fetch/learner_quiz";
import { LearnerErrorModal } from "../modals/ErrorModal";
import { AssignLearnerAction } from "./components/AssignLearnerAction";
import { UnassignLearnerAction } from "./components/UnassignLearnerAction";
import { AssignLearnersLayover } from "./components/AssignLearnersLayover";

interface Learner {
  id: number;
  name: string;
  email: string;
  status: string;
}

interface Props {
  quizId: number
  quizTitle: string;
}

export const LearnerQuizView: FunctionComponent<Props> = ({
  quizId,
  quizTitle
}) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const [showAssignLayover, setAssignLayover] = useState(false);

  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [retryAction, setRetryAction] = useState<(() => void) | null>(null);

  //Key of row selection is DB ID of learner
  const [rowSelection, setRowSelection] = useState({});
  // const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [isUnassignModalOpen, setIsUnassignModalOpen] = useState(false);

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

  const handleSingleUnassign = useCallback((id: number): void => {
    setRowSelection({ [id]: true });
    setIsUnassignModalOpen(true);
  }, []);

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

  const selectedLearners = useMemo(
    () =>
      Object.entries(rowSelection)
        .filter(([, isSelected]) => Boolean(isSelected))
        .map(([id]) => ({
          learnerId: Number(id),
          quizId,
        })),
    [rowSelection, quizId]
  );

  const hasSelectedLearners = selectedLearners.length > 0;

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
        header: t('learners.table.quiz_status'),
        accessorKey: 'status',
        cell: info => (<QuizStatusTag status={info.getValue() as string} />)
      },
      {
        id: 'actions',
        cell: ({ row }) => {
          const learner = row.original;
          return (
            <UnassignAction
              onClick={() => { handleSingleUnassign(learner.id) }}
            >
              <IoPersonRemoveSharp size={24} color={theme.colors.error9} />
            </UnassignAction>
          )
        }
      }
    ],
    [t, theme]
  );

  useEffect(() => {
    const fetchLearnerQuiz = async () => {
      try {
        const data = await getAssignedLearners(quizId)
        setData(data)
      } catch (e) {
        console.log("🚀 ~ fetchLeaners ~ e:", e)
      } finally {
        setLoading(false)
      }
    }

    fetchLearnerQuiz()
  }, [quizId]);

  const hasData = data.length > 0;
  const showLoadingState = loading && !hasData;
  const showEmptyState = !loading && !hasData;

  return (
    <>
      <div>
        {!showLoadingState && !showEmptyState && (
          <LearnersHeaderRow>

            <ActionsRow>
              <LeftActions>
                {!hasSelectedLearners && (
                  <Button
                    id="assign-learners-button"
                    type="primary"
                    text={t('learners.assign_dialog.assign_button')}
                    color={theme.colors.green7}
                    leftIcon={(
                      <IoPersonAdd size={20} color="white" />
                    )}
                    onClick={() => {
                      setAssignLayover(true)
                      window.scrollTo(0, 0)
                    }}
                  />
                )}
              </LeftActions>

              <RightActions>
                {hasSelectedLearners && (
                  <Button
                    id="unassign-learners-bulk-button"
                    text={t('buttons.unassign_learners')}
                    type="primary"
                    leftIcon={<IoPersonRemoveSharp size={20} />}
                    color={theme.colors.error7}
                    onClick={() => setIsUnassignModalOpen(true)}
                  />
                )}
              </RightActions>
            </ActionsRow>

            <DescriptionWrapper>
              <Body1>{t('learner_quiz_tab.table.description')}</Body1>
            </DescriptionWrapper>

          </LearnersHeaderRow>
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
            <AssignLearnerAction learners={selectedLearners} openErrorModal={openErrorModal} />
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

      <UnassignLearnerAction
        learners={selectedLearners}
        isModalOpen={isUnassignModalOpen}
        onSuccess={() => {
          fetchLearnerQuiz();
          setRowSelection({});
        }}
        onClose={() => {
          setRowSelection({});
          setIsUnassignModalOpen(false);
        }}
        openErrorModal={openErrorModal}
      />

      {showAssignLayover && (
        <AssignLearnersLayover
          title={t('learners.assign_dialog.assign_title', { quiz_title: quizTitle })}
          quizId={quizId}
          openErrorModal={openErrorModal}
          onExit={() => { setAssignLayover(false) }}
          onSuccess={() => { fetchLearnerQuiz() }}
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

const LearnersHeaderRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
`;

const ActionsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
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

const DescriptionWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const UnassignAction = styled.button`
  display: flex;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
`;