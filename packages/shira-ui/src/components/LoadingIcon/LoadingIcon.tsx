import { FunctionComponent } from 'react';
import styled, { css } from 'styled-components';

export interface LoadingIconProps {
  size?: number;
  className?: string;
}

export const LoadingIcon: FunctionComponent<LoadingIconProps> = ({
  size = 28,
  className,
}) => (
  <StyledLoadingIcon className={className} $size={size} />
);

const StyledLoadingIcon = styled.div<{ $size: number }>`
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  border-radius: 50%;
  ${({ theme }) => css`
    background: conic-gradient(
      from 0deg,
      ${theme.colors.light.white} 0deg,
      ${theme.colors.green4} 160deg,
      ${theme.colors.green2} 300deg,
      ${theme.colors.light.white}
    );
  `}
  mask: radial-gradient(circle, transparent 54%, black 56%);
  -webkit-mask: radial-gradient(circle, transparent 54%, black 56%);
  animation: spin 1.2s linear infinite;

  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
`;
