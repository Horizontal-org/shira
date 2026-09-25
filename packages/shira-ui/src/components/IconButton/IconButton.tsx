import { forwardRef, ReactNode } from 'react';
import styled from 'styled-components';
import { darken } from 'polished';

export interface IconButtonProps {
  id?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'primary' | 'outline';
  icon: ReactNode;
  disabled?: boolean;
  color?: string;
  className?: string;
  ref?: React.MutableRefObject<HTMLButtonElement>
}

interface StyledIconButtonProps {
  $type: 'primary' | 'outline';
  disabled?: boolean;
  $color?: string;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(({
  icon,
  onClick,
  type = 'primary',
  disabled = false,
  color,
  className,
}: IconButtonProps, ref = null) =>
(
  <StyledButton
    onClick={onClick}
    className={className}
    $type={type}
    disabled={disabled}
    $color={color}
    ref={ref}
  >
    <SvgWrapper>{icon}</SvgWrapper>
  </StyledButton>
));


const StyledButton = styled.button<StyledIconButtonProps>`
  all: unset;
  -webkit-tap-highlight-color: transparent;
  border-radius: 100px;
  padding: 12px;
  cursor: pointer;
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
`;

const SvgWrapper = styled.div`
  display: flex;
  align-items: center;
  `;
// padding-top: 2px;
