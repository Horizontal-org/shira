import { Body1, Button, SettingsFishIcon, Table, TableCheckbox, styled, useTheme } from "@shira/ui";
import { ColumnDef } from "@tanstack/react-table";
import { FunctionComponent, useCallback, useEffect, useMemo, useState } from "react"
import { useTranslation } from "react-i18next";
import { GoPersonFill } from "react-icons/go";
import { FiUserPlus } from "react-icons/fi";
import { LearnerEmail, LearnerHeader, LearnerName, LearnerPersonInfo } from "../LearnersTable/components/LearnerHeader";
import { QuizStatusTag } from "./components/QuizStatusTag";
import { getAssignedLearners } from "../../fetch/learner_quiz";
import { UnassignLearnerAction } from "./components/UnassignLearnerAction";
import { LearnerErrorModal } from "../modals/ErrorModal";

interface Props {
  quizId: number,
  onUnassignLearner: (learnerId: number) => void;
  onUnassignLearners: (learnerIds: number[]) => void;
  onAssignLearners: () => void;
}

export const LearnerQuizView: FunctionComponent<Props> = ({
  quizId,
  onUnassignLearner,
  onUnassignLearners,
  onAssignLearners
}) => {
  const { t } = useTranslation()
  const theme = useTheme()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [retryAction, setRetryAction] = useState<(() => void) | null>(null)

  //Key of row selection is DB ID of learner
  const [rowSelection, setRowSelection] = useState({})
  console.log("🚀 ~ LearnersTable ~ rowSelection:", rowSelection)

  const openErrorModal = useCallback((content: string, retry: () => void) => {
    setErrorMessage(content)
    setRetryAction(() => retry)
    setIsErrorModalOpen(true)
  }, [])

  const closeErrorModal = useCallback(() => {
    setIsErrorModalOpen(false)
    setRetryAction(null)
    setErrorMessage(null)
  }, []);

  const handleErrorModalRetry = useCallback(() => {
    const retry = retryAction
    closeErrorModal()
    retry?.()
  }, [retryAction, closeErrorModal]);

  const fetchLearnerQuiz = useCallback(async () => {
    try {
      setLoading(true)
      const data = await getAssignedLearners(quizId)
      setData(data)
    } catch (e) {
      console.log("🚀 ~ fetchLeaners ~ e:", e);
    } finally {
      setLoading(false)
    }
  }, [quizId]);

  const handleUnassignSuccess = useCallback((learnerId: number) => {
    fetchLearnerQuiz()
    onUnassignLearner(learnerId)
  }, [fetchLearnerQuiz, onUnassignLearner]);

  const handleAssignLearnersClick = useCallback(() => {
    onAssignLearners?.()
  }, [onAssignLearners]);

  const columns = useMemo<ColumnDef<any>[]>(
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
            <UnassignLearnerAction
              learners={[{ learnerId: learner.id, quizId }]}
              openErrorModal={openErrorModal}
              onSuccess={() => handleUnassignSuccess(learner.id)}
            />
          )
        }
      }
    ],
    [t, theme, quizId, openErrorModal, handleUnassignSuccess]
  )

  useEffect(() => {
    fetchLearnerQuiz()
  }, [fetchLearnerQuiz])

  const isInitialLoading = loading && data.length === 0;
  const showEmptyState = !loading && data.length === 0;

  return (
    <>
      <div>
        {isInitialLoading ? (
          <LoadingState>
            <Body1>{t('loading_messages.loading')}</Body1>
          </LoadingState>
        ) : showEmptyState ? (
          <EmptyStateContainer>
            <SettingsFishIcon />
            <EmptyDescription>
              {t('learner_quiz_tab.empty_state.description')}
            </EmptyDescription>
            <Button
              leftIcon={<FiUserPlus size={18} />}
              text={t('learner_quiz_tab.empty_state.button')}
              type="primary"
              color={theme.colors.green7}
              onClick={handleAssignLearnersClick}
            />
          </EmptyStateContainer>
        ) : (
          <Table
            loading={loading}
            data={data}
            columns={columns}
            rowSelection={rowSelection}
            setRowSelection={setRowSelection}
            colGroups={(
              <colgroup>
                <col style={{ width: "50px" }} />
                <col style={{ width: "50%" }} />
                <col />
                <col style={{ width: "80px" }} />
              </colgroup>
            )}
          />
        )}
      </div>

      <LearnerErrorModal
        isOpen={isErrorModalOpen}
        errorMessage={errorMessage}
        onRetry={handleErrorModalRetry}
        onCancel={closeErrorModal}
      />
    </>
  )
}

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
`;
