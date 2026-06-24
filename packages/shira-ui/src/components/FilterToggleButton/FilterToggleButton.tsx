import styled from 'styled-components';
import { Body2Regular } from '../Typography';
import { MdFilterAlt } from 'react-icons/md';
import { defaultTheme } from '../..';

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
    <Button
      type="button"
      className={className}
      onClick={onClick}
      $isOpen={isOpen}
    >
      <MdFilterAlt size={22} color={defaultTheme.colors.dark.darkGrey} />
      <Body2Regular>{text}</Body2Regular>
    </Button>
  );
};

const Button = styled.button<{ $isOpen: boolean }>`
  min-height: 40px;
  padding: 12px 20px;
  border-radius: 24px;
  border: ${props => (props.$isOpen ? '2px' : '1px')} solid ${props => (
    props.$isOpen
      ? props.theme.colors.dark.black
      : props.theme.colors.dark.mediumGrey
  )};
  background: ${props => props.theme.colors.light.white};
  color: ${props => props.theme.colors.dark.black};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
`;
