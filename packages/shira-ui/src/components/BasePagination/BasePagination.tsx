import { FunctionComponent } from "react";
import { darken } from "polished";
import { FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from "react-icons/fi";
import { Trans, useTranslation } from "react-i18next";
import styled, { useTheme } from "styled-components";
import { Body2SemiBold, Body3 } from "../Typography";

interface BasePaginationProps {
  pageIndex: number
  pageCount: number
  pageSize: number
  total: number
  canPreviousPage: boolean
  canNextPage: boolean
  onFirstPage: () => void
  onPreviousPage: () => void
  onNextPage: () => void
  onLastPage: () => void
}

export const BasePagination: FunctionComponent<BasePaginationProps> = ({
  pageIndex,
  pageCount,
  pageSize,
  total,
  canPreviousPage,
  canNextPage,
  onFirstPage,
  onPreviousPage,
  onNextPage,
  onLastPage,
}) => {
  const theme = useTheme();
  const { t } = useTranslation("shira-ui");
  const offSetPageIndex = pageIndex + 1;

  const start = total === 0 ? 0 : pageIndex * pageSize + 1;
  const end = Math.min((pageIndex + 1) * pageSize, total);

  return (
    <PaginationWrapper>
      <PaginationSummary>
        {t("pagination.summary", { start, end, total })}
      </PaginationSummary>
      <PaginationButtons>
        <PaginationButton
          type="button"
          disabled={!canPreviousPage}
          onClick={onFirstPage}
        >
          <FiChevronsLeft size={16} color={theme.colors.dark.darkGrey} data-mirror-rtl />
          <Body3>{t("pagination.first")}</Body3>
        </PaginationButton>
        <PaginationButton
          type="button"
          disabled={!canPreviousPage}
          onClick={onPreviousPage}
        >
          <FiChevronLeft size={16} color={theme.colors.dark.darkGrey} data-mirror-rtl />
          <Body3>{t("pagination.back")}</Body3>
        </PaginationButton>

        <PaginationNavButton>
          <Trans
            i18nKey="pagination.page"
            ns="shira-ui"
            values={{ current: offSetPageIndex, total: pageCount }}
            components={{ current: <StyledBody2Bold /> }}
          />
        </PaginationNavButton>

        <PaginationButton
          type="button"
          disabled={!canNextPage}
          onClick={onNextPage}
        >
          <Body3>{t("pagination.next")}</Body3>
          <FiChevronRight size={16} color={theme.colors.dark.darkGrey} data-mirror-rtl />
        </PaginationButton>
        <PaginationButton
          type="button"
          disabled={!canNextPage}
          onClick={onLastPage}
        >
          <Body3>{t("pagination.last")}</Body3>
          <FiChevronsRight size={16} color={theme.colors.dark.darkGrey} data-mirror-rtl />
        </PaginationButton>
      </PaginationButtons>
    </PaginationWrapper>
  );
};

const StyledBody2Bold = styled(Body2SemiBold)`
  color: ${props => props.theme.colors.dark.darkGrey};
  font-weight: 700;
`;

const StyledBody2SemiBold = styled(Body2SemiBold)`
  color: ${props => props.theme.colors.dark.darkGrey};
`;

const PaginationSummary = styled(StyledBody2SemiBold)`
  min-width: 12ch;
  white-space: nowrap;
  font-variant-numeric: tabular-nums;
`;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  width: 100%;
  margin: 0;
`;

const PaginationButton = styled.button<{
  disabled: boolean
}>`
  all: unset;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 6px 10px;
  color: ${props => props.theme.colors.dark.darkGrey};
  border-radius: 4px;
  border: 2px solid white;
  background: white;
  gap: 8px;

  ${({ disabled }) => disabled && `
    opacity: 0.5;
    cursor: not-allowed;
  `}

  ${({ disabled, theme }) => !disabled && `
    &:hover {
      background: ${darken(0.1, "white")};
      border-color: ${darken(0.1, "white")};
      color: ${theme.colors.dark.black};
    }
    &:active {
      background: white;
      border-color: ${theme.colors.green4};
      color: ${theme.colors.dark.black};
    }
  `}
`;

const PaginationButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const PaginationNavButton = styled(PaginationButtons)`
  display: flex;
  align-items: center;
  gap: 4px;
  min-width: 6ch;
  justify-content: center;
  white-space: nowrap;
  font-variant-numeric: tabular-nums;
`;
