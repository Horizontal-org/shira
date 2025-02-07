import { FunctionComponent } from "react"
import { styled } from '@horizontal-org/shira-ui'

interface Props {
  explanationIndex: string,
  text: string,
  hide: boolean
}

const ExplanationTooltip: FunctionComponent<Props> = ({ 
  explanationIndex,
  text,
  hide
}) => {
  return (
    <Wrapper id={`explanation-${explanationIndex}`} hide={hide} className='arrow'>
      <RelativeWrapper>
        <span> {text} </span>
      </RelativeWrapper>
    </Wrapper>
  )
}

interface WrapperProps {
  hide: boolean
}

const Wrapper = styled('div')<WrapperProps>`
  ${props => props.hide && 'display: none;'}
  position: absolute;
`

const RelativeWrapper = styled.div`
  position: relative;

  max-width: 314px;
  font-weight: 400;
  top: 0;
  margin-top: 8px;
  padding: 8px;
  font-size: 16px;
  line-height: 22px;
  border: 3px solid #9FB747;
  border-radius: 6px;
  background-color: #fff;
  color: ${props => props.theme.colors.dark.black};
  z-index: 1000;
  
  span:after {
    position: absolute;
    content: "";
    top: -23px;
    left: 7px;
    border-width: 10px;
    border-style: solid;
    border-color: transparent transparent #9FB747 transparent;
    z-index: 1000;
  }
`

export default ExplanationTooltip