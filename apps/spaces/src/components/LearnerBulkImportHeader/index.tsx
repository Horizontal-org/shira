import { FunctionComponent } from "react"
import { styled, Logo, Body2Regular, Button, defaultTheme } from "@horizontal-org/shira-ui";
import { IoClose } from "react-icons/io5";
import { FiChevronRight } from "react-icons/fi";
import { ButtonWithTooltip } from "../ButtonWithTooltip";
import { useTranslation } from "react-i18next";
import { FaArrowRotateRight } from "react-icons/fa6";

interface Props {
  onNext: () => void;
  onBack: () => void;
  onExit: () => void;
  step: number;
  disableNext: boolean;
}

export const LearnerBulkImportHeader: FunctionComponent<Props> = ({
  onNext,
  onBack,
  onExit,
  step,
  disableNext
}) => {

  const { t } = useTranslation();

  const stepConfig = {
    0: {
      id: 'learner-bulk-import-header-next',
      text: t('buttons.next'),
      tooltipText: t('learners_bulk_import.tabs.verify_learners.upload_tooltip'),
    },
    1: {
      id: 'learner-bulk-import-header-next',
      text: t('buttons.next'),
      tooltipText: t('learners_bulk_import.tabs.verify_learners.empty_valid'),
    },
    2: {
      id: 'learner-bulk-import-header-send-invitations',
      text: t('buttons.send_invitations'),
      tooltipText: t('learners_bulk_import.tabs.verify_learners.empty_valid'),
    },
  };

  return (
    <Wrapper id="learner-bulk-import-header">
      <Left>
        <LogoWrapper>
          <Logo />
        </LogoWrapper>

        <CloseWrapper id="learner-bulk-import-header-close" onClick={onExit}>
          <IoClose
            color={defaultTheme.colors.dark.darkGrey}
            size={24}
          />
        </CloseWrapper>

        <Body2Regular>{t('learners_bulk_import.header_title')}</Body2Regular>
      </Left>
      <Right>
        {(step === 1 || step === 2) && (
          <Button
            id="learner-bulk-import-header-start-over"
            leftIcon={<FaArrowRotateRight size={16} />}
            onClick={onBack}
            text={t('buttons.start_over')}
            type="outline"
          />
        )}
        {stepConfig[step] && (
          <ButtonWithTooltip
            id={stepConfig[step].id}
            color={defaultTheme.colors.green7}
            rightIcon={<FiChevronRight size={16} />}
            disabled={disableNext}
            onClick={onNext}
            text={stepConfig[step].text}
            type="primary"
            showTooltipWhenDisabled={disableNext}
            tooltipText={stepConfig[step].tooltipText}
          />
        )}
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
`;

const LogoWrapper = styled.div`
  padding: 0 24px;
  border-right: 1px solid ${props => props.theme.colors.dark.mediumGrey};
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

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding-right: 24px;
`;
