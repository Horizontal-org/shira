import { styled } from "@horizontal-org/shira-ui";

const paginationWrapperStyles = `
  box-sizing: border-box;
  padding: 10px 16px;
  display: flex;
  align-items: center;
  width: 100%;
`;

export const TemplatePaginationWrapper = styled.div`
  ${paginationWrapperStyles}
`;

export const InactiveTemplatePaginationWrapper = styled.div`
  ${paginationWrapperStyles}
  pointer-events: none;
`;
