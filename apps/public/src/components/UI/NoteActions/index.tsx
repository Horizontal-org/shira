import { FunctionComponent } from "react"
import { styled, Button } from '@horizontal-org/shira-ui'
import { FiChevronRight, FiChevronLeft } from "react-icons/fi"
import { useTranslation } from "react-i18next"
import useGetWidth from "../../../hooks/useGetWidth"

interface Props {
  goBack: () => void
  onNext: () => void
  isExpanded: boolean
}

export const NoteActions: FunctionComponent<Props> = ({ goBack, onNext, isExpanded }) => {
  const { t } = useTranslation()
  const { width } = useGetWidth()

  if (!(width > 1024 || isExpanded)) return null

  return (
    <Wrapper>
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

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-grow: 1;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    padding-inline-end: 8px;
  }

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    margin: 0 16px;
    padding: 0 4px;
  }
`

const ActionButtonsWrapper = styled.div<{ type?: string }>`
  padding: 0 8px;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: 0;
    width: 50%;
    display: flex;
    justify-content: ${props => props.type === 'primary' ? 'flex-end' : 'flex-start'};

    > button {
      width: 75%;
      padding-top: 12px;
      padding-bottom: 12px;
      justify-content: center;
    }
  }
`
