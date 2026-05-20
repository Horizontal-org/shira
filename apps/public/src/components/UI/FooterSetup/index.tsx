import { FunctionComponent } from 'react'
import { styled, Button } from '@horizontal-org/shira-ui'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

interface Props {
  onBack: () => void;
  onNext: () => void;
  backText: string;
  nextText: string;
  disabled: boolean;
}

export const FooterButtonsSetup: FunctionComponent<Props> = ({
    onBack,
    onNext,
    backText,
    nextText,
    disabled,
}) => {
    return (
      <Wrapper>
        <ButtonWrapper>
          <Button
            text={backText}
            onClick={onBack}
            type='outline'
            leftIcon={<FiChevronLeft size={18} />}
          />
        </ButtonWrapper>
        <ButtonWrapper>
          <Button
            text={nextText}
            onClick={onNext}
            type='primary'
            rightIcon={<FiChevronRight size={18} />}
            disabled={disabled}
          />
        </ButtonWrapper>
      </Wrapper>
    )
  }

const Wrapper = styled.div`
  display: flex;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    width: 80%;
  }
`

const ButtonWrapper = styled.div`
  > button {
    margin-left: 10px;
  }
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    width: 50%;
    > button {
      width: 65%;
      justify-content: center;
      margin-left: 0;
    }
  }
`
