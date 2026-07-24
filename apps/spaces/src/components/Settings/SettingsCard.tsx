import { styled } from "@horizontal-org/shira-ui";

export const SettingsCard = styled.section`
  background: ${props => props.theme.colors.light.white};
  border-radius: 32px;
  padding: 8px 42px;
  max-width: 1280px;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: 8px 24px;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    border-radius: 24px;
    padding: 8px 20px;
  }
`
