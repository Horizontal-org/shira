import { FunctionComponent } from "react";
import { BasePagination } from "../BasePagination";

interface Props {
  pageIndex: number
  pageCount: number
  pageSize?: number
  total: number
  onFirstPage: () => void
  onPreviousPage: () => void
  onNextPage: () => void
  onLastPage: () => void
}

const DEFAULT_PAGE_SIZE = 10;

export const CardPagination: FunctionComponent<Props> = ({
  pageIndex,
  pageCount,
  pageSize = DEFAULT_PAGE_SIZE,
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
      pageSize={pageSize}
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
