import styled from 'styled-components';
import { HiFunnel } from 'react-icons/hi2';
import { Body2Regular } from '../Typography';

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
      <HiFunnel size={18} />
      <Body2Regular>{text}</Body2Regular>
    </Button>
  );
};

const Button = styled.button<{ $isOpen: boolean }>`
  min-height: 46px;
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
