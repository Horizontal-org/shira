import { Body3, Body3Bold, styled, Table, TableActions, TableCheckbox, useTheme } from "@shira/ui";
import { ColumnDef, RowSelectionState } from "@tanstack/react-table";
import { FunctionComponent, useMemo } from "react";
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

  rowSelection: RowSelectionState;
  setRowSelection: (updater: | RowSelectionState | ((prev: RowSelectionState) => RowSelectionState)) => void;
}

export const LearnersTable: FunctionComponent<Props> = ({
  data,
  loading,
  onDeleteLearner,
  onResendInvitation,
  rowSelection,
  setRowSelection,
}) => {
  const { t, i18n } = useTranslation();
  const theme = useTheme();

  const currentDateLocal = useMemo(() => {
    const locales = getCurrentDateFNSLocales();
    return locales[i18n.language] ?? enUS;
  }, [i18n]);

  const columns = useMemo<ColumnDef<Learner>[]>(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <TableCheckbox
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: () => table.toggleAllRowsSelected(!table.getIsAllRowsSelected()),
              isTDCheckbox: false
            }}
          />
        ),
        cell: ({ row }) => (
          <TableCheckbox
            {...{
              checked: row.getIsSelected(),
              indeterminate: row.getIsSomeSelected(),
              disabled: !row.getCanSelect(),
              onChange: () => row.toggleSelected(!row.getIsSelected()),
              isTDCheckbox: true
            }}
          />
        ),
      },
      {
        header: () => {
          return (
            <HeaderCell>
              <GoPersonFill size={18} color={theme.colors.dark.darkGrey} />
              <span>{t("learners.table.learner")}</span>
            </HeaderCell>
          )
        },
        id: "learner",
        cell: ({ row }) => {
          return (
            <LearnerInfo>
              <LearnerName>{row.original.name}</LearnerName>
              <LearnerEmail>{row.original.email}</LearnerEmail>
            </LearnerInfo>
          )
        },
      },
      {
        header: t("learners.table.registration"),
        accessorKey: "status",
        cell: (info) => <StatusTag status={info.getValue() as string} />,
      },
      {
        header: t("learners.table.invited_at"),
        accessorKey: "invitedAt",
        cell: (info) => {
          return format(info.getValue() as string, 'd MMMM y', { locale: currentDateLocal })
        },
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
    [currentDateLocal, onDeleteLearner, onResendInvitation, t, theme]
  );

  return (
    <Wrapper>
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
            <col />
            <col style={{ width: "80px" }} />
          </colgroup>
        }
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  max-width: ${(p) => p.theme.breakpoints.lg};
`;

const LearnerInfo = styled.div`
  color: ${(p) => p.theme.colors.dark.darkGrey};
`;

const LearnerName = styled(Body3Bold)`
  margin: 0;
`;

const LearnerEmail = styled(Body3)`
  font-size: 14px;
`;

const HeaderCell = styled.div`
  display: flex;
  align-items: center;
  > svg {
    margin-right: 8px;
  }
`;
