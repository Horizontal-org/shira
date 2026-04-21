import { FunctionComponent } from 'react'
import { ExplanationIcon, styled } from '@shira/ui'
import ExplanationText from '../../../../icons/ExplanationText'

interface Props {
  onClick: () => void
  active: boolean
  disabled?: boolean
  isText?: boolean
}

export const ExplanationButton: FunctionComponent<Props> = ({
  onClick,
  active,
  disabled = false,
  isText = false
}) => {
  return (
    <SvgWrapper
      disabled={disabled}
      onClick={disabled ? null : onClick}
      active={active}
    >
      {isText ? <ExplanationText /> : <ExplanationIcon />}
    </SvgWrapper>

  )
}

interface StyledSvgWrapper {
  active: boolean;
  disabled: boolean
}

const SvgWrapper = styled.div<StyledSvgWrapper>`
  cursor: pointer;
  margin-left: 12px;
  border-radius: 50%;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;

  transition: 0.2s all;
  color: #ACADAE;

  > svg {
    stroke: #ACADAE;
    fill: #ACADAE;
  }

  > svg > path {
    fill: #ACADAE;
  }

  ${props => props.active && `
    color: ${props.theme.secondary.base};
    cursor: pointer;
    > svg {
      stroke: ${props.theme.secondary.base};
      fill: ${props.theme.secondary.base};

      > path {
       fill: ${props.theme.secondary.base};
      }
    }
  `}

  ${props => props.disabled && `
    cursor: help;
    background: white;
    > svg {
      fill: rgba(241,242,244,0.6);
      stroke: rgba(241,242,244,0.6);
    }
  `}


  ${props => !props.disabled && `
    &:hover {
      stroke: ${props.theme.secondary.base};
      fill: ${props.theme.secondary.base};
      background: #f1f2f4;
      color: ${props.theme.secondary.base};

      > svg {
        stroke: ${props.theme.secondary.base};
        fill: ${props.theme.secondary.base};
      }

      > svg > path {
        fill: ${props.theme.secondary.base};
      }
    }
  `}
`
