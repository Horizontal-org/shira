import { Button, styled, Table, TableCheckbox, useTheme } from "@shira/ui";
import { ColumnDef } from "@tanstack/react-table";
import axios from "axios"
import { FunctionComponent, useEffect, useMemo, useState } from "react"
import { useTranslation } from "react-i18next";
import { GoPersonFill } from "react-icons/go";
import { LearnerEmail, LearnerHeader, LearnerName, LearnerPersonInfo } from "../LearnersTable/components/LearnerHeader";
import { QuizStatusTag } from "./components/QuizStatusTag";
import { IoPersonAdd, IoPersonRemoveSharp } from "react-icons/io5";
import { getAssignedLearners } from "../../fetch/learner_quiz";
import { AssignLearnersLayover } from "./components/AssignLearnersLayover";

interface Props {
  quizId: number
  quizTitle: string;
}

export const LearnerQuizView:FunctionComponent<Props> = ({
  quizId,
  quizTitle
}) => {
  const { t } = useTranslation()
  const theme = useTheme()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])
  const [showAssignLayover, setAssignLayover] = useState(false)
  //Key of row selection is DB ID of learner
  const [rowSelection, setRowSelection] = useState({})

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
            <span>{ t('learners.table.learner')}</span>
          </LearnerHeader>
          )},        
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
        cell: ({row}) => {
          return (
            <UnassignAction 
             onClick={() => { console.log('UNASSING') }}  
            >
              <IoPersonRemoveSharp size={24} color={theme.colors.error9} />
            </UnassignAction>
          )
        }
      }
    ],
    [t, theme]
  )


  useEffect(() => {
    const fetchLearnerQuiz = async () => {
      try {
        const data = await getAssignedLearners(quizId)
        setData(data)
      }  catch (e) {
        console.log("🚀 ~ fetchLeaners ~ e:", e)
      } finally {
        setLoading(false)
      }      
    }

    fetchLearnerQuiz()
  }, [quizId])
  
  return (
    <div>
      <ActionsWrapper>
        <Button 
          type="primary"
          text={t('learners.assign_dialog.assign_button')}
          color={theme.colors.green7}
          leftIcon={(
            <IoPersonAdd
              size={20}
              color="white" 
            />
          )}
          onClick={() => { 
            setAssignLayover(true) 
            window.scrollTo(0,0)
          }}
        />
      </ActionsWrapper>
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
      { showAssignLayover && (
        <AssignLearnersLayover 
          title={t('learners.assign_dialog.assign_title', { quiz_title: quizTitle })}
          quizId={quizId}
          onExit={() => { setAssignLayover(false) }}
        />
      )}
    </div>
  )
}

const UnassignAction = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`

const ActionsWrapper = styled.div`
  display: flex;
  padding: 12px 0;
`