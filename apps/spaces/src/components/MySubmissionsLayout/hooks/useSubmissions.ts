import { useEffect, useState } from "react";
import {
  DEFAULT_PAGE_LIMIT,
  type SubmissionsPageDto,
} from "../../../fetch/submissions";

type FetchSubmissions<T> = (
  spaceId: string,
  params: { page: number },
) => Promise<SubmissionsPageDto<T>>;

export const useSubmissions = <T>(
  spaceId: string | undefined,
  pageIndex: number,
  fetchSubmissions: FetchSubmissions<T>,
) => {
  const [submissions, setSubmissions] = useState<T[]>([]);
  const [total, setTotal] = useState(0);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_LIMIT);

  useEffect(() => {
    if (!spaceId) {
      setSubmissions([]);
      setTotal(0);
      setPageSize(DEFAULT_PAGE_LIMIT);
      return;
    }

    fetchSubmissions(spaceId, { page: pageIndex + 1 })
      .then(({ data, total, limit }) => {
        setSubmissions(data);
        setTotal(total);
        setPageSize(limit);
      })
      .catch((error) => {
        console.error("Failed to fetch submissions:", error);
        setSubmissions([]);
        setTotal(0);
        setPageSize(DEFAULT_PAGE_LIMIT);
      });
  }, [fetchSubmissions, pageIndex, spaceId]);

  return {
    submissions,
    total,
    pageSize,
    pageCount: Math.max(1, Math.ceil(total / pageSize)),
  };
};
