import { FunctionComponent, ReactNode } from 'react';
import styled from 'styled-components';
import { Body1 } from '../Typography';

export interface EmptyStateProps {
  subtitle: string;
  buttons?: ReactNode | ReactNode[];
  backgroundColor?: string;
  icon?: ReactNode;
}

export const EmptyState: FunctionComponent<EmptyStateProps> = ({
  subtitle,
  buttons,
  backgroundColor = 'transparent',
  icon,
}) => {
  return (
    <Container backgroundColor={backgroundColor}>
      {icon && <IconWrapper>{icon}</IconWrapper>}
      {subtitle && <Body1>{subtitle}</Body1>}
      {buttons && <ButtonWrapper>{buttons}</ButtonWrapper>}
    </Container>
  );
};

const Container = styled.div<{ backgroundColor: string }>`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 48px 16px;
  background-color: ${(props) => props.backgroundColor};
  border-radius: 12px;
`;

const IconWrapper = styled.div`
  display: flex;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin-top: 8px;
`;
