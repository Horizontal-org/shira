import { Button } from '../Button'
import styled from 'styled-components';

export interface FilterButtonProps {
  text: string;
  handleFilter: () => void;
  isActive: boolean;
}

export const FilterButton = ({ text, handleFilter, isActive }: FilterButtonProps) => {
  const handleClick = () => {
    if (!isActive) {
      handleFilter()
    }
  }

  return (
    <StyledButton 
      onClick={handleClick}
      type='outline'
      text={text}
      size='sm'
      $isActive={isActive}
    />
  )
}

const StyledButton = styled(Button)<{ $isActive: boolean }>`
  ${props => props.$isActive && `
    background: ${props.theme.colors.dark.darkGrey};
    color: ${props.theme.colors.light.white};
    outline: none;
    border-color: ${props.theme.colors.light.white};

    &:focus {
      outline: none;
      border-color: ${props.theme.colors.light.white};
    }
  `}
`;