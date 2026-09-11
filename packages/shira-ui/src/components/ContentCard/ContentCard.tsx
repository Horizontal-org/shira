import styled from "styled-components";

export const ContentCard = styled.section`
  box-sizing: border-box;
  margin: 0;
  padding: 28px;
  border: 1px solid ${props => props.theme.colors.green2};
  border-radius: 32px;
  background: ${props => props.theme.colors.light.white};
  color: inherit;
  font: inherit;
  text-align: inherit;

  &:is(button) {
    appearance: none;
    cursor: pointer;
  }

  &:focus-visible {
    outline: 2px solid ${props => props.theme.colors.green7};
    outline-offset: 4px;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: 24px;
  }
`;
