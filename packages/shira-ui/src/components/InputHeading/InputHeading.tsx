import { type FunctionComponent, type ReactNode } from "react";
import styled from "styled-components";

export interface InputHeadingProps {
  children: ReactNode;
  required?: boolean;
}

export const InputHeading: FunctionComponent<InputHeadingProps> = ({
  children,
  required = false,
}) => (
  <StyledInputHeading $required={required}>
    {children}
  </StyledInputHeading>
);

const StyledInputHeading = styled.div<{ $required: boolean }>`
  padding-bottom: 12px;

  > h5 {
    display: flex;

    ${(props) => props.$required && `
      &::before {
        content: "* ";
        color: ${props.theme.colors.error7};
        padding-inline-end: 4px;
      }
    `}
  }
`;
