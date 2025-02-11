import { FormEvent, ReactNode } from "react";
import styled from 'styled-components';
import { Box } from '../Box';
import { SubHeading1, Body1 } from '../Typography';

export interface FormProps {
  title?: string;
  description?: ReactNode;
  children: ReactNode;
  className?: string;
  onSubmit?: (e: FormEvent) => void;
}

export const Form = ({ 
  title,
  description,
  children,
  className ,
  onSubmit
}: FormProps) => {
  return (
    <Box className={className}>
      <StyledForm onSubmit={onSubmit}>
        {title && <StyledTitle>{title}</StyledTitle>}
        {description && <StyledDescription>{description}</StyledDescription>}
        {children}
      </StyledForm>
    </Box>
  );
};

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 32px;
  width: 100%;
`;

const StyledTitle = styled(SubHeading1)`
  color: ${props => props.theme.colors.dark.black};
`;

const StyledDescription = styled(Body1)`
  color: ${props => props.theme.colors.dark.black};
`;

export default Form;