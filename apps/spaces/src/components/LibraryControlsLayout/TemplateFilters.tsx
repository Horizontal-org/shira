import { Body4, FilterSelect, defaultTheme, styled, type FilterSelectProps } from "@horizontal-org/shira-ui";
import { ReactNode } from "react";
import { HiFunnel } from "react-icons/hi2";
import { FiX } from "react-icons/fi";

export type TemplateFilterOption = {
  value: string;
  label: string;
};

type TemplateFiltersLayoutProps = {
  children: ReactNode;
  hasActiveFilters: boolean;
  clearAllLabel: string;
  onClearAll: () => void;
};

export const getTemplateMultiSelectedLabel = (
  options: TemplateFilterOption[],
  selectedValues: string[],
  selectedCountLabel: string,
) => {
  if (selectedValues.length === 0) {
    return;
  }

  if (selectedValues.length === 1) {
    return options
      .find((option) => option.value === selectedValues[0])?.label ?? selectedValues[0];
  }

  return selectedCountLabel;
};

export const TemplateFiltersLayout = ({
  children,
  hasActiveFilters,
  clearAllLabel,
  onClearAll,
}: TemplateFiltersLayoutProps) => {
  return (
    <FiltersRow>
      <FiltersIcon>
        <HiFunnel size={18} color={defaultTheme.colors.dark.mediumGrey} />
      </FiltersIcon>

      {children}

      {hasActiveFilters && (
        <ClearAllButton onClick={onClearAll}>
          <FiX size={16} />
          <Body4>{clearAllLabel}</Body4>
        </ClearAllButton>
      )}
    </FiltersRow>
  );
};

export const TemplateFilterSelect = styled(FilterSelect)<FilterSelectProps>`
  min-width: 160px;
  max-width: 200px;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    flex: 1 1 100%;
    max-width: none;
  }
`;

const FiltersRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: 10px;
  width: fit-content;
  max-width: 100%;
  margin-left: auto;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    width: 100%;
    margin-left: 0;
  }
`;

const FiltersIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
`;

const ClearAllButton = styled.button`
  -webkit-appearance: none;
  min-height: 30px;
  padding: 0 10px;
  border-radius: 6px;
  border: 1px solid ${(props) => props.theme.colors.dark.darkGrey};
  background: transparent;
  color: ${(props) => props.theme.colors.dark.darkGrey};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
`;
