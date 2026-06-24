import type { Dispatch, SetStateAction } from "react";

type Params = {
  pageIndex: number;
  pageCount: number;
  pageSize: number;
  total: number;
  setPageIndex: Dispatch<SetStateAction<number>>;
};

export const usePaginationProps = ({
  pageIndex,
  pageCount,
  pageSize,
  total,
  setPageIndex,
}: Params) => ({
  pageIndex,
  total,
  pageCount,
  pageSize,
  onFirstPage: () => setPageIndex(0),
  onPreviousPage: () => setPageIndex((prev) => Math.max(0, prev - 1)),
  onNextPage: () => setPageIndex((prev) => Math.min(pageCount - 1, prev + 1)),
  onLastPage: () => setPageIndex(pageCount - 1),
});
