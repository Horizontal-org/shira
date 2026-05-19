import styled, { css } from 'styled-components'

interface BaseProps {
  $active: boolean
  $disabled: boolean
}

const BaseButton = styled.button<BaseProps>`
  appearance: none;
  border: none;
  background: transparent;
  margin-left: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  line-height: 0;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
    box-shadow: none;
    filter: none;
  }
  
  &:focus-visible {
     outline: none;
  }
`

const activeOutlineStates = css`
  &:hover {
    color: ${props => props.theme.colors.green4};
  }
   
  &:focus {
    color: ${props => props.theme.colors.green5};
  }

  &:focus > svg {
    stroke: ${props => props.theme.colors.green2};
  }
    
  &:active {
    color: ${props => props.theme.colors.green5};
  }

  &:active > svg {
    stroke: ${props => props.theme.colors.green3};
  }
`

export const OutlineIconButton = styled(BaseButton) <BaseProps>`
  padding: 4px;
  color: ${props => props.theme.colors.green5};

  > svg {
    width: 40px;
    height: 40px;
    stroke: white;
  }


  &:disabled {
    color: ${props => props.theme.colors.green2};
  }

  &:not(:disabled) {
    ${activeOutlineStates}
  }
`


const activeFilledStates = css`
  &:hover {
    color: ${props => props.theme.colors.green4};
  }

  &:focus {
    color: ${props => props.theme.colors.green3};
  }

  &:focus > svg {
    stroke: ${props => props.theme.colors.green5};
  }

  &:active {
    color: ${props => props.theme.colors.green4};
  }

  &:active > svg {
    stroke: ${props => props.theme.colors.green3};
  }
`

export const FilledIconButton = styled(BaseButton) <BaseProps>`
  padding: 4px;
  color: ${props => props.theme.colors.green3};

  > svg {
    width: 40px;
    height: 40px;
    stroke: white;
  }

  &:disabled {
    color: ${props => props.theme.colors.green2};
  }
    
  &:not(:disabled) {
    ${activeFilledStates}

    /* override pseudoclasses if has active explanation */
    ${props => props.$active && `
      color: ${props.theme.colors.green4};
      > svg {
       stroke: ${props.theme.colors.green3};
      }
    `}
  }
`

const activeTextStates = css`
  &:hover {
    color: ${props => props.theme.colors.green4};
  }

  &:focus-visible {
    outline: solid 2px ${props => props.theme.colors.green2};
  }

  &:active {
    outline: solid 2px ${props => props.theme.colors.green3};
  }
`

export const TextOutlineIconButton = styled(BaseButton) <BaseProps>`
  border-radius: inherit;
  padding: 2px;
  color: ${props => props.theme.colors.green5};

  > svg {
    width: 40px;
    height: 40px;
  }

  &:disabled {
    color: ${props => props.theme.colors.green2};
  }
    
  &:not(:disabled) {
    ${activeTextStates}
  }
`

export const TextFilledIconButton = styled(BaseButton) <BaseProps>`
  border-radius: inherit; 
  padding: 2px;
  color: ${props => props.theme.colors.green5};

  > svg {
    width: 40px;
    height: 40px;
  }

  &:disabled {
    color: ${props => props.theme.colors.green2};
  }
    
  &:not(:disabled) {
    ${activeTextStates}


    /* override pseudoclasses if has active explanation */
    ${props => props.$active && `
      outline: solid 2px ${props.theme.colors.green3};
    `}
  }
`