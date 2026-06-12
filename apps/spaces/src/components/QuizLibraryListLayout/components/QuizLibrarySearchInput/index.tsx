import { FunctionComponent } from "react";
import { LibrarySearchInput, styled } from "@horizontal-org/shira-ui";
import { useTranslation } from "react-i18next";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export const QuizLibrarySearchInput: FunctionComponent<Props> = ({
  value,
  onChange,
}) => {
  const { t } = useTranslation();

  return (
    <SearchColumn>
      <LibrarySearchInput
        value={value}
        onChange={onChange}
        placeholder={t("quiz_library.search_placeholder")}
      />
    </SearchColumn>
  );
};

const SearchColumn = styled.div`
  flex: 1 1 auto;
  min-width: 0;
  max-width: 628px;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    width: 100%;
    max-width: none;
  }
`;
