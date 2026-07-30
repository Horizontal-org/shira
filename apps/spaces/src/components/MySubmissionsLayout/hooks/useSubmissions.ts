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
  const emptyResult: SubmissionsPageDto<T> = {
    data: [],
    total: 0,
    page: 1,
    limit: DEFAULT_PAGE_LIMIT,
  };
  const [result, setResult] = useState<SubmissionsPageDto<T>>(emptyResult);

  useEffect(() => {
    if (!spaceId) {
      setResult(emptyResult);
      return;
    }

    fetchSubmissions(spaceId, { page: pageIndex + 1 })
      .then((nextResult) => {
        setResult(nextResult);
      })
      .catch((error) => {
        console.error("Failed to fetch submissions:", error);
        setResult(emptyResult);
      });
  }, [fetchSubmissions, pageIndex, spaceId]);

  return {
    submissions: result.data,
    total: result.total,
    page: result.page,
    limit: result.limit,
    pageCount: Math.max(1, Math.ceil(result.total / result.limit)),
  };
};
