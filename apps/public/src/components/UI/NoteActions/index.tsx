import { FunctionComponent } from "react"
import { styled, Button } from '@horizontal-org/shira-ui'
import { FiChevronRight, FiChevronLeft } from "react-icons/fi"
import { useTranslation } from "react-i18next"

interface Props {
  goBack: () => void
  onNext: () => void
  isExpanded: boolean
}

export const NoteActions: FunctionComponent<Props> = ({ goBack, onNext, isExpanded }) => {
  const { t } = useTranslation()

  return (
    <Wrapper isExpanded={isExpanded}>
      <ActionButtonsWrapper>
        <Button
          onClick={() => { goBack() }}
          text={t('setup.apps.back_button')}
          type="outline"
          leftIcon={<FiChevronLeft size={18} data-mirror-rtl />}
        />
      </ActionButtonsWrapper>
      <ActionButtonsWrapper type="primary">
        <Button
          text={t("quiz.answers.results.next_button")}
          type='primary'
          onClick={() => { onNext() }}
          rightIcon={<FiChevronRight size={18} data-mirror-rtl />}
        />
      </ActionButtonsWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div<{ isExpanded?: boolean }>`
  display: flex;
  align-items: center;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    box-sizing: border-box;
    gap: 8px;
    margin: 0;
    margin-inline-start: ${props => props.isExpanded ? '0' : '16px'};
    /* collapsed: leave room for the absolutely positioned chevron at the inline end */
    width: ${props => props.isExpanded ? '100%' : 'calc(100% - 88px)'};
  }
`

const ActionButtonsWrapper = styled.div<{ type?: string }>`
  padding: 0 8px;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: 0;
    display: flex;
    flex: 1;

    > button {
      width: 100%;
      padding-top: 12px;
      padding-bottom: 12px;
      justify-content: center;
    }
  }
`
