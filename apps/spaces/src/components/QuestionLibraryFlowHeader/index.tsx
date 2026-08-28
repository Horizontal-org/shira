import { FunctionComponent } from "react"
import { styled, Logo, Body2Regular, CloseButton } from "@horizontal-org/shira-ui"
import { useTranslation } from "react-i18next";

interface Props {
  onExit: () => void;
}

export const QuestionLibraryFlowHeader: FunctionComponent<Props> = ({ onExit }) => {
  const { t } = useTranslation();

  return (
    <Wrapper>
      <Left>
        <LogoWrapper>
          <Logo />
        </LogoWrapper>
        <CloseButton onClick={onExit} />
        <Body2Regular>{t('question_library.tab_header_title')}</Body2Regular>
      </Left>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  background: ${(props) => props.theme.colors.light.white};
  height: 72px;
  max-height: 72px;
  min-height: 72px;

  display: flex;
  align-items: center;
  justify-content: space-between;
`

const LogoWrapper = styled.div`
  padding: 0 24px;
  border-inline-end: 1px solid ${props => props.theme.colors.dark.mediumGrey};
`

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`
