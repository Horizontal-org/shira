import { Button, EmptyState, styled, Table, TableActions, TableCheckbox, useTheme } from "@shira/ui";
import { ColumnDef, RowSelectionState } from "@tanstack/react-table";
import { FunctionComponent, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { getCurrentDateFNSLocales } from "../../language/dateUtils";
import { enUS } from "date-fns/locale";
import { format } from "date-fns";
import { GoPersonFill } from "react-icons/go";
import { StatusTag } from "./components/StatusTag";
import { LearnerEmail, LearnerHeader, LearnerName, LearnerPersonInfo } from "./components/LearnerHeader";
import { MdEmail } from "react-icons/md";

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
  onInviteLearner: () => void;

  rowSelection: RowSelectionState;
  setRowSelection: (updater: RowSelectionState | ((prev: RowSelectionState) => RowSelectionState)) => void;
}

export const LearnersTable: FunctionComponent<Props> = ({
  data,
  loading,
  onDeleteLearner,
  onResendInvitation,
  onInviteLearner,
  rowSelection,
  setRowSelection,
}) => {
  const { t, i18n } = useTranslation();
  const theme = useTheme();

  const currentDateLocal = useMemo(() => {
    const dateLocales = getCurrentDateFNSLocales();
    return dateLocales[i18n.language] ?? enUS;
  }, [i18n]);

  const columns = useMemo<ColumnDef<Learner>[]>(
    () => [
      {
        id: 'select',
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
            <LearnerHeader>
              <GoPersonFill size={18} color={theme.colors.dark.darkGrey} />
              <span>{t("learners.table.learner")}</span>
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
        cell: (info) => {
          return format(info.getValue() as string, 'd MMMM y', { locale: currentDateLocal })
        },
      },
      {
        id: 'actions',
        cell: ({ row }) => {
          const learner = row.original;
          return (
            <TableActions
              showDelete={true}
              onDelete={() => onDeleteLearner(learner.id)}
              showResend={learner.status !== 'registered'}
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
      {data.length === 0 && !loading ? (
        <EmptyState
          subtitle={t("learners.empty_state")}
          buttons={[
            <Button
              id="invite-learner-button"
              type="primary"
              text={t("buttons.invite_learner")}
              leftIcon={<MdEmail />}
              color={theme.colors.green7}
              onClick={onInviteLearner}
            />
          ]}
        />
      ) : (
        <Table
          loading={loading}
          loadingMessage={t('loading_messages.learners')}
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
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
      max-width: ${props => props.theme.breakpoints.lg};
      padding: 16px;
      box-sizing: border-box;
      `;
