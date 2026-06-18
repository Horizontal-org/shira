import { SortSelect, styled } from "@horizontal-org/shira-ui";

type SortOption<T extends string> = {
  value: T;
  label: string;
};

type Props<T extends string> = {
  value: T;
  options: SortOption<T>[];
  label: string;
  onChange: (value: T) => void;
};

export const LibrarySortSelect = <T extends string,>({
  value,
  options,
  label,
  onChange,
}: Props<T>) => {
  return (
    <StyledSortSelect
      value={value}
      options={options}
      prefix={`${label}:`}
      ariaLabel={label}
      onChange={(nextValue) => onChange(nextValue as T)}
    />
  );
};

const StyledSortSelect = styled(SortSelect)`
  min-width: 280px;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    flex: 1;
    min-width: 0;
  }
`;
