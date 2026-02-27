import { Button } from '../Button';
import styled from 'styled-components';

export interface FilterButtonProps {
  id?: string;
  text: string;
  handleFilter: () => void;
  isActive: boolean;
  color?: string;
}

export const FilterButton = ({ id, text, handleFilter, isActive, color }: FilterButtonProps) => {
  const handleClick = () => {
    if (!isActive) {
      handleFilter()
    }
  }

  return (
    <StyledButton
      id={id}
      onClick={handleClick}
      type='outline'
      text={text}
      size='sm'
      $isActive={isActive}
      color={color}
    />
  )
}

const StyledButton = styled(Button) <{ $isActive: boolean }>`
  ${props => props.$isActive && !props.color && `
    background: ${props.theme.colors.dark.darkGrey};
    color: ${props.theme.colors.light.white};
    outline: none;
    border-color: ${props.theme.colors.light.white};

    &:focus {
      outline: none;
      border-color: ${props.theme.colors.light.white};
    }
  `}


  ${props => props.$isActive && props.color === 'green' && `
    background: ${props.theme.colors.green2};
    color: black;
    outline: none;
    border-color: ${props.theme.colors.dark.darkGrey};

    &:focus {
      outline: none;
      border-color: ${props.theme.colors.dark.darkGrey};
    }
  `}
`;