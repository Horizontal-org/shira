import { styled } from "@horizontal-org/shira-ui";

export const ErrorBanner = styled.div`
  background: ${(props) => props.theme.colors.light.paleRed};
  color: ${(props) => props.theme.colors.error9};
  padding: 16px 24px;
  margin-bottom: 20px;
  font-size: 16px;
  font-weight: 600;
  width: fit-content;
  max-width: min(100%, 880px);
`
