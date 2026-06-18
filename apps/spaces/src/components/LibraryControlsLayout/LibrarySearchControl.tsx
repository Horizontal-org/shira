import { LibrarySearchInput, styled } from "@horizontal-org/shira-ui";
import { FunctionComponent } from "react";

type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
};

export const LibrarySearchControl: FunctionComponent<Props> = ({
  value,
  onChange,
  placeholder,
}) => {
  return (
    <SearchColumn>
      <LibrarySearchInput
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </SearchColumn>
  );
};

const SearchColumn = styled.div`
  flex: 1 1 auto;
  min-width: 0;
  max-width: 628px;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    width: 100%;
    max-width: none;
    min-width: 0;
  }
`;
