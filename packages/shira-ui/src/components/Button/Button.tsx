import { ReactNode } from 'react';
import styled from 'styled-components';
import { darken } from 'polished';

export interface ButtonProps {
  text: string
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'primary' | 'outline';
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  disabled?: boolean;
  size?: string;
  color?: string;
  className?: string;
}

interface StyledButtonProps {
  $type: 'primary' | 'outline';
  $size?: string;
  disabled?: boolean;
  $color?: string;
}

export const Button = ({ 
  text, 
  onClick, 
  type = 'primary',
  leftIcon,
  rightIcon,
  disabled = false,
  size = 'default',
  color,
  className,
}: ButtonProps) => {
  return (
    <StyledButton 
      onClick={onClick} 
      className={className}
      $type={type}
      disabled={disabled}
      $size={size}
      $color={color}
    >
      { leftIcon && <Left>{leftIcon}</Left>}
      <span>{ text }</span>
      { rightIcon && <Right>{ rightIcon }</Right>}
    </StyledButton>
  );
};

const StyledButton = styled.button<StyledButtonProps>`
  all: unset;
  -webkit-tap-highlight-color: transparent;
  border-radius: 100px;
  padding: 12px 20px;
  cursor: pointer;
  font-weight: 400;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;

  ${({ theme, $type, $color }) => $type === 'primary' && `
    color: ${theme.colors.light.white};
    background: ${$color || theme.colors.blue7};
    border: 2px solid ${$color || theme.colors.blue7};
    &:hover {
      background: ${$color ? darken(0.1, $color) : theme.colors.blue8};
      border-color: ${$color ? darken(0.1, $color) : theme.colors.blue8};
    }
    &:focus {
      background: ${$color ? darken(0.1, $color) : theme.colors.blue8};
      border-color: ${$color ? darken(0.2, $color) : theme.colors.blue4};
    }
  `}

  ${({ theme, $type }) => $type === 'outline' && `
    background: ${theme.colors.light.white};
    border: 1px solid ${theme.colors.dark.mediumGrey};
    color: ${theme.colors.dark.black};
    margin: 1px;

    &:focus {
      border: 2px solid ${theme.colors.dark.mediumGrey};
      margin: 0;
    }
  `}

  ${({ disabled }) => disabled && `
    opacity: 0.5;
    cursor: not-allowed;    
  `}

  ${({ $size }) => $size === 'lg' && `
    width: 80%;
    justify-content: center;
  `}

  ${({ $size }) => $size === 'sm' && `
    font-size: 12px;
    padding: 8px 16px;
  `}
`

const SvgWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-top: 2px;
`;

const Left = styled(SvgWrapper)`
  margin-right: 12px;
`;

const Right = styled(SvgWrapper)`  
  margin-left: 12px;
`;