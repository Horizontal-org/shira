import { Body1, styled, Table, TableActions, TableCheckbox, useTheme } from "@shira/ui";
import { ColumnDef, RowSelectionState } from "@tanstack/react-table";
import { FunctionComponent, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { enUS } from "date-fns/locale";
import { format } from "date-fns";
import { GoPersonFill } from "react-icons/go";
import { getCurrentDateFNSLocales } from "../../../../language/dateUtils";
import { LearnerEmail, LearnerHeader, LearnerName, LearnerPersonInfo } from "../../../LearnersTable/components/LearnerHeader";
import HookedFish from '../../../../assets/HookedFish.svg';

export type Learner = {
  id: number;
  name: string;
  email: string;
  invitedAt: string;
};

interface Props {
  data: Learner[];
  loading: boolean;
  rowSelection: RowSelectionState;
  setRowSelection: (updater: | RowSelectionState | ((prev: RowSelectionState) => RowSelectionState)) => void;
}

export const AssignLearnersTable: FunctionComponent<Props> = ({
  data,
  loading,
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
        header: t('learners.table.invited_at'),
        accessorKey: 'invitedAt',
        cell: (info) => {
          return format(info.getValue() as string, 'd MMMM y', { locale: currentDateLocal })
        },
      }
    ],
    [currentDateLocal, t, theme]
  );

  return (
    <Wrapper>
      {!loading && data.length > 0 && (
        <Table
          loading={loading}
          data={data}
          columns={columns}
          rowSelection={rowSelection}
          setRowSelection={setRowSelection}
          colGroups={(
            <colgroup>
              <col style={{ width: "50px" }} />
              <col style={{ width: "70%" }} />
              <col />
            </colgroup>
          )}
        />
      )}

      {!loading && data.length === 0 && (
        <NoResultsWrapper>
          <img src={HookedFish} alt="hooked-fish" />
          <Body1>{t('learners.assign_dialog.no_learners')}</Body1>
        </NoResultsWrapper>
      )}

    </Wrapper>
  );
};

const Wrapper = styled.div`
  max-width: ${props => props.theme.breakpoints.md};
  padding: 16px 0;
  box-sizing: border-box;
`

const NoResultsWrapper = styled.div`
  padding: 32px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  background: white;
  border-radius: 32px;
  text-align: center;
  color: ${props => props.theme.colors.dark.grey};

  > img {
    width: 280px;
    height: auto;
  }
`