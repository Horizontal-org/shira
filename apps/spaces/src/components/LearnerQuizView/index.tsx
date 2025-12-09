import { styled, Table, TableCheckbox, useTheme } from "@shira/ui";
import { ColumnDef } from "@tanstack/react-table";
import axios from "axios"
import { FunctionComponent, useEffect, useMemo, useState } from "react"
import { useTranslation } from "react-i18next";
import { GoPersonFill } from "react-icons/go";
import { LearnerEmail, LearnerHeader, LearnerName, LearnerPersonInfo } from "../LearnersTable/components/LearnerHeader";
import { QuizStatusTag } from "./components/QuizStatusTag";
import { IoPersonRemoveSharp } from "react-icons/io5";

interface Props {
  quizId: number
}

export const LearnerQuizView:FunctionComponent<Props> = ({quizId}) => {
  const { t } = useTranslation()
  const theme = useTheme()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])
  
  //Key of row selection is DB ID of learner
  const [rowSelection, setRowSelection] = useState({})
  console.log("🚀 ~ LearnersTable ~ rowSelection:", rowSelection)

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
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/learner-quiz/assignments/${quizId}`)
        console.log("🚀 ~ fetchLearnerQuiz ~ res:", res)
        setData(res.data)
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
    </div>
  )
}

const UnassignAction = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`