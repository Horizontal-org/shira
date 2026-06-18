import { styled } from "@horizontal-org/shira-ui";

const paginationWrapperStyles = `
  box-sizing: border-box;
  padding: 10px 16px;
  display: flex;
  align-items: center;
  width: 100%;
`;

export const LibraryPaginationContainer = styled.div`
  ${paginationWrapperStyles}
`;

export const InactiveLibraryPaginationContainer = styled.div`
  ${paginationWrapperStyles}
  pointer-events: none;
`;
