import { Body3, Body3Bold, styled, Table, TableActions, TableCheckbox, useTheme } from "@shira/ui";
import { ColumnDef } from "@tanstack/react-table";
import { FunctionComponent, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { getCurrentDateFNSLocales } from "../../language/dateUtils";
import { enUS } from "date-fns/locale";
import { format } from "date-fns";
import { GoPersonFill } from "react-icons/go";
import { StatusTag } from "./components/StatusTag";

export type Learner = {
  id: number;
  name: string;
  email: string;
  status: string;
  invitedAt: string;
};

interface Props {
  data: Learner[];
  loading: boolean;
  onDeleteLearner: (learnerId: number) => void;
  onResendInvitation: (learner: Learner) => void;
}

export const LearnersTable: FunctionComponent<Props> = ({
  data,
  loading,
  onDeleteLearner,
  onResendInvitation,
}) => {
  const { t, i18n } = useTranslation()
  const theme = useTheme()
  //Key of row selection is DB ID of learner
  const [rowSelection, setRowSelection] = useState({})
  console.log("🚀 ~ LearnersTable ~ rowSelection:", rowSelection)

  const currentDateLocal = useMemo(() => {
    const dateLocales = getCurrentDateFNSLocales()
    return dateLocales[i18n.language] ?? enUS;
  }, [i18n]);

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
        id: "actions",
        cell: ({ row }) => {
          const learner = row.original;

          return (
            <TableActions
              onDelete={() => onDeleteLearner(learner.id)}
              onResend={() => onResendInvitation(learner)}
            />
          );
        },
      },
    ],
    [currentDateLocal, t, theme, onDeleteLearner, onResendInvitation]
  );

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
  max-width: ${props => props.theme.breakpoints.lg};
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
