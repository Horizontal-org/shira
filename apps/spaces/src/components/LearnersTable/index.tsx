import { Body3, Body3Bold, styled, Table, TableActions, TableCheckbox } from "@shira/ui";
import { ColumnDef } from "@tanstack/react-table";
import axios from "axios";
import { FunctionComponent, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { getCurrentDateFNSLocales } from "../../language/dateUtils";
import { enUS } from "date-fns/locale";
import { format } from "date-fns";
import { GoPersonFill } from "react-icons/go";
import { StatusTag } from "./components/StatusTag";

interface Props {}

export const LearnersTable:FunctionComponent<Props> = () => {
  const { t, i18n } = useTranslation()

  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])
  //Key of row selection is DB ID of learner
  const [rowSelection, setRowSelection] = useState({})
  console.log("🚀 ~ LearnersTable ~ rowSelection:", rowSelection)

  const currentDateLocal = useMemo(() => {
    const dateLocales = getCurrentDateFNSLocales()
    return dateLocales[i18n.language] ?? enUS;    
  }, [i18n])

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
            <GoPersonFill size={18} color="#5F6368" />
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
        cell: info => (<StatusTag status={info.getValue() as string} />)
      },
      {
        header: t('learners.table.invited_at'),
        accessorKey: 'invitedAt',
        accessorFn: (r) => r.invitedAt,
        cell: (info) => {
          return format(info.getValue() as string, 'd MMMM y', { locale: currentDateLocal })
        }
      },
      {
        id: 'actions',
        cell: ({row}) => {
          return (
            <TableActions 
              onDelete={() => { console.log('ON DELETE => ', row)}}
              onResend={() => { console.log('ON RESEND => ', row)}}
            />
          )
        }
      }
    ],
    [currentDateLocal, t]
  )

  useEffect(() => {
     //move when merge
    const fetchLearners = async() => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/learners`)
        setData(res.data)
      } catch (e) {
        console.log("🚀 ~ fetchLeaners ~ e:", e)
      } finally {
        setLoading(false)
      }
    }

    fetchLearners()
  }, [])



  return (
    <Wrapper>
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
            <col />
            <col style={{ width: "80px" }} />
          </colgroup>
        )}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  max-width: 1024px;
`

const LearnerPersonInfo = styled.div`
  color: ${props => props.theme.colors.dark.darkGrey};
`

const LearnerName = styled(Body3Bold)`
  margin: 0;
  font-weight: 700;
`

const LearnerEmail = styled(Body3)`
  font-size: 14px;
`

const LearnerHeader = styled.div`
  display: flex;
  align-items: center;
  > svg {
    margin-right: 8px; 
  }
`