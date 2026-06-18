import { FunctionComponent, useState } from "react"
import {
  styled,
  Logo,
  Body2Regular,
  Button,
  CloseButton,
  GeneralTooltip,
  defaultTheme
} from "@horizontal-org/shira-ui"
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { QuestionCRUDFeedback } from "../../fetch/question";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

interface Props {
  onNext: () => void
  onBack: () => void
  onExit: () => void
  step: number
  disableNext: boolean
  nextTooltipLabel?: string
  actionFeedback: string;
}

export const QuestionFlowHeader: FunctionComponent<Props> = ({
  onNext,
  onBack,
  onExit,
  disableNext,
  step,
  nextTooltipLabel,
  actionFeedback
}) => {

  const { t } = useTranslation();
  const { questionId } = useParams();

  const [showNextTooltip, setShowNextTooltip] = useState(false);

  const isEditFlow = Boolean(questionId);

  return (
    <Wrapper id="question-flow-header">
      <Left>
        <LogoWrapper>
          <Logo />
        </LogoWrapper>

        <StyledCloseButton
          aria-label={t('buttons.close')}
          iconSize={24}
          id="question-flow-header-close"
          onClick={onExit}
          size={24}
        />

        <Body2Regular>{
          isEditFlow ? t('questions.edit.tab_header') : t('create_question.header_title')}
        </Body2Regular>
      </Left>

      <Right>
        <Button
          id="question-flow-header-back"
          leftIcon={<FiChevronLeft size={16} />}
          onClick={onBack}
          text={t('buttons.back')}
          type="outline"
        />

        <GeneralTooltip
          enabled={disableNext}
          show={showNextTooltip}
          setShow={setShowNextTooltip}
          label={nextTooltipLabel ?? t('create_question.header_required_tooltip')}
        >
          <Button
            id="question-flow-header-next"
            color={defaultTheme.colors.green7}
            rightIcon={<FiChevronRight size={16} />}
            disabled={disableNext || actionFeedback === QuestionCRUDFeedback.processing}
            onClick={onNext}
            text={step === 2
              ? (actionFeedback === QuestionCRUDFeedback.processing
                ? t('loading_messages.saving')
                : t('buttons.save'))
              : t('buttons.next')}
            type="primary"
          />
        </GeneralTooltip>
      </Right>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  background: white;
  height: 72px;
  max-height: 72px;
  min-height: 72px;
  
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const LogoWrapper = styled.div`
  padding: 0 24px;
  border-right: 1px solid ${props => props.theme.colors.dark.mediumGrey};
`

const StyledCloseButton = styled(CloseButton)`
  margin: 0 20px;
`

const Left = styled.div`
  display: flex;
  align-items: center;
`

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding-right: 24px;
`
