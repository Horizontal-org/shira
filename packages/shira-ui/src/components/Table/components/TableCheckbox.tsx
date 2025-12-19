import { FunctionComponent } from "react";
import styled from 'styled-components'

interface Props {
  checked: boolean;
  indeterminate: boolean;
  onChange: any
  isTDCheckbox: boolean;
}

export const TableCheckbox:FunctionComponent<Props> = ({
  checked,
  indeterminate,
  onChange,
  isTDCheckbox = false
}) => {

  return (
    <Wrapper isVisible={isTDCheckbox && !checked}>
      <input 
        type="checkbox"
        onChange={onChange}
      />
      <Checkmark 
        checked={checked}
        ind={indeterminate}
      >
      </Checkmark>
    </Wrapper>
  )
}

const Wrapper = styled.label<{ isVisible: boolean }>`
  position: relative; 
  height: 18px;
  width: 18px;
  display: block;

  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }    

  ${props => props.isVisible && `
    visibility: hidden;  
  `}
`
    
    // display: block;
const Checkmark = styled.span<{ 
  checked: boolean;
  ind: boolean
}>`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  height: 18px;
  width: 18px;
  border: 2px solid ${props => props.theme.colors.dark.mediumGrey};
  border-radius: 2px;
  box-sizing: border-box;
  
  &:after {
    content: "";
    position: absolute;
    display: none;
    left: 4px;
    top: 0;
    width: 5px;
    height: 9px;
    border: solid white;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
      
  ${props => props.checked && `
    background-color: ${props.theme.colors.green5};
    border: 2px solid ${props.theme.colors.green5};
    &:after {
      display: block;
    }  
  `}

  ${props => props.ind && `
    background-color: ${props.theme.colors.green5};
    border: 2px solid ${props.theme.colors.green5};
    &:after {
      display: block;
      content: "";
      transform: initial;
      -webkit-transform: initial;
      -ms-transform: initial;
      top: auto;
      left: 1px;
      width: 12px;
      height: 6px;
      border-width: 0 0 3px 0;      
    }
  `}
`