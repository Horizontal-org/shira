import { Body1, Body4, Button, EmptyState, Table, TableCheckbox, styled, useTheme } from "@shira/ui";
import { ColumnDef, RowSelectionState } from "@tanstack/react-table";
import { FunctionComponent, useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { GoPersonFill } from "react-icons/go";
import { IoPersonAdd, IoPersonRemoveSharp } from "react-icons/io5";
import { LearnerEmail, LearnerHeader, LearnerName, LearnerPersonInfo } from "../LearnersTable/components/LearnerHeader";
import { QuizStatusTag } from "./components/QuizStatusTag";
import { getAssignedLearners } from "../../fetch/learner_quiz";
import { UnassignLearnerAction } from "./components/UnassignLearnerAction";
import { AssignLearnersLayover } from "./components/AssignLearnersLayover";
import { GenericErrorModal } from "../modals/ErrorModal";
import { PublishQuizAction } from "./components/PublishQuizAction";

export interface Learner {
  id: number;
  name: string;
  email: string;
  status: string;
}

interface Props {
  quizId: number;
  quizTitle: string;
  quizPublished: boolean
  hasQuestions: boolean
  onPublish: () => void
}

export const LearnerQuizView: FunctionComponent<Props> = ({
  quizId,
  quizTitle,
  quizPublished,
  hasQuestions,
  onPublish
}) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Learner[]>([]);

  const [showAssignLayover, setAssignLayover] = useState(false);
  const [isPublishQuizModalOpen, setIsPublishQuizModalOpen] = useState(false)
  const [showAssignTooltip, setShowAssignTooltip] = useState(false);

  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [singleLearnerId, setSingleLearnerId] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  //Key of row selection is DB ID of learner
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [isUnassignModalOpen, setIsUnassignModalOpen] = useState(false);

  const openErrorModal = useCallback((content: string) => {
    setErrorMessage(content);
    setIsErrorModalOpen(true);
  }, []);

  const closeErrorModal = useCallback(() => {
    setIsErrorModalOpen(false);
    setErrorMessage(null);
  }, []);

  const handleErrorModalRetry = useCallback(() => {
    closeErrorModal();
  }, [closeErrorModal]);

  const handleSingleUnassign = useCallback((id: number): void => {
    setSingleLearnerId(id);
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
          name: data.find(learner => learner.id === Number(id))?.name || '',
          email: data.find(learner => learner.id === Number(id))?.email || ''
        })),
    [rowSelection, quizId]
  );

  //TODO change to state management ?
  const learnersToUnassign = singleLearnerId !== null
    ? [{ learnerId: singleLearnerId, quizId }]
    : selectedLearners;

  function getSelectedLearner(): Learner {
    if (singleLearnerId !== null) {
      return data.find(l => l.id === singleLearnerId);
    }

    const firstSelected = selectedLearners[0];
    if (firstSelected) {
      return data.find(l => l.id === firstSelected.learnerId);
    }

    return;
  };

  const handleAssignmentOpen = () => {
    if (!hasQuestions) {
      return
    }

    if (quizPublished) {
      setAssignLayover(true)
      window.scrollTo(0, 0)
    } else {
      setIsPublishQuizModalOpen(true)
    }
  }

  const hasSelectedLearners = selectedLearners.length > 0;
  const disableAssign = !hasQuestions;

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
    [t, theme, handleSingleUnassign]
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
                  <AssignButtonWrapper
                    $showHelpCursor={disableAssign}
                    onMouseEnter={() => {
                      if (disableAssign) {
                        setShowAssignTooltip(true)
                      }
                    }}
                    onMouseLeave={() => {
                      setShowAssignTooltip(false)
                    }}
                    onFocus={() => {
                      if (disableAssign) {
                        setShowAssignTooltip(true)
                      }
                    }}
                    onBlur={() => {
                      setShowAssignTooltip(false)
                    }}
                    tabIndex={disableAssign ? 0 : -1}
                  >
                    <Button
                      id="assign-learners-button"
                      type="primary"
                      text={t('learners.assign_dialog.assign_button')}
                      color={theme.colors.green7}
                      leftIcon={(
                        <IoPersonAdd size={20} color="white" />
                      )}
                      onClick={handleAssignmentOpen}
                      disabled={disableAssign}
                    />
                    {disableAssign && showAssignTooltip && (
                      <AssignButtonTooltip role="tooltip">
                        <Body4>{t('learners.assign_dialog.disabled_tooltip')}</Body4>
                      </AssignButtonTooltip>
                    )}
                  </AssignButtonWrapper>
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
          <EmptyState
            subtitle={t("learner_quiz_tab.empty_state.description")}
            buttons={[
              <AssignButtonWrapper
                key="assign-learners"
                $showHelpCursor={disableAssign}
                onMouseEnter={() => {
                  if (disableAssign) {
                    setShowAssignTooltip(true)
                  }
                }}
                onMouseLeave={() => {
                  setShowAssignTooltip(false)
                }}
                onFocus={() => {
                  if (disableAssign) {
                    setShowAssignTooltip(true)
                  }
                }}
                onBlur={() => {
                  setShowAssignTooltip(false)
                }}
                tabIndex={disableAssign ? 0 : -1}
              >
                <Button
                  id="assign-learners-button"
                  type="primary"
                  text={t('learners.assign_dialog.assign_button')}
                  color={theme.colors.green7}
                  leftIcon={(
                    <IoPersonAdd size={20} color="white" />
                  )}
                  onClick={handleAssignmentOpen}
                  disabled={disableAssign}
                />
                {disableAssign && showAssignTooltip && (
                  <AssignButtonTooltip role="tooltip">
                    <Body4>{t('learners.assign_dialog.disabled_tooltip')}</Body4>
                  </AssignButtonTooltip>
                )}
              </AssignButtonWrapper>
            ]}
          />
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

      <GenericErrorModal
        isOpen={isErrorModalOpen}
        errorMessage={errorMessage}
        onRetry={handleErrorModalRetry}
        onCancel={closeErrorModal}
      />

      <UnassignLearnerAction
        learners={learnersToUnassign}
        isModalOpen={isUnassignModalOpen}
        quizTitle={quizTitle}
        selectedLearner={getSelectedLearner()}
        onSuccess={() => {
          fetchLearnerQuiz();
          setRowSelection({});
        }}
        onClose={() => {
          setRowSelection({});
          setSingleLearnerId(null);
          setIsUnassignModalOpen(false);
        }}
        openErrorModal={openErrorModal}
      />

      <PublishQuizAction
        isModalOpen={isPublishQuizModalOpen}
        onPublish={() => {
          onPublish()
          setIsPublishQuizModalOpen(false)
          setAssignLayover(true)
          window.scrollTo(0, 0)
        }}
        onClose={() => {
          setIsPublishQuizModalOpen(false)
          setAssignLayover(true)
          window.scrollTo(0, 0)
        }}
      />
      {
        showAssignLayover && (
          <AssignLearnersLayover
            title={t('learners.assign_dialog.assign_title', { quiz_title: quizTitle })}
            quizId={quizId}
            openErrorModal={openErrorModal}
            onExit={() => { setAssignLayover(false) }}
            onSuccess={() => { fetchLearnerQuiz() }}
          />
        )
      }
    </>
  );
};

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

const AssignButtonWrapper = styled.div<{ $showHelpCursor: boolean }>`
  position: relative;
  display: inline-flex;
  align-items: center;

  ${props => props.$showHelpCursor && `
    cursor: help;

    button:disabled {
      cursor: help !important;
    }
  `}
`;

const AssignButtonTooltip = styled.div`
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 6px;
  padding: 4px 8px;
  background-color: ${(props) => props.theme.colors.dark.black};
  color: ${(props) => props.theme.colors.light.white};
  border-radius: 10px;
  width: max-content;
  max-width: 520px;
  white-space: nowrap;
  z-index: 1000;
`;

const UnassignAction = styled.button`
  display: flex;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
`;
