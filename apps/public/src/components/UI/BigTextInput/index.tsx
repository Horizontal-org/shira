import { ChangeEventHandler, FunctionComponent } from "react";
import { styled } from '@shira/ui'

interface Props {
  placeholder?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  value: string;
}

export const BigTextInput: FunctionComponent<Props> = ({
  placeholder,
  onChange,
  value
}) => {
  return (
    <StyledInput
      type={'text'}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
    />
  )
}

const StyledInput = styled.input`
  outline: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  font-weight: 400;
  font-size: 16px;
  padding: 16px;
  color: ${props => props.theme.colors.dark.black};
  border: 2px solid ${props => props.theme.secondary.dark};
  border-radius: 16px;

  &::placeholder {
    color: ${props => props.theme.colors.dark.darkGrey};
  }
`