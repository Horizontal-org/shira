import { FunctionComponent } from "react";
import { BasePagination } from "../BasePagination";

interface Props {
  pageIndex: number
  pageCount: number
  total: number
  onFirstPage: () => void
  onPreviousPage: () => void
  onNextPage: () => void
  onLastPage: () => void
}

const PAGE_SIZE = 10;

export const CardPagination: FunctionComponent<Props> = ({
  pageIndex,
  pageCount,
  total,
  onFirstPage,
  onPreviousPage,
  onNextPage,
  onLastPage,
}) => {
  const canPreviousPage = pageIndex > 0;
  const canNextPage = pageIndex < pageCount - 1;

  return (
    <BasePagination
      pageIndex={pageIndex}
      pageCount={pageCount}
      pageSize={PAGE_SIZE}
      total={total}
      canPreviousPage={canPreviousPage}
      canNextPage={canNextPage}
      onFirstPage={onFirstPage}
      onPreviousPage={onPreviousPage}
      onNextPage={onNextPage}
      onLastPage={onLastPage}
    />
  );
};
