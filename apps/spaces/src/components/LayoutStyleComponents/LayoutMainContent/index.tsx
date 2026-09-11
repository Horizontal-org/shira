import { styled } from "@horizontal-org/shira-ui";

export const LayoutMainContent = styled.div<{ $isCollapsed: boolean }>`
  flex: 1;
  margin-inline-start: ${props => props.$isCollapsed ? '116px' : '264px'};
  transition: margin-inline-start 0.3s ease;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    margin-inline-start: 80px;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    margin-inline-start: 0;
  }
`;

export const LayoutMainContentWrapper = styled.div`
  padding: 50px;
`
