import { FormEvent, ReactNode } from "react";
import styled from 'styled-components';
import { Box } from '../Box';
import { SubHeading1, Body1, H2, SubHeading3 } from '../Typography';

export interface FormProps {
  title?: string;
  titleSize?: 'small' | 'medium' | 'large';
  header?: string;
  description?: ReactNode;
  children: ReactNode;
  className?: string;
  onSubmit?: (e: FormEvent) => void;
}

export const Form = ({ 
  title,
  titleSize = 'medium',
  description,
  children,
  className ,
  onSubmit,
  header
}: FormProps) => {
  return (
    <Box className={className}>
      <StyledForm onSubmit={onSubmit}>
        {title && (
          <StyledTitleWrapper>
            {header && (<Header><SubHeading3>{header}</SubHeading3></Header>)}        
            {titleSize === 'small' && (
              <Body1>{title}</Body1>
            )}
            {titleSize === 'medium' && (
              <SubHeading1>{title}</SubHeading1>
            )}
            {titleSize === 'large' && (
              <H2>{title}</H2>
            )}
          </StyledTitleWrapper>
        )}
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

const StyledTitleWrapper = styled.section`
  color: ${props => props.theme.colors.dark.black};
`;

const StyledDescription = styled(Body1)`
  color: ${props => props.theme.colors.dark.black};
`;

const Header = styled.div`
  color: ${props => props.theme.colors.green7};
  padding-bottom: 8px;
`

export default Form;