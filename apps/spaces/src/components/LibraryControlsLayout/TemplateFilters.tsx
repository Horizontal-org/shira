import { Body4, FilterSelect, defaultTheme, styled, type FilterSelectProps } from "@horizontal-org/shira-ui";
import { HiFunnel } from "react-icons/hi2";
import { FiX } from "react-icons/fi";

export type TemplateFilterOption = {
  value: string;
  label: string;
};

export const getTemplateMultiSelectedLabel = (
  options: TemplateFilterOption[],
  selectedValues: string[],
  selectedCountLabel: string,
) => {
  if (selectedValues.length === 1) {
    return options
      .find((option) => option.value === selectedValues[0])?.label ?? selectedValues[0];
  }

  return selectedCountLabel;
};

export const TemplateFilterSelect = styled(FilterSelect)<FilterSelectProps>`
  min-width: 160px;
  max-width: 200px;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    flex: 1 1 100%;
    max-width: none;
  }
`;

export const TemplateFilters = styled.div`
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

export const TemplateFiltersIcon = () => (
  <TemplateFiltersIconWrapper>
    <HiFunnel size={18} color={defaultTheme.colors.dark.mediumGrey} />
  </TemplateFiltersIconWrapper>
);

const TemplateFiltersIconWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
`;

export const TemplateFiltersClearAllButton = ({
  clearAllLabel,
  onClick,
}: {
  clearAllLabel: string;
  onClick: () => void;
}) => (
  <TemplateFiltersClearAllButtonBase onClick={onClick}>
    <FiX size={16} />
    <Body4>{clearAllLabel}</Body4>
  </TemplateFiltersClearAllButtonBase>
);

const TemplateFiltersClearAllButtonBase = styled.button`
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
