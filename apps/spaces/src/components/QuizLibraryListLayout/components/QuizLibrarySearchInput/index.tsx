import { FunctionComponent } from "react";
import { TextInput, Button, defaultTheme, styled } from "@shira/ui";
import { useTranslation } from "react-i18next";
import { FiChevronDown } from "react-icons/fi";
import { FiSearch } from "react-icons/fi";
import { HiFunnel } from "react-icons/hi2";

type Props = {};

export const QuizLibrarySearchInput: FunctionComponent<Props> = ({ }) => {
  const { t } = useTranslation();

  return (
    <Controls>
      <TopRow>
        <SearchColumn>
          <SearchInputWrap>
            <SearchIcon aria-hidden="true">
              <FiSearch size={18} />
            </SearchIcon>
            <TextInput
              onChange={() => { }}
              value=""
              placeholder="Search quiz titles"
            />
          </SearchInputWrap>
        </SearchColumn>

        <ActionsGroup>
          <SortByButton
            text={t("quiz_library.sort_by")}
            type="outline"
            rightIcon={<FiChevronDown size={20} />}
          />

          <FilterButton
            text={t("quiz_library.filters")}
            type="outline"
            leftIcon={<HiFunnel size={20} color={defaultTheme.colors.dark.darkGrey} />}
          />
        </ActionsGroup>
      </TopRow>
    </Controls>
  );
};

const Controls = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const TopRow = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const SearchColumn = styled.div`
  flex: 0.75;
  min-width: 0;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    width: 100%;
  }
`;

const ActionsGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 24px;
  margin-left: auto;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    width: 100%;
    margin-left: 0;
    flex-direction: column;
    gap: 16px;
  }
`;

const SearchInputWrap = styled.div`
  position: relative;

  & input {
    padding-left: 44px;
    border-width: 1px;
    border-color: ${defaultTheme.colors.green4};
    border-radius: 18px;
    background: ${defaultTheme.colors.light.white};
  }

  & input:focus:not(:disabled) {
    box-shadow: 0 0 0 1px ${defaultTheme.colors.green4};
    background: ${defaultTheme.colors.light.white};
  }

  & input:hover:not(:disabled) {
    background: ${defaultTheme.colors.light.white};
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: ${defaultTheme.colors.dark.darkGrey};
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  z-index: 1;
`;

const SortByButton = styled(Button)`
  min-width: 220px;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    width: 100%;
  }
`;

const FilterButton = styled(Button)`
  min-width: 144px;
  justify-content: center;
  gap: 2px;
  padding: 12px 22px;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    width: 100%;
  }
`;
