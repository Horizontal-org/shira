import { ComponentProps, Dispatch, FunctionComponent, SetStateAction } from "react";
import { CardPagination, Table, defaultTheme, styled } from "@horizontal-org/shira-ui";
import { ColumnDef, RowSelectionState } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";
import { LibrarySearchEmptyState } from "../../LibrarySearchEmptyState";
import { RowType } from "./Columns";

type Props = {
  hasActiveSearch: boolean;
  total: number;
  searchTerm: string;
  shouldShowPagination: boolean;
  paginationProps: ComponentProps<typeof CardPagination>;
  showEmptyState: boolean;
  loading: boolean;
  rows: RowType[];
  columns: ColumnDef<RowType>[];
  rowSelection: RowSelectionState;
  setRowSelection: Dispatch<SetStateAction<RowSelectionState>>;
};

export const QuestionTemplateResults: FunctionComponent<Props> = ({
  hasActiveSearch,
  total,
  searchTerm,
  shouldShowPagination,
  paginationProps,
  showEmptyState,
  loading,
  rows,
  columns,
  rowSelection,
  setRowSelection,
}) => {
  const { t } = useTranslation();

  return (
    <>
      {hasActiveSearch && (
        <SearchResultsText>
          {t(
            total === 1
              ? "question_library.search_results"
              : "question_library.search_results_plural",
            {
              count: total,
              searchTerm,
            },
          )}
        </SearchResultsText>
      )}

      {shouldShowPagination && (
        <PaginationWrapper>
          <CardPagination {...paginationProps} />
        </PaginationWrapper>
      )}

      {showEmptyState ? (
        <LibrarySearchEmptyState
          title={t("library.empty_search.title")}
          subtitle={t("library.empty_search.subtitle")}
        />
      ) : (
        <TableWrapper>
          <Table
            size="full"
            loading={loading}
            loadingMessage={t("loading_messages.loading_library_questions")}
            emptyMessage={t("success_messages.no_questions_found")}
            data={rows}
            columns={columns}
            rowSelection={rowSelection}
            setRowSelection={setRowSelection}
            enableRowSelection={false}
            enablePagination={false}
            colGroups={
              <colgroup>
                <col style={{ width: "4%" }} />
                <col style={{ width: "24%" }} />
                <col style={{ width: "10%" }} />
                <col style={{ width: "10%" }} />
                <col style={{ width: "11%" }} />
                <col style={{ width: "12%" }} />
                <col style={{ width: "14%" }} />
                <col style={{ width: "10%" }} />
              </colgroup>
            }
          />
        </TableWrapper>
      )}
    </>
  );
};

const SearchResultsText = styled.p`
  margin: 0;
  padding: 0 4px;
  font-size: 14px;
  line-height: 1.4;
  color: ${defaultTheme.colors.dark.mediumGrey};
`;

const PaginationWrapper = styled.div`
  padding: 0 16px;
`;

const TableWrapper = styled("div")`
  overflow: visible;

  & table td {
    padding: 13px 16px;
  }

  & table th {
    padding-bottom: 10px;
    font-size: 14px;
  }

  & table tbody tr:hover td {
    background: ${defaultTheme.colors.light.white};
  }
`;
