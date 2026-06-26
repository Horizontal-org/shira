import styled from 'styled-components';
import { MdFilterAlt } from 'react-icons/md';
import { defaultTheme } from '../..';
import { Button } from '../Button';

export interface FilterToggleButtonProps {
  text: string;
  isOpen: boolean;
  onClick: () => void;
  className?: string;
}

export const FilterToggleButton = ({
  text,
  isOpen,
  onClick,
  className,
}: FilterToggleButtonProps) => {
  return (
    <FilterButton
      className={className}
      text={text}
      type="outline"
      leftIcon={<MdFilterAlt size={22} color={defaultTheme.colors.dark.darkGrey} />}
      onClick={onClick}
      $isOpen={isOpen}
    />
  );
};

const FilterButton = styled(Button)<{ $isOpen: boolean }>`
  border-radius: 24px;
  margin: 0;
  border: ${props => (props.$isOpen ? '2px' : '1px')} solid ${props => (
    props.$isOpen
      ? props.theme.colors.dark.black
      : props.theme.colors.dark.mediumGrey
  )};
  background: ${props => props.theme.colors.light.white};
  color: ${props => props.theme.colors.dark.black};
  justify-content: center;

  &:focus {
    margin: 0;
    border: 2px solid ${props => (
      props.$isOpen
        ? props.theme.colors.dark.black
        : props.theme.colors.dark.mediumGrey
    )};
  }
`;
