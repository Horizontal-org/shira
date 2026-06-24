import { Body4, FilterSelect, defaultTheme, styled, type FilterSelectProps } from "@horizontal-org/shira-ui";
import { FiX } from "react-icons/fi";
import { MdFilterAlt } from "react-icons/md";

export type TemplateFilterOption = {
  value: string;
  label: string;
};

export const TemplateFiltersIcon = () => (
  <TemplateFiltersIconWrapper>
    <MdFilterAlt size={20} color={defaultTheme.colors.dark.mediumGrey} />
  </TemplateFiltersIconWrapper>
);

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

export const TemplateFilterSelect = styled(FilterSelect) <FilterSelectProps>`
  max-width: 400px;

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

const TemplateFiltersIconWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
`;