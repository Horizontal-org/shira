import styled from 'styled-components';
import { ReactNode } from 'react';

export interface BoxProps {
  children: ReactNode;
  padding?: 'large' | 'default' | 'small';
  className?: string;
}

export const Box = ({ children, padding = 'default', className }: BoxProps) => {
  return (
    <StyledBox $padding={padding} className={className}>
      {children}
    </StyledBox>
  );
};

interface StyledBoxProps {
  $padding: BoxProps['padding'];
}

const StyledBox = styled.div<StyledBoxProps>`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 32px;
  border: 2px solid #F3F3F3;
  border-radius: 16px;
  background: white;

  /* Padding variants */
  padding: ${props => {
    switch (props.$padding) {
      case 'large':
        return '48px';
      case 'small':
        return '24px';
      default:
        return '32px';
    }
  }};

  /* Desktop (lg) */
  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    width: 800px;
  }

  /* Tablet (md) */
  @media (min-width: ${props => props.theme.breakpoints.md}) and (max-width: ${props => props.theme.breakpoints.lg}) {
    width: 712px;
  }

  /* Small tablet (sm) */
  @media (min-width: ${props => props.theme.breakpoints.sm}) and (max-width: ${props => props.theme.breakpoints.md}) {
    width: 696px;
  }

  /* Mobile */
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    width: 100%;
    gap: 20px;
    padding: 8px;
    border: none;
  }
`;

export default Box;