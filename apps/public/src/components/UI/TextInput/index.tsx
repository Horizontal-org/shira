import { ChangeEventHandler, FunctionComponent } from "react";
import { styled } from '@horizontal-org/shira-ui'

interface Props {
  placeholder?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  value: string;
} 

export const TextInput: FunctionComponent<Props> = ({
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
  border: none; 

  font-weight: 400;
  font-size: 18px;
  padding: 8px 0;
  width: 100%;
  caret-color: ${props => props.theme.secondary.dark};
  border-bottom: 2px solid ${props => props.theme.secondary.dark};

  &::placeholder {
    color: #aaa;
  }
`