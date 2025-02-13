import { ChangeEventHandler, FunctionComponent } from "react";
import { styled } from '@shira/ui'

interface Props {
  placeholder?: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  value: string;
} 

export const TextAreaInput: FunctionComponent<Props> = ({
  placeholder,
  onChange,
  value
}) => {
  return (
    <StyledInput
      placeholder={placeholder}
      onChange={onChange}
      value={value}
    />
  )
}

const StyledInput = styled.textarea`
  outline: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  width: 95%;
  height: 90px;

  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  padding: 16px;
  color: ${props => props.theme.colors.dark.black};
  caret-color: ${props => props.theme.secondary.dark};
  border: 2px solid ${props => props.theme.colors.light.paleGrey};
  border-radius: 16px;
  resize: none;

  &::placeholder {
    color: #aaa;
  }

  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    width: 90%;
  }

  &:focus {
    border: 2px solid ${props => props.theme.secondary.dark};
  }
`