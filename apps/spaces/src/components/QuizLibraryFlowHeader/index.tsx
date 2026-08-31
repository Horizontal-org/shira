import { FunctionComponent } from "react";
import { styled, Logo, Body2Regular, defaultTheme } from "@horizontal-org/shira-ui";
import { IoClose } from "react-icons/io5";
import { useTranslation } from "react-i18next";

interface Props {
  onExit: () => void;
}

export const QuizLibraryFlowHeader: FunctionComponent<Props> = ({ onExit }) => {
  const { t } = useTranslation();

  return (
    <Wrapper>
      <Left>
        <LogoWrapper>
          <Logo />
        </LogoWrapper>
        <CloseWrapper onClick={onExit}>
          <IoClose color={`${defaultTheme.colors.dark.darkGrey}`} size={24} />
        </CloseWrapper>
        <Body2Regular>{t("quiz_library.header_title")}</Body2Regular>
      </Left>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  background: white;
  height: 72px;
  max-height: 72px;
  min-height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LogoWrapper = styled.div`
  padding: 0 24px;
  border-inline-end: 1px solid ${props => props.theme.colors.dark.mediumGrey};
`;

const CloseWrapper = styled.div`
  padding: 0 8px;
  margin: 0 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
`;
